from flask import Flask

def flaskNameValue():
    app = Flask(__name__)
    return app

