#http://flask.pocoo.org/

from flask import Flask, render_template

#flask-sockets https://github.com/kennethreitz/flask-sockets
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('./index.html')

@app.route("/face")
def face():
    return render_template('./face.html')

if __name__ == "__main__":
    app.run()
