from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS
from flasgger import Swagger

host = os.getenv('host')
user = os.getenv('user')
password = os.getenv('password')
database = os.getenv('database')
secret = os.getenv('JWT_SECRET_KEY')

# 'postgresql://'+ str(user) + ':' + str(password) +'@' + str(host) +'/' + str(database)

app = Flask(__name__)

app.config['SWAGGER'] = {
    'uiversion': 3,
    'specs_route': '/docs', 
}

swagger = Swagger(app, template_file='swagger.json')

CORS(app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/restaurantDB'
db = SQLAlchemy(app)

app.config["JWT_SECRET_KEY"] = str(secret)
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=0.005)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=14)
app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token'
app.config['JWT_REFRESH_COOKIE_NAME'] = 'refresh_token'
app.config["JWT_COOKIE_CSRF_PROTECT"] = False
jwt = JWTManager(app)

from flaskrestaurantapp import routes
