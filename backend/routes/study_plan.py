from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, StudyPlan
from datetime import datetime

study_plan_routes = Blueprint("study_plan", __name__)

# ✅ Get All Study Plans for the Logged-In User
@study_plan_routes.route("/", methods=["GET"])
@jwt_required()
def get_study_plans():
    user_id = get_jwt_identity()
    study_plans = StudyPlan.query.filter_by(user_id=user_id).all()

    study_plan_list = [
        {
            "id": plan.id,
            "subject": plan.subject,
            "date": plan.date.strftime("%Y-%m-%d"),  # Formatting date for JSON response
            "user_id": plan.user_id
        }
        for plan in study_plans
    ]
    return jsonify(study_plan_list), 200

# ✅ Create a Study Plan
@study_plan_routes.route("/", methods=["POST"])
@jwt_required()
def create_study_plan():
    user_id = get_jwt_identity()
    data = request.get_json()

    try:
        new_plan = StudyPlan(
            subject=data["subject"],
            date=datetime.strptime(data["date"], "%Y-%m-%d"),  # Convert string to date
            user_id=user_id
        )
        db.session.add(new_plan)
        db.session.commit()
        return jsonify({"message": "Study plan created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ✅ Update a Study Plan (User can update only their own study plan)
@study_plan_routes.route("/<int:plan_id>", methods=["PUT"])
@jwt_required()
def update_study_plan(plan_id):
    user_id = get_jwt_identity()
    study_plan = StudyPlan.query.filter_by(id=plan_id, user_id=user_id).first()

    if not study_plan:
        return jsonify({"error": "Study plan not found"}), 404

    data = request.get_json()
    
    if "subject" in data:
        study_plan.subject = data["subject"]
    if "date" in data:
        study_plan.date = datetime.strptime(data["date"], "%Y-%m-%d")  # Ensure proper date format

    db.session.commit()
    return jsonify({"message": "Study plan updated successfully"}), 200

# ✅ Delete a Study Plan (Optional)
@study_plan_routes.route("/<int:plan_id>", methods=["DELETE"])
@jwt_required()
def delete_study_plan(plan_id):
    user_id = get_jwt_identity()
    study_plan = StudyPlan.query.filter_by(id=plan_id, user_id=user_id).first()

    if not study_plan:
        return jsonify({"error": "Study plan not found"}), 404

    db.session.delete(study_plan)
    db.session.commit()
    return jsonify({"message": "Study plan deleted successfully"}), 200
