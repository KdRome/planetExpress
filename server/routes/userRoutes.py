from datetime import timedelta
from flask import Blueprint, jsonify, request
from models.databaseModels import User_Info, Product, Order
from server import bcrypt
from extensions.extensions import database
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

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
        expiration = timedelta(days=1) # sets the expiration to 1 day
        access_token = create_access_token(identity=user.email, expires_delta=expiration) # create JWT Token
        return jsonify({
            "message": "Login successful",
            "access_token": access_token
            }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


# Endpoint to obtain a new access token using the refresh token
@userBP.route('/api/token/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user)
    return jsonify({'access_token': new_token})


@userBP.route('/api/orders', methods=['GET'])
@jwt_required()
def get_order_history():
    user_email = get_jwt_identity()
    user = User_Info.query.filter_by(email=user_email).first() # gets user info from email
    orders = Order.query.filter_by(user_id=user.user_id).all()  # Fetching user-specific orders
    
    # Convert the list of Order objects to a list of dictionaries
    order_dicts = [
        {
            'id': order.id,
            'user_id': order.user_id,
            'total_price': order.total_price,  # Convert to string to ensure JSON serializable
            'created_at': order.created_at.isoformat()  # Convert to ISO format string
        }
        for order in orders
    ]

    return jsonify({"orders": order_dicts})


@userBP.route('/api/account_info', methods=["GET"])
@jwt_required()
def get_account_info():
    user_email = get_jwt_identity()
    user = User_Info.query.filter_by(email=user_email).first()
    return jsonify({ 
        
        "userInfo": {
                    "userFirstName": user.first_name,
                    "userLastName": user.last_name,
                    "userEmail": user_email
    }})