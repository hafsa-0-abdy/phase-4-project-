### Student Productivity App

### Date: 31/01/2025 By: Habsa Abdirizack Mohamed

### Description

The Student Productivity App is designed to help students organize their academic tasks efficiently. Users can create and manage study plans, add and track tasks, and monitor their progress through a structured and user-friendly interface. The app provides essential features such as task prioritization, study schedules, and a progress tracker to enhance productivity.

### Setup/Installation Instructions

1. Clone the repository:

 git clone https://github.com/hafsa-0-abdy/phase-4-project-.git

2. Navigate to the project directory:

 cd student-productivity-app

3. Backend Setup:

Navigate to the backend folder:

 cd backend

## Create and activate a virtual environment:

 python3 -m venv venv
 source venv/bin/activate  # On macOS/Linux
 venv\Scripts\activate  # On Windows

## Install dependencies:

 pip install -r requirements.txt

Run database migrations with Alembic:

 alembic upgrade head

## Start the backend server:

 python3 app.py

4. Frontend Setup:

Navigate to the frontend folder:

 cd ../frontend

## Install dependencies:

 npm install

## Start the frontend server:

 npm run dev

The frontend should now be accessible at http://localhost:5173.

## Features

📚 Task Management – Create, update, and delete tasks with deadlines.

📝 Study Plans – Organize subjects and study schedules.

📊 Progress Tracker – Monitor completed, pending, and incomplete tasks.

🔐 User Authentication – Secure login and logout system.

📈 Dashboard – View an overview of your tasks and study plans.

## Demo Links

## Doc Link

You can view the project documents of the app here:"https://docs.google.com/document/d/116XsRrb7mrHsT_zBqYtYvydLm85WLItZtnaa8bV98hs/edit?usp=sharing"

## DEMO VID 

You can watch a demo of the app here:

##  GitHub Repository

View the source code on GitHub:"https://github.com/hafsa-0-abdy/phase-4-project-.git"

## Known Bugs

The app currently functions as expected. If you encounter any issues, please report them in the repository's Issues section.

## Technologies Used

Backend:

Flask

Flask-RESTful

Flask-JWT-Extended

SQLAlchemy

Alembic (for database migrations)

## Frontend:

React.js

React Router

Axios

Vite

Other Tools:

SQLite (Database)

Bootstrap for UI styling

## Support & Contact Details

For any issues, suggestions, or feedback, reach out to:
📧 Email: hafsaabdirizack0@gmail.com

## License

Licensed under the MIT License.

(c) 2025 Habsa Abdirizack Mohamed

