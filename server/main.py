import flask
from flask_socketio import SocketIO, send, emit
from flask_session import Session
import flask_login

app = flask.Flask("__main__")
app.config['SECRET_KEY'] = 'avraerbaweg23t2fe'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
socketio = SocketIO(app, manage_session=False)


# flask-login
login_manager = flask_login.LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@app.route("/")
def my_index():
    return flask.render_template("index.html",token="Frog")

@socketio.on('connect')
def connect():
    print('connected')
    # print(Socket(request.sid))
    print(flask.request.sid)

@socketio.on('disconnect')
def disconnect():
    print('disconnected')

@socketio.on('login')
def find_user():
    print('got login request')
    ret = 'hello'
    # emit('userDataFromBackend', ret, room=flask.request.sid)
    emit('userDataFromBackend', ret)

socketio.run(app, debug=True)