import flask
from flask_socketio import SocketIO, send, emit
# from flask_session import Session
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
import sqlite3
from passlib.hash import pbkdf2_sha256
import datetime

app = flask.Flask("__main__")
# app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'avraerbaweg23t2fe'

login_manager = LoginManager()
login_manager.init_app(app)
# login_manager.login_view = "login"
# Session(app)
socketio = SocketIO(app)


class User(UserMixin):
    def __init__(self,id):
        self.id = id

def login_user_wrapper(username, db):
    login_user(User(username))
    # update user to keep track of user session
    cursor = db.cursor()
    cursor.execute("UPDATE user SET current_user_session = ? WHERE username=?;", (flask.request.sid, username))
    db.commit()
    emit('authentication_successful', {'username': username})

@login_manager.user_loader #returns user object after login
def load_user(user_id):
    db = sqlite3.connect('../stamps.db')
    cursor = db.execute("SELECT username FROM user WHERE username=?;", (user_id,))
    user = cursor.fetchone()
    db.close()
    print("logged in" + user[0])
    if len(user) > 0:
        return User(user[0])
    else:
        return

@app.route("/")
def my_index():
    return flask.render_template("index.html")

@socketio.on('connect')
def connect():
    print('connected')

@socketio.on('disconnect')
def disconnect():
    if current_user.is_authenticated:
        logout_user()
        #set user session to null
        db = sqlite3.connect('../stamps.db')
        cursor = db.cursor()
        cursor.execute("UPDATE user SET current_user_session = NULL WHERE current_user_session=?;", (flask.request.sid,))
        db.commit()
        db.close()
        print("user logged out")
    print('disconnected')

@socketio.on('login')
def find_user(credentials):
    credentials['username'] = credentials['username'].lower().replace(' ', '') #make username lowercase, replace spaces
    print('got login request: ' + credentials['username'] + " + " + credentials['password'])
    db = sqlite3.connect('../stamps.db')
    user = db.execute("SELECT username, password FROM user WHERE username=?;", (credentials['username'],)).fetchone()
    
    if user and pbkdf2_sha256.verify(credentials['password'], user[1]):
        print("correct password!")
        login_user_wrapper(credentials['username'], db)
    else:
        print("invalid login!")    
        emit('authentication_error')

    db.close()

@socketio.on('create_account')
def create_account(credentials):
    credentials['username'] = credentials['username'].lower().replace(' ', '') #make username lowercase, replace spaces
    print('got account request: ' + credentials['username'] + " + " + credentials['password'] + " + " + credentials['birthday'])
    password_hash = pbkdf2_sha256.encrypt(credentials['password'], rounds=200000, salt_size=16)

    db = sqlite3.connect('../stamps.db')

    user = db.execute("SELECT username FROM user WHERE username=?;", (credentials['username'],)).fetchone()
    if (user):
        emit('username_taken')
        print("username taken")
    elif credentials['username'] < 4 or credentials['password'] < 6:
        print("password/username too short, check frontend validation")
    else:
        cursor = db.cursor()
        cursor.execute("INSERT INTO user(username, password, birthday, date_created) VALUES(?,?,?,?);", (credentials['username'], password_hash, credentials['birthday'], datetime.date.today().strftime("%m-%d")))
        db.commit()
        print("created account")
        login_user_wrapper(credentials['username'], db)
    db.close()
    

if __name__ == '__main__':
    #starting server, set all user sessions to null
    print("Prepping database for launch...")
    db = sqlite3.connect('../stamps.db')
    cursor = db.cursor()
    cursor.execute("UPDATE user SET current_user_session = NULL;")
    db.commit()
    db.close()
    print("Running app...")
    socketio.run(app, debug=True)