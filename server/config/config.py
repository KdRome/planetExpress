import os
from dotenv import load_dotenv

load_dotenv() # loads the .env file

class Config:
    # Database Link
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Flask Mail config
    MAIL_SERVER = os.getenv("MAIL_SERVER")
    MAIL_PORT = os.getenv("MAIL_PORT")
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    # JWT token
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    DEBUG = os.getenv("FLASK_DEBUG", "False") == "True"