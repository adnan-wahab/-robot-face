#http://flask.pocoo.org/

from flask import Flask, render_template

#flask-sockets https://github.com/kennethreitz/flask-sockets


from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)



@sockets.route('/echo')
def echo_socket(ws):
    while not ws.closed:
        message = ws.receive()
        ws.send(message)



@app.route("/")
def hello():
    return render_template('./index.html')

@app.route("/face")
def face():
    return render_template('./face.html')



if __name__ == "__main__":
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    server = pywsgi.WSGIServer(('', 5000), app, handler_class=WebSocketHandler)
    server.serve_forever()

