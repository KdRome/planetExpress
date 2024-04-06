from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

load_dotenv()  # loads the .env file

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Database Link
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

database = SQLAlchemy(app)
bcrypt = Bcrypt(app)


class User_Info(database.Model):
    user_id = database.Column(database.Integer, primary_key=True)
    email = database.Column(database.String(255), unique=True, nullable=False)
    password_hash = database.Column(database.String(60), nullable=False)
    first_name = database.Column(database.String(255), nullable=False)
    last_name = database.Column(database.String(255), nullable=False)


with app.app_context():
    database.create_all()


@app.route("/")
def root():
    return jsonify("Welcome To Planet Express API")


@app.route("/api/User_Info", methods=["GET"])
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


@app.route("/api/create_user", methods=["POST"])
def create_new_user():
    data = request.get_json()
    email = data.get("email")
    plain_password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")

    if not (email and plain_password and first_name and last_name):
        return jsonify({"message": "Missing Data."}), 400

    # Hasing the password
    password_hash = bcrypt.generate_password_hash(plain_password).decode("utf-8")

    # Checking if user already exists
    if User_Info.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists."}), 409

    new_user = User_Info(
        email=email,
        password_hash=password_hash,
        first_name=first_name,
        last_name=last_name,
    )
    database.session.add(new_user)
    database.session.commit()
    return jsonify({"message": "New User Added Successfully"}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User_Info.query.filter_by(email=data.get("email")).first()

    if user and bcrypt.check_password_hash(user.password_hash, data.get("password")):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


if __name__ == "__main__":
    # .env variables
    port = os.getenv("FLASK_APP_PORT")
    host = os.getenv("FLASK_APP_HOST")
    app.run(debug=True, host=host, port=port)
