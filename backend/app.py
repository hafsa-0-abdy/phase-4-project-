from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from config import Config
from database import db

# Importing routes
from routes.auth import auth_routes  
from routes.task import task_routes  
from routes.study_plan import study_plan_routes
from routes.user import user_routes

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize database and migration
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# ✅ Register Blueprints with Correct URL Prefixes
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(task_routes, url_prefix="/api/tasks")
app.register_blueprint(study_plan_routes, url_prefix="/api/study-plans")
app.register_blueprint(user_routes, url_prefix="/api/users")

# ✅ Default Route for Testing
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Student Productivity API"}), 200

if __name__ == "__main__":
    app.run(debug=True)
