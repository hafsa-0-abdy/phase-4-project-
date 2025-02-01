from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, StudyPlan

study_plan_routes = Blueprint("study_plan", __name__)

# ✅ Get All Study Plans for the Logged-In User
@study_plan_routes.route("/", methods=["GET"])
@jwt_required()
def get_study_plans():
    user_id = get_jwt_identity()
    study_plans = StudyPlan.query.filter_by(user_id=user_id).all()

    study_plan_list = [{"id": plan.id, "subject": plan.subject, "date": plan.date} for plan in study_plans]
    return jsonify(study_plan_list), 200

# ✅ Create Study Plan
@study_plan_routes.route("/", methods=["POST"])
@jwt_required()
def create_study_plan():
    user_id = get_jwt_identity()
    data = request.get_json()
    new_plan = StudyPlan(
        subject=data["subject"],
        date=data["date"],
        user_id=user_id
    )
    db.session.add(new_plan)
    db.session.commit()
    return jsonify({"message": "Study plan created successfully"}), 201
