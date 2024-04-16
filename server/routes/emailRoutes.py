from flask import Blueprint, request, jsonify
from models.databaseModels import User_Info, VerificationCode
from server import mail
from extensions.extensions import database, bcrypt
from flask_mail import Message
from datetime import datetime
import secrets

emailBP = Blueprint('emailBP', __name__)

@emailBP.route("/api/sendCode", methods=["GET", "POST"])
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
            
            # Delete any existing codes for the email
            existing_code = VerificationCode.query.filter_by(email=email).all()
            for code in existing_code:
                database.session.delete(code)
            database.session.commit()

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

@emailBP.route("/api/forgotPassword", methods=["GET", "POST"])
def forgotPassword():
    codeExpirationSeconds = 1800 # 30 min = 1800 sec
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
        database.session.delete(verification_code)
        database.session.commit()
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
            return jsonify({"message": "Invalid Code."}), 402
        
    except Exception as e:
        print(f"Error verifying: {e}")
        return jsonify({"error": "Failed to verify", "details": str(e)}), 500


@emailBP.route("/api/emailVerification", methods=["GET", "POST"])
def emailAuthenticaiton():
    codeExpirationSeconds = 1800 # 30 min = 1800 sec 
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')

    # Get the user from the database
    user = User_Info.query.filter_by(email=email).first()
    # Get the auth code from the database
    verification_code = VerificationCode.query.filter_by(email=email, code=code).first()

    # if not user
    if not user or not verification_code:
        return jsonify({"message": "Invalid code"}), 400

    # if code expired
    if (datetime.now() - verification_code.created_at).total_seconds() > codeExpirationSeconds:
        database.session.delete(verification_code)
        database.session.commit()
        return jsonify({"message": "Code has expired"}), 401

    # handle verifying the code so it matches the one in the database
    try:
        if verification_code.code == code:
            
            # set isEmailVerified in database to true
            user.isEmailVerified = True
            database.session.commit()

            # delete the verification record from db
            database.session.delete(verification_code)
            database.session.commit()

            return jsonify({"message": "Verification was successful"}), 200
        else:
            return jsonify({"message": "Invalid Code"}), 400
    except Exception as e:
        print(f"Error verifying: {e}")
        return jsonify({"error": "Failed to verify", "details": str(e)}), 500