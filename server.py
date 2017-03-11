#!/usr/bin/env python
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, Namespace, emit, join_room, leave_room, \
    close_room, rooms, disconnect


import gevent
import eventlet
# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)
thread = eventlet

def beep(data):
    socketio.emit('my_response',
                  data,
                  namespace='/test')


@app.route('/message', methods=['POST'])
def message():
    data = request.get_json(force=True)
    print(data)
    beep(data)
    return 'TY'


@app.route('/face')
def face():
    return render_template('face.html', async_mode=socketio.async_mode)

@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)


class Hello(Namespace):
    def on_my_pong(self):
        ##TODO
        print('heartbeet')

    def on_my_ping(self):
        emit('my_pong')

    def on_connect(self):
        global thread
        if thread is None:
            thread = socketio.start_background_task(target=background_thread)
        emit('my_response', {'data': 'Connected', 'count': 0})

    def on_disconnect(self):
        print('Client disconnected', request.sid)


socketio.on_namespace(Hello('/test'))

if __name__ == '__main__':
    socketio.run(app, debug=True)
