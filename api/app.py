# Import the required libraries
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

# Create various application instances
# Order matters: Initialize SQLAlchemy before Marshmallow
db = SQLAlchemy()
migrate = Migrate()
cors = CORS()


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql+psycopg2://{}:{}@{}/{}'.format(
        os.environ.get('POSTGRES_USER'),
        os.environ.get('POSTGRES_PW'),
        os.environ.get('POSTGRES_URL'),
        os.environ.get('POSTGRES_DB')
    )

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # silence the deprecation warning

    # Initialize extensions
    # To use the application instances above, instantiate with an application:
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)

    return app
