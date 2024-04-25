from flask import Blueprint, jsonify, request
from models.databaseModels import User_Info, Product
from server import bcrypt
from extensions.extensions import database

def getDatabase():
    from server import database
    return database

userBP = Blueprint('userBP', __name__)

@userBP.route("/")
def root():
    return jsonify("Welcome To Planet Express API")

@userBP.route("/api/User_Info", methods=["GET"])
def get_user_info():
    all_user_info = User_Info.query.all()
    return jsonify(
        {
            "user_info": [
                {
                    "user_id": usr.user_id,
                    "email": usr.email,
                    "password_hash": usr.password_hash,
                    "first_name": usr.first_name,
                    "last_name": usr.last_name,
                }
                for usr in all_user_info
            ]
        }
    )

@userBP.route("/api/create_user", methods=["POST"])
def create_new_user():
    data = request.get_json()
    email = data.get("email").lower()
    plain_password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")

    if not (email and plain_password and first_name and last_name):
        return jsonify({"message": "Missing Data."}), 400

    # Checking if user already exists
    if User_Info.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists."}), 409
    
    # Hasing the password
    password_hash = bcrypt.generate_password_hash(plain_password).decode("utf-8")

    new_user = User_Info(
        email=email,
        password_hash=password_hash,
        first_name=first_name,
        last_name=last_name,
    )
    database.session.add(new_user)
    database.session.commit()
    return jsonify({"message": "New User Added Successfully"}), 201

@userBP.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User_Info.query.filter_by(email=data.get("email")).first()

    if user and bcrypt.check_password_hash(user.password_hash, data.get("password")):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
@userBP.route("/api/products", methods=["GET"])
def get_products():
    all_product_data = Product.query.all()
    return jsonify(
        {
            "products": [
                {
                    "id": product.id,
                    "title": product.title,
                    "category": product.category,
                    "description": product.description,
                    "image": product.image,
                    "price": product.price,
                    "rating": product.rating,
                    "color": product.color,
                    "discounted_price": product.discounted_price,
                    "uri": product.uri,
                }
                for product in all_product_data
            ]
        }
    )