from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_jwt_extended import JWTManager
from datetime import timedelta


host = os.getenv('host')
user = os.getenv('user')
password = os.getenv('password')
database = os.getenv('database')
secret = os.getenv('JWT_SECRET_KEY')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://'+ str(user) + ':' + str(password) +'@' + str(host) +'/' + str(database)
db = SQLAlchemy(app)
app.config["JWT_SECRET_KEY"] = str(secret)
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=14)
jwt = JWTManager(app)

from flaskrestaurantapp import routes