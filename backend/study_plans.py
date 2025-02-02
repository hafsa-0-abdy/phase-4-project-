from flask import Blueprint, request, jsonify
from models import db, StudyPlan
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

study_plan_routes = Blueprint("study_plan", __name__)

# ✅ Get all study plans for the logged-in user
@study_plan_routes.route("/", methods=["GET"])
@jwt_required()
def get_study_plans():
    user_id = get_jwt_identity()
    study_plans = StudyPlan.query.filter_by(user_id=user_id).all()

    study_plan_list = [
        {"id": plan.id, "subject": plan.subject, "date": plan.date.strftime("%Y-%m-%d")}
        for plan in study_plans
    ]
    return jsonify(study_plan_list), 200

# ✅ Add a new study plan
@study_plan_routes.route("/", methods=["POST"])
@jwt_required()
def create_study_plan():
    user_id = get_jwt_identity()
    data = request.get_json()

    if not data.get("subject") or not data.get("date"):
        return jsonify({"error": "Subject and Date are required"}), 400  # ✅ Prevent empty submissions

    try:
        new_plan = StudyPlan(
            subject=data["subject"],
            date=datetime.strptime(data["date"], "%Y-%m-%d"),
            user_id=user_id
        )
        db.session.add(new_plan)
        db.session.commit()
        return jsonify({"id": new_plan.id, "subject": new_plan.subject, "date": new_plan.date.strftime("%Y-%m-%d")}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
