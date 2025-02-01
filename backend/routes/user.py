from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User

user_routes = Blueprint("user", __name__)

# ✅ Get Current User Profile
@user_routes.route("/profile", methods=["GET"])
@jwt_required()
def get_user_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "email": user.email
    }), 200

# ✅ Get a Single User by ID (Admin Feature)
@user_routes.route("/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user_by_id(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != 1:  # Assuming user ID 1 is an admin (Change based on your logic)
        return jsonify({"error": "Unauthorized"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "email": user.email
    }), 200

# ✅ Update User Profile (Only the logged-in user)
@user_routes.route("/profile", methods=["PUT"])
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
@user_routes.route("/profile", methods=["DELETE"])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200
