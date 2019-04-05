import flask
from flask_socketio import SocketIO, send, emit
from flask_session import Session
from flask_login import LoginManager, UserMixin, login_user, logout_user
import sqlite3
db = sqlite3.connect('../stamps.db')

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
    cursor = db.execute("SELECT username FROM user WHERE username='%s'" % user_id)
    user = cursor.fetchone()
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
    print('disconnected')

@socketio.on('login')
def find_user():
    print('got login request')
    ret = 'hello'
    # emit('userDataFromBackend', ret, room=flask.request.sid)
    emit('userDataFromBackend', ret)
    login_user(User("zachary186@live.com"))

if __name__ == '__main__':
    socketio.run(app, debug=True)