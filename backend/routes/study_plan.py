from flask import Blueprint, request, jsonify
from models import db, StudyPlan

study_plan_routes = Blueprint("study_plan", __name__)

@study_plan_routes.route("/study-plans", methods=["GET"])
def get_study_plans():
    study_plans = StudyPlan.query.all()
    study_plan_list = [{"id": plan.id, "subject": plan.subject, "date": plan.date} for plan in study_plans]
    return jsonify(study_plan_list), 200

@study_plan_routes.route("/study-plans", methods=["POST"])
def create_study_plan():
    data = request.get_json()
    new_plan = StudyPlan(
        subject=data["subject"],
        date=data["date"],
        user_id=data["user_id"]
    )
    db.session.add(new_plan)
    db.session.commit()
    return jsonify({"message": "Study plan created successfully"}), 201
