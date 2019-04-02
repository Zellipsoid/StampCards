import flask
from flask_socketio import SocketIO

app = flask.Flask("__main__")
app.config['SECRET_KEY'] = 'avraerbaweg23t2fe'
socketio = SocketIO(app)

@app.route("/")
def my_index():
    return flask.render_template("index.html",token="Frog")

@socketio.on('connect')
def connect():
    print('connected')
    # print(Socket(request.sid))

@socketio.on('disconnect')
def disconnect():
    print('disconnected')

@socketio.on('login')
def find_user():
    print('got login request')
    socketio.emit('userDataFromBackend', 'hello')

socketio.run(app, debug=True)