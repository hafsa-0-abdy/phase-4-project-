from flask import Blueprint, request, jsonify
from models import db, User

user_routes = Blueprint("user", __name__)

@user_routes.route("/profile/<int:user_id>", methods=["GET"])
def get_user_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"id": user.id, "email": user.email}), 200
