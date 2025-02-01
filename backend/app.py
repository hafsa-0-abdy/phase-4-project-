from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from config import Config
from database import db
from routes.auth import auth_routes  
from routes.task import task_routes  

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# ✅ Register Blueprints with Correct Prefix
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(task_routes, url_prefix="/api/tasks")  # ✅ MUST BE "/api/tasks"

if __name__ == "__main__":
    app.run(debug=True)
