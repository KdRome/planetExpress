from flask import Flask
from flask_cors import CORS
from extensions.extensions import database, bcrypt, mail, jwt
from config.config import Config
import routes.emailRoutes as emailRoutes, routes.userRoutes as userRoutes , routes.productRoutes as productRoutes
import os

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# init the extenstions with app 
database.init_app(app)
bcrypt.init_app(app)
mail.init_app(app)
jwt.init_app(app)

# register the blueprints
def register_blueprints(app):
    app.register_blueprint(userRoutes.userBP)
    app.register_blueprint(emailRoutes.emailBP)
    app.register_blueprint(productRoutes.productBP)


if __name__ == "__main__":
    register_blueprints(app) # throws circular import err if outside of main

    with app.app_context():
        database.create_all()
    
    if app.config['DEBUG']:  # Only run Flask's server in debug mode (can change this in .env)
        port = os.getenv("FLASK_APP_PORT", 5000)
        host = os.getenv("FLASK_APP_HOST", '0.0.0.0')
        app.run(debug=True, host=host, port=port)
