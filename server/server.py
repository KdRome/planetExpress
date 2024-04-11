from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
from datetime import datetime
import secrets

load_dotenv()  # loads the .env file

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Database Link
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Flask Mail config
app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_PORT"] = os.getenv("MAIL_PORT")
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True

database = SQLAlchemy(app)
bcrypt = Bcrypt(app)
mail = Mail(app)


class User_Info(database.Model):
    user_id = database.Column(database.Integer, primary_key=True)
    email = database.Column(database.String(255), unique=True, nullable=False)
    password_hash = database.Column(database.String(60), nullable=False)
    first_name = database.Column(database.String(255), nullable=False)
    last_name = database.Column(database.String(255), nullable=False)

class Product(database.Model):
    id = database.Column(database.Integer, primary_key=True)
    title = database.Column(database.String(255), nullable=False)
    category = database.Column(database.String(5), nullable=False)
    description = database.Column(database.String(255), nullable=False)
    image = database.Column(database.String(255), nullable=False)
    price = database.Column(database.Numeric(5, 2), nullable=False)
    rating = database.Column(database.Integer, nullable=False)
    color = database.Column(database.String(6), nullable=False)
    discounted_price = database.Column(database.Numeric(5, 2))
    uri = database.Column(database.String(255), nullable=False)

class VerificationCode(database.Model):
    user_id = database.Column(database.Integer, primary_key=True)
    email = database.Column(database.String(255), unique=True, nullable=False)
    code = database.Column(database.String(255), nullable=False)
    created_at = database.Column(DateTime, nullable=False)

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


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User_Info.query.filter_by(email=data.get("email")).first()

    if user and bcrypt.check_password_hash(user.password_hash, data.get("password")):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401



# Password Reset Process
@app.route("/api/sendCode", methods=["GET", "POST"])
def sendCode():
    data = request.get_json()
    user = User_Info.query.filter_by(email=data.get("email")).first()

    try:
        if user and request.method == "POST":
            # Generate a verification code
            verification_code = secrets.token_urlsafe()

            # Send the code to the users email
            email = data.get("email").lower()

            msg = Message(
                "Confirm Email",
                sender="No-Reply@PlanetExpress.shop",
                recipients=[email])

            # link = url_for('confirm_email', token=verification_code, _external=True)
            msg.body = "Your verification code: " + verification_code

            # Send the email
            mail.send(msg)
            
            # Add the token to the db
            new_code = VerificationCode(email=email, code=verification_code, created_at=datetime.now())
            database.session.add(new_code)
            database.session.commit()

            return jsonify({"message": "Code has been sent to the email."}), 200
        else:
            return jsonify({"message": "Invalid email, Please try again."}), 400
    except Exception as e:
        print(f"Error sending email: {e}")

        return jsonify({"error": "Failed to send email", "details": str(e)}), 500

@app.route("/api/forgotPassword", methods=["GET", "POST"])
def forgotPassword():
    codeExpirationSeconds = 3900
    data = request.get_json()
    email = data.get('email')
    plain_password = data.get("password")
    code = data.get("code")

    # Validate the auth code
    user = User_Info.query.filter_by(email=data.get("email")).first()
    verification_code = VerificationCode.query.filter_by(email=email, code=code).first()

    # if not user
    if not user or not verification_code:
        return jsonify({"message": "Invalid code"}), 400

    # if code expired
    if (datetime.now() - verification_code.created_at).total_seconds() > codeExpirationSeconds:
        return jsonify({"message": "Code has expired"}), 401

    try:
        if verification_code.code == code:
            # handle the password reset
            new_password_hash = bcrypt.generate_password_hash(plain_password).decode("utf-8")
            user.password_hash = new_password_hash
            database.session.commit()

            # delete the record from db
            database.session.delete(verification_code)
            database.session.commit()

            return jsonify({"message": "Password successfully updated"}), 200
        else:
            # handle invalid or expired code
            return jsonify({"message": "Invalid Code."}), 402

    except Exception as e:
        print(f"Error verifying: {e}")
        return jsonify({"error": "Failed to verify", "details": str(e)}), 500


if __name__ == "__main__":
    # .env variables
    port = os.getenv("FLASK_APP_PORT")
    host = os.getenv("FLASK_APP_HOST")
    app.run(debug=True, host=host, port=port)
