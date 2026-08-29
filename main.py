from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Student Grade Calculator Backend is Running!"


@app.route("/calculate", methods=["POST"])
def calculate():

    data = request.get_json()

    name = data["name"]

    maths = float(data["maths"])
    python = float(data["python"])
    dbms = float(data["dbms"])
    os = float(data["os"])
    cn = float(data["cn"])

    marks = [maths, python, dbms, os, cn]

    # Check marks
    if any(mark < 0 or mark > 100 for mark in marks):
        return jsonify({
            "error": "Marks should be between 0 and 100"
        }), 400

    total = sum(marks)
    average = total / 5

    if average >= 90:
        grade = "A+"
    elif average >= 80:
        grade = "A"
    elif average >= 70:
        grade = "B"
    elif average >= 60:
        grade = "C"
    elif average >= 50:
        grade = "D"
    else:
        grade = "F"

    return jsonify({
        "name": name,
        "total": total,
        "average": round(average, 2),
        "grade": grade
    })


if __name__ == "__main__":
    app.run(debug=True)