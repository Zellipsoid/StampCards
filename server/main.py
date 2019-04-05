import flask
from flask_socketio import SocketIO, send, emit
from flask_session import Session
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
import sqlite3
from passlib.hash import pbkdf2_sha256

app = flask.Flask("__main__")
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'avraerbaweg23t2fe'

login_manager = LoginManager()
login_manager.init_app(app)
# login_manager.login_view = "login"
Session(app)
socketio = SocketIO(app, manage_session=False)


class User(UserMixin):
    def __init__(self,id):
        self.id = id

@login_manager.user_loader #returns user object after login
def load_user(user_id):
    db = sqlite3.connect('../stamps.db')
    cursor = db.execute("SELECT username FROM user WHERE username='%s'" % user_id)
    user = cursor.fetchone()
    db.close()
    print("logged in" + user[0])
    if len(user) > 0:
        return User(user[0])
    else:
        return

@app.route("/")
def my_index():
    return flask.render_template("index.html",token="Frog")

@socketio.on('connect')
def connect():
    print('connected')
    # print(Socket(request.sid))
    # login_user()
    

@socketio.on('disconnect')
def disconnect():
    if current_user.is_authenticated:
        logout_user()
        print("user logged out")
    print('disconnected')

@socketio.on('login')
def find_user(credentials):
    print('got login request: ' + credentials['username'] + " + " + credentials['password'])
    ret = 'hello'
    # emit('userDataFromBackend', ret, room=flask.request.sid)
    emit('userDataFromBackend', ret)
    login_user(User("zachary186@live.com"))

@socketio.on('create_account')
def create_account(credentials):
    print('got account request: ' + credentials['username'] + " + " + credentials['password'])
    # hash = pbkdf2_sha256.encrypt("password", rounds=200000, salt_size=16)
    # pbkdf2_sha256.verify("password", hash)

if __name__ == '__main__':
    socketio.run(app, debug=True)