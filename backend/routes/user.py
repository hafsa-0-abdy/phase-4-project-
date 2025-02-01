from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from models import db, User

user_routes = Blueprint("user", __name__)

# ✅ Get All Users (Admin Feature)
@user_routes.route("/", methods=["GET"])
@jwt_required()
def get_users():
    users = User.query.all()
    
    users_list = [
        {
            "id": user.id,
            "email": user.email
        }
        for user in users
    ]
    return jsonify(users_list), 200

# ✅ Get a Single User by ID
@user_routes.route("/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "email": user.email
    }), 200

# ✅ Create a New User (Signup)
@user_routes.route("/", methods=["POST"])
def create_user():
    data = request.get_json()
    
    # Check if email already exists
    existing_user = User.query.filter_by(email=data["email"]).first()
    if existing_user:
        return jsonify({"error": "Email already in use"}), 400

    hashed_password = generate_password_hash(data["password"], method="pbkdf2:sha256")
    
    new_user = User(email=data["email"], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# ✅ Update User (Only the logged-in user can update their profile)
@user_routes.route("/", methods=["PUT"])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    
    if "email" in data:
        user.email = data["email"]
    if "password" in data:
        user.password = generate_password_hash(data["password"], method="pbkdf2:sha256")

    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

# ✅ Delete User (Only the logged-in user can delete their account)
@user_routes.route("/", methods=["DELETE"])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200
