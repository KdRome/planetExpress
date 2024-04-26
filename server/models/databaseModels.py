from extensions.extensions import database
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

class Product(database.Model):
    __tablename__ = 'products'

    product_id = database.Column(database.Integer, primary_key=True)
    title = database.Column(database.String(255), nullable=False)
    category = database.Column(database.String(20), nullable=False)
    description = database.Column(database.Text, nullable=False)
    image = database.Column(database.String(350), nullable=False)
    price = database.Column(database.Numeric(5, 2), nullable=False)
    rating = database.Column(database.Integer, nullable=False)
    uri = database.Column(database.String(255), nullable=False)
    
    '''
    cpu_id = database.Column(database.Integer, database.ForeignKey('cpu.cpu_id'))
    gpu_id = database.Column(database.Integer, database.ForeignKey('cpu.gpu_id'))
    ram_id = database.Column(database.Integer, database.ForeignKey('cpu.ram_id'))
    motherboard_id = database.Column(database.Integer, database.ForeignKey('cpu.motherboard_id'))
    '''