from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

host = os.getenv('host')
user = os.getenv('user')
password = os.getenv('password')
database = os.getenv('database')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://'+ str(user) + ':' + str(password) +'@' + str(host) +'/' + str(database)
db = SQLAlchemy(app)


from flaskrestaurantapp import routes