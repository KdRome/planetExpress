from flask import Flask
from flask_cors import CORS
from server.extensions.extensions import database, bcrypt, mail
from server.config.config import Config
import server.routes.emailRoutes as emailRoutes, server.routes.userRoutes as userRoutes
import os

def run_app():

    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # init the extenstions with app 
    database.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)

    # register the blueprints
    app.register_blueprint(userRoutes.userBP)
    app.register_blueprint(emailRoutes.emailBP)

    return app

if __name__ == "__main__":
    app = run_app()

    # .env variables
    port = os.getenv("FLASK_APP_PORT")
    host = os.getenv("FLASK_APP_HOST")

    with app.app_context():
        database.create_all()
    
    app.run(debug=True, host=host, port=port)
