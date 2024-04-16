from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_mail import Mail

# Initialize extentions
database = SQLAlchemy()
bcrypt = Bcrypt()
mail = Mail()