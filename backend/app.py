from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS
from config import Config
from database import db

# Importing routes
from routes.auth import auth_routes  
from routes.task import task_routes  
from routes.study_plan import study_plan_routes
from routes.user import user_routes

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] ='postgresql://database_db_8nc1_user:N0hbSxE8VPwLWSbFEXEDaH7X61j95las@dpg-cufmnb56l47c73fktt20-a.oregon-postgres.render.com/database_db_8nc1'

migrate = Migrate(app, db)
db.init_app(app)


app.config["JWT_SECRET_KEY"] = "your-secure-secret-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)
jwt = JWTManager(app)

app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(task_routes, url_prefix="/api/tasks")
app.register_blueprint(study_plan_routes, url_prefix="/api/study-plans")
app.register_blueprint(user_routes, url_prefix="/api/users")

from models import TokenBlocklist

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None


@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Student Productivity API"}), 200

if __name__ == "__main__":
    app.run(debug=True)
