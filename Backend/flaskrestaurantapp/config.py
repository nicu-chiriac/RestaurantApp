from datetime import timedelta
import os

jwt_secret = os.environ.get('JWT_SECRET_KEY')
db_secret = os.environ.get('SQLALCHEMY_DATABASE_URI')


class DevelopmentConfig:
    DEBUG = True
    JWT_SECRET_KEY = jwt_secret
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=14)
    JWT_ACCESS_COOKIE_NAME = 'access_token'
    JWT_REFRESH_COOKIE_NAME = 'refresh_token'
    JWT_COOKIE_CSRF_PROTECT = False
    SWAGGER = {
        'uiversion': 3,
        'specs_route': '/docs/'
    }
    SQLALCHEMY_DATABASE_URI = db_secret
    SQLALCHEMY_TRACK_MODIFICATIONS = False

