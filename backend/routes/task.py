from flask import Blueprint, request, jsonify
from models import db, Task
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

task_routes = Blueprint("task", __name__)

# ✅ Get All Tasks (Only for the logged-in user)
@task_routes.route("/", methods=["GET"])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id).all()

    tasks_list = [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "due_date": task.due_date.strftime("%Y-%m-%d"),
            "priority": task.priority,
            "status": task.status
        }
        for task in tasks
    ]
    return jsonify(tasks_list), 200

# ✅ Get Task by ID
@task_routes.route("/<int:task_id>", methods=["GET"])  
@jwt_required()
def get_task_by_id(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    return jsonify({
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "due_date": task.due_date.strftime("%Y-%m-%d"),
        "priority": task.priority,
        "status": task.status
    }), 200

# ✅ Create a New Task
@task_routes.route("/", methods=["POST"])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()
    data = request.get_json()

    try:
        new_task = Task(
            title=data["title"],
            description=data.get("description"),
            due_date=datetime.strptime(data["due_date"], "%Y-%m-%d"),  
            priority=data["priority"],
            status="Pending",
            user_id=user_id
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify({"message": "Task created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ✅ Update a Task
@task_routes.route("/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    data = request.get_json()
    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.due_date = datetime.strptime(data["due_date"], "%Y-%m-%d") if "due_date" in data else task.due_date
    task.priority = data.get("priority", task.priority)
    task.status = data.get("status", task.status)

    db.session.commit()
    return jsonify({"message": "Task updated successfully"}), 200

# ✅ Delete a Task
@task_routes.route("/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"}), 200
