from extensions.extensions import database
from sqlalchemy import DateTime
from datetime import datetime

class User_Info(database.Model):
    __tablename__ = 'user__info'
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


class Product2(database.Model):
    __tablename__ = 'all_products'

    product_id = database.Column(database.Integer, primary_key=True)
    title = database.Column(database.String(255), nullable=False)
    category = database.Column(database.String(20), nullable=False)
    description = database.Column(database.Text, nullable=False)
    image = database.Column(database.String(350), nullable=False)
    price = database.Column(database.Numeric(5, 2), nullable=False)
    rating = database.Column(database.Integer, nullable=False)
    uri = database.Column(database.String(255), nullable=False)
    # Foreign Keys
    cpu_id = database.Column(database.Integer, database.ForeignKey('cpu.cpu_id'))
    cpu = database.relationship("CPU", backref="all_products")

    gpu_id = database.Column(database.Integer, database.ForeignKey('gpu.gpu_id'))
    gpu = database.relationship("GPU", backref="all_products")

    ram_id = database.Column(database.Integer, database.ForeignKey('ram.ram_id'))
    ram = database.relationship("RAM", backref="all_products")

    motherboard_id = database.Column(database.Integer, database.ForeignKey('motherboard.motherboard_id'))
    motherboard = database.relationship("Motherboard", backref="all_products")
    

class CPU(database.Model):
    __tablename__ = 'cpu'
    cpu_id = database.Column(database.Integer, primary_key=True)
    brand = database.Column(database.String(50))
    model = database.Column(database.String(50))
    cores = database.Column(database.Integer)
    threads = database.Column(database.Integer)
    base_clock = database.Column(database.Float)
    boost_clock = database.Column(database.Float)
    socket_type = database.Column(database.String(50))
    tdp = database.Column(database.Integer, nullable=True)
    integrated_graphics = database.Column(database.String(50), nullable=True)

class GPU(database.Model):
    __tablename__ = 'gpu'
    gpu_id = database.Column(database.Integer, primary_key=True)
    brand = database.Column(database.String(50))
    model = database.Column(database.String(100))
    memory_size = database.Column(database.Numeric(10,2))
    memory_type = database.Column(database.String(50))
    gpu_clock = database.Column(database.Integer)
    memory_clock = database.Column(database.Integer)
    tdp = database.Column(database.Integer)

class RAM(database.Model):
    __tablename__ = 'ram'
    ram_id = database.Column(database.Integer, primary_key=True)
    brand = database.Column(database.String(50))
    model = database.Column(database.String(100))
    memory_size = database.Column(database.Integer)
    speed = database.Column(database.Integer)
    type = database.Column(database.String(50))

class Motherboard(database.Model):
    __tablename__ = 'motherboard'
    motherboard_id = database.Column(database.Integer, primary_key=True)
    brand = database.Column(database.String(50))
    model = database.Column(database.String(100))
    chipset = database.Column(database.String(50))
    form_factor = database.Column(database.String(50))
    socket_type = database.Column(database.String(50))

class CartItem(database.Model):
    __tablename__ = 'cart_items'

    id = database.Column(database.Integer, primary_key=True)
    user_id = database.Column(database.Integer, database.ForeignKey('user__info.user_id'))
    product_id = database.Column(database.Integer, database.ForeignKey('all_products.product_id'))
    quantity = database.Column(database.Integer, nullable=False, default=1)

    user = database.relationship('User_Info', backref='cart_items')
    product = database.relationship('Product2', backref='cart_items')


class OrderItem(database.Model):
    __tablename__ = 'order_items'

    id = database.Column(database.Integer, primary_key=True)
    order_id = database.Column(database.Integer, database.ForeignKey('orders.id'))
    product_id = database.Column(database.Integer, database.ForeignKey('all_products.product_id'))
    quantity = database.Column(database.Integer, nullable=False)
    price = database.Column(database.Numeric(10, 2), nullable=False)

    product = database.relationship('Product2', backref='order_items')
    order = database.relationship('Order', backref='items')


class Order(database.Model):
    __tablename__ = 'orders'

    id = database.Column(database.Integer, primary_key=True)
    user_id = database.Column(database.Integer, database.ForeignKey('user__info.user_id'))
    total_price = database.Column(database.Numeric(10, 2))
    created_at = database.Column(database.DateTime, default=datetime.utcnow)

    user = database.relationship('User_Info', backref='orders')