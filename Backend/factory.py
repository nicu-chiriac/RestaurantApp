# factory.py
from flask import Flask
from flaskrestaurantapp.config import DevelopmentConfig
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flasgger import Swagger
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
cors = CORS()
swagger = Swagger(template_file='swagger.json')
jwt = JWTManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    db.init_app(app)
    cors.init_app(app, supports_credentials=True)
    swagger.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    return app