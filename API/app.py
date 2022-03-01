from flask import Flask, g
from db import DATABASE, initialize
from flask_cors import CORS
from stop import Stop
from user import User
import os
from flask_login import LoginManager, login_manager
from resources.users import user
from resources.stops import stop
from truckerstop import TruckerStop
DEBUG = True
PORT = 8000

login_manager = LoginManager()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET') or "abdisworld132"
login_manager.init_app(app)

@login_manager.user_loader
def load_user(userid):
    try: 
        return User.get(User.id == userid)
    except:
        return None

        
@app.before_request
def before_request():
    g.db = DATABASE
    g.db.connect()

@app.after_request
def after_request(response):
    g.db.close()
    return response


@app.route('/')
def index():
    return 'welcome to trucker api'


app.register_blueprint(user)
app.register_blueprint(stop)

origins=['http://localhost:3000']

if 'DATABASE_URL' in os.environ:
    initialize([Stop, User, TruckerStop])
    app.config['SESSION_COOKIE_SECURE'] = True
    app.config['SESSION_COOKIE_HTTPONLY'] = False
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'
    origins.append(os.environ.get('CLIENT_URL'))

CORS(app, origins=origins, supports_credentials=True)

if __name__ == '__main__':
    initialize([ Stop, User, TruckerStop ])
    app.run(debug=DEBUG, port=PORT)