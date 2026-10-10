from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "AI Emergency Triage Backend is running"
    })


@app.route("/api/triage", methods=["POST"])
def triage():

    data = request.get_json()

    symptoms = data.get("symptoms", "").lower()

    if not symptoms:
        return jsonify({
            "success": False,
            "message": "Please enter symptoms"
        }), 400

    emergency_words = [
        "chest pain",
        "difficulty breathing",
        "severe bleeding",
        "unconscious",
        "not breathing",
        "stroke",
        "seizure"
    ]

    high_risk_words = [
        "severe pain",
        "high fever",
        "persistent vomiting",
        "confusion",
        "fainting"
    ]

    moderate_words = [
        "fever",
        "vomiting",
        "headache",
        "dizziness",
        "abdominal pain"
    ]

    risk = "Low"
    action = "Monitor symptoms and consider routine medical consultation."

    for word in emergency_words:
        if word in symptoms:
            risk = "Emergency"
            action = "Seek emergency medical care immediately."
            break

    if risk == "Low":
        for word in high_risk_words:
            if word in symptoms:
                risk = "High"
                action = "Seek medical attention as soon as possible."
                break

    if risk == "Low":
        for word in moderate_words:
            if word in symptoms:
                risk = "Moderate"
                action = "Consider consulting a healthcare professional."
                break

    return jsonify({
        "success": True,
        "risk_level": risk,
        "recommended_action": action,
        "message": "Risk assessment completed"
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )