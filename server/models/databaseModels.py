from server.extensions.extensions import database
from sqlalchemy import DateTime

class User_Info(database.Model):
    user_id = database.Column(database.Integer, primary_key=True)
    email = database.Column(database.String(255), unique=True, nullable=False)
    password_hash = database.Column(database.String(60), nullable=False)
    first_name = database.Column(database.String(255), nullable=False)
    last_name = database.Column(database.String(255), nullable=False)
    isEmailVerified = database.Column(database.Boolean, default=False, nullable=False)

class VerificationCode(database.Model):
    user_id = database.Column(database.Integer, primary_key=True)
    email = database.Column(database.String(255), unique=True, nullable=False)
    code = database.Column(database.String(255), nullable=False)
    created_at = database.Column(DateTime, nullable=False)