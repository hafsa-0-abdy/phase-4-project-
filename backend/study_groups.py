from flask import Blueprint, request, jsonify
from models import db, StudyGroup, User
from flask_jwt_extended import jwt_required, get_jwt_identity

study_group_routes = Blueprint("study_group", __name__)

# ✅ Create a Study Group
@study_group_routes.route("/", methods=["POST"])
@jwt_required()
def create_study_group():
    user_id = get_jwt_identity()
    data = request.get_json()

    new_group = StudyGroup(name=data["name"], owner_id=user_id)
    db.session.add(new_group)
    db.session.commit()

    return jsonify({"message": "Study group created!", "group": new_group.id}), 201

# ✅ Add a User to a Study Group
@study_group_routes.route("/<int:group_id>/add-user", methods=["POST"])
@jwt_required()
def add_user_to_group(group_id):
    data = request.get_json()
    user_to_add = User.query.get(data["user_id"])

    if not user_to_add:
        return jsonify({"error": "User not found"}), 404

    group = StudyGroup.query.get(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404

    group.members.append(user_to_add)
    db.session.commit()
    return jsonify({"message": "User added to group!"}), 200

# ✅ Get All Study Groups for a User
@study_group_routes.route("/my-groups", methods=["GET"])
@jwt_required()
def get_user_study_groups():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    groups = [{"id": g.id, "name": g.name} for g in user.study_groups]
    return jsonify(groups), 200

# ✅ Remove a User from a Study Group
@study_group_routes.route("/<int:group_id>/remove-user", methods=["DELETE"])
@jwt_required()
def remove_user_from_group(group_id):
    data = request.get_json()
    user_to_remove = User.query.get(data["user_id"])
    group = StudyGroup.query.get(group_id)

    if not group or not user_to_remove:
        return jsonify({"error": "Invalid request"}), 400

    group.members.remove(user_to_remove)
    db.session.commit()
    return jsonify({"message": "User removed from group!"}), 200

# ✅ Delete a Study Group
@study_group_routes.route("/<int:group_id>", methods=["DELETE"])
@jwt_required()
def delete_study_group(group_id):
    group = StudyGroup.query.get(group_id)

    if not group:
        return jsonify({"error": "Group not found"}), 404

    db.session.delete(group)
    db.session.commit()
    return jsonify({"message": "Study group deleted!"}), 200
