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

def authenticate_request(username, required_rank, db):
    rank = db.execute("SELECT rank FROM user NATURAL JOIN employee WHERE user.username=? AND current_user_session=?;", (username, flask.request.sid)).fetchone()
    if rank == None:
        return False
    elif rank[0] < required_rank:
        return False
    else:
        return True

# def get_number_of_stamps(username, db):
#     stamps = db.execute("SELECT stamps FROM user WHERE username=?;", (username,)).fetchone()
#     if (stamps):
#         return stamps[0]
#     else:
#         return -1

def generate_user_information(username, db): # returns tuple (user_data, current_user_session)
    #grab user and associated employee data, if it exists
    user = db.execute("SELECT u.username as u, birthday, rank, (SELECT sum(stamp.value) FROM stamp WHERE u.username = stamp.username) as stamp_balance, (SELECT count(*) FROM stamp WHERE e.employee_id = stamp.employee_id) as stamps_given, date_created, current_user_session FROM user as u NATURAL LEFT JOIN employee as e WHERE u.username=?;", (username,)).fetchone()
    if user[3] == None:
        stamps_received = 0
    else:
        stamps_received = user[3]

    #get last 4 visits, generate average visit and also most recent visit
    visits = db.execute("SELECT date FROM stamp WHERE username=? ORDER BY date DESC LIMIT 4;", (username,)).fetchall()
    if visits:
        most_recent = datetime.datetime.today()
        least_recent = datetime.datetime.strptime(visits[-1][0], '%Y-%m-%d')
        average_days_between_visits = (most_recent - least_recent).total_seconds() / 86400 / len(visits)
        last_visit = visits[0][0]
    else:
        average_days_between_visits = None
        last_visit = None

    return ({
        "username": user[0],
        "birthday": user[1],
        "rank": user[2],
        "stamps": stamps_received,
        "stamps_given": user[4],
        "average_days_between_visits": average_days_between_visits,
        "last_visit": last_visit,
        "customer_since": user[5]
    }, user[6])

def login_user_wrapper(username, db):
    login_user(User(username))
    # update user to keep track of user session
    cursor = db.cursor()
    cursor.execute("UPDATE user SET current_user_session = ? WHERE username=?;", (flask.request.sid, username))
    db.commit()
    emit('authentication_successful', generate_user_information(username, db)[0])

@login_manager.user_loader #returns user object after login
def load_user(user_id):
    db = sqlite3.connect('../stamps.db')
    cursor = db.execute("SELECT username FROM user WHERE username=?;", (user_id,))
    user = cursor.fetchone()
    db.close()
    print("logged in " + user[0])
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
    # print('got login request: ' + credentials['username'] + " + " + credentials['password'])
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
    # print('got account request: ' + credentials['username'] + " + " + credentials['password'] + " + " + credentials['birthday'])
    password_hash = pbkdf2_sha256.encrypt(credentials['password'], rounds=200000, salt_size=16)

    db = sqlite3.connect('../stamps.db')

    user = db.execute("SELECT username FROM user WHERE username=?;", (credentials['username'],)).fetchone()
    if (user):
        emit('username_taken')
        print("username taken")
    elif len(credentials['username']) < 4 or len(credentials['password']) < 6:
        print("password/username too short, check frontend validation")
    else:
        cursor = db.cursor()
        cursor.execute("INSERT INTO user(username, password, birthday, date_created) VALUES(?,?,?,?);", (credentials['username'], password_hash, credentials['birthday'], datetime.date.today().isoformat()))
        db.commit()
        print("created account")
        login_user_wrapper(credentials['username'], db)
    db.close()

@socketio.on('retrieve_customer_data')
def retrieve_customer_data(data):
    # print(data['username_requesting'])
    # print(data['username_to_retrieve'])
    print("retrieving customer data...")
    db = sqlite3.connect('../stamps.db')
    if authenticate_request(data['username_requesting'], 1, db):
        emit('customer_info', generate_user_information(data['username_to_retrieve'], db)[0])
    db.close()

@socketio.on('update_customer_stamps')
def update_stamps(data):
    db = sqlite3.connect('../stamps.db')
    if authenticate_request(data['username_requesting'], 1, db):
        #update stamps here
        cursor = db.cursor()
        cursor.execute("UPDATE user SET stamps=? WHERE username=?;", (data['number_of_stamps'], data['username_to_update']))
        db.commit()
        # emit to user who had stamps updated, maybe employee later
        emit('new_stamps_value', data['number_of_stamps'])

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