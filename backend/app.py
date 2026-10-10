from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db, init_db
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Initialize database
init_db()


# =========================================================
# HOME
# =========================================================

@app.route("/")
def home():
    return jsonify({
        "message": "AI Emergency Triage Backend is running"
    })


# =========================================================
# NEW TRIAGE
# =========================================================

@app.route("/api/triage", methods=["POST"])
def triage():

    data = request.json or {}

    name = data.get("name", "Unknown Patient")
    age = data.get("age", 0)
    gender = data.get("gender", "Not specified")
    symptoms = data.get("symptoms", "")
    severity = data.get("severity", "Mild")
    duration = data.get("duration", "")

    symptoms_lower = symptoms.lower()
    severity_lower = severity.lower()

    emergency_words = [
        "chest pain",
        "difficulty breathing",
        "unconscious",
        "severe bleeding",
        "stroke",
        "seizure"
    ]

    high_words = [
        "severe pain",
        "high fever",
        "vomiting",
        "confusion"
    ]

    risk_level = "Low"
    status = "Stable"
    recommendation = ""
    doctor_required = ""
    medicine_guidance = ""

    # =====================================================
    # EMERGENCY
    # =====================================================

    if any(word in symptoms_lower for word in emergency_words):

        risk_level = "Emergency"
        status = "Emergency"

        recommendation = (
            "Seek emergency medical care immediately."
        )

        doctor_required = (
            "Emergency doctor required immediately."
        )

        medicine_guidance = (
            "Do not self-medicate. Emergency treatment and "
            "medicines must be decided by healthcare professionals."
        )

    # =====================================================
    # SEVERE
    # =====================================================

    elif severity_lower == "severe":

        risk_level = "High"
        status = "Monitoring"

        recommendation = (
            "Urgent medical evaluation is recommended."
        )

        doctor_required = (
            "Urgent doctor consultation required."
        )

        medicine_guidance = (
            "Do not start medication without professional evaluation. "
            "The appropriate medicine depends on the underlying cause."
        )

    # =====================================================
    # HIGH-RISK SYMPTOMS
    # =====================================================

    elif any(word in symptoms_lower for word in high_words):

        risk_level = "High"
        status = "Monitoring"

        recommendation = (
            "Consult a healthcare professional as soon as possible."
        )

        doctor_required = (
            "Doctor consultation required."
        )

        medicine_guidance = (
            "Medication should be selected by a healthcare professional "
            "after evaluating the patient's symptoms."
        )

    # =====================================================
    # MODERATE
    # =====================================================

    elif severity_lower == "moderate":

        risk_level = "Moderate"
        status = "Monitoring"

        recommendation = (
            "Monitor the symptoms and consider consulting a doctor, "
            "especially if symptoms continue or worsen."
        )

        doctor_required = (
            "Doctor consultation recommended."
        )

        medicine_guidance = (
            "Avoid self-prescribing medication. A doctor or pharmacist "
            "can recommend appropriate treatment."
        )

    # =====================================================
    # LOW
    # =====================================================

    else:

        risk_level = "Low"
        status = "Stable"

        doctor_required = (
            "Doctor consultation may not be immediately required "
            "if symptoms remain mild."
        )

        # -------------------------------------------------
        # FEVER
        # -------------------------------------------------

        if "fever" in symptoms_lower:

            recommendation = (
                "Monitor body temperature, stay hydrated, and seek "
                "medical advice if the fever persists or worsens."
            )

            medicine_guidance = (
                "For suitable adults, paracetamol may be considered "
                "for fever if medically appropriate. Follow the product "
                "label and consult a healthcare professional if unsure."
            )

        # -------------------------------------------------
        # HEADACHE
        # -------------------------------------------------

        elif "headache" in symptoms_lower:

            recommendation = (
                "Rest, maintain hydration, and monitor the headache. "
                "Seek medical advice if it becomes severe or persistent."
            )

            medicine_guidance = (
                "For suitable adults, paracetamol may be considered "
                "for mild pain if medically appropriate. Follow the "
                "product label and consult a healthcare professional "
                "if unsure."
            )

        # -------------------------------------------------
        # COUGH
        # -------------------------------------------------

        elif "cough" in symptoms_lower:

            recommendation = (
                "Monitor the cough, stay hydrated, and seek medical "
                "advice if it persists, worsens, or affects breathing."
            )

            medicine_guidance = (
                "No specific medicine is prescribed by this system. "
                "A pharmacist or doctor can recommend an appropriate "
                "cough treatment based on the cause."
            )

        # -------------------------------------------------
        # COLD
        # -------------------------------------------------

        elif (
            "cold" in symptoms_lower
            or "runny nose" in symptoms_lower
        ):

            recommendation = (
                "Rest, maintain hydration, and monitor symptoms. "
                "Seek medical advice if symptoms worsen or persist."
            )

            medicine_guidance = (
                "Supportive care such as adequate fluids and rest "
                "may help. Ask a pharmacist or doctor before taking "
                "cold medicines."
            )

        # -------------------------------------------------
        # DIARRHEA
        # -------------------------------------------------

        elif "diarrhea" in symptoms_lower:

            recommendation = (
                "Maintain hydration and monitor symptoms. "
                "Seek medical care if diarrhea is severe, persistent, "
                "or accompanied by signs of dehydration."
            )

            medicine_guidance = (
                "ORS can help replace fluids and electrolytes during "
                "diarrhea. Consult a healthcare professional if "
                "symptoms are severe or persistent."
            )

        # -------------------------------------------------
        # VOMITING
        # -------------------------------------------------

        elif "vomiting" in symptoms_lower:

            recommendation = (
                "Maintain small amounts of fluid if tolerated and "
                "seek medical advice if vomiting continues."
            )

            medicine_guidance = (
                "ORS may help with fluid and electrolyte replacement. "
                "Persistent or severe vomiting requires medical evaluation."
            )

        # -------------------------------------------------
        # SORE THROAT
        # -------------------------------------------------

        elif "sore throat" in symptoms_lower:

            recommendation = (
                "Stay hydrated and monitor throat symptoms. "
                "Seek medical advice if symptoms become severe "
                "or persistent."
            )

            medicine_guidance = (
                "Warm fluids may provide supportive relief. "
                "Consult a pharmacist or doctor before taking medication."
            )

        # -------------------------------------------------
        # BODY / MUSCLE PAIN
        # -------------------------------------------------

        elif (
            "body pain" in symptoms_lower
            or "muscle pain" in symptoms_lower
        ):

            recommendation = (
                "Rest, maintain hydration, and monitor the pain. "
                "Seek medical advice if pain becomes severe or persistent."
            )

            medicine_guidance = (
                "For suitable adults, a common pain reliever may be "
                "considered if medically appropriate. Follow the product "
                "label and consult a healthcare professional if unsure."
            )

        # -------------------------------------------------
        # STOMACH / ABDOMINAL PAIN
        # -------------------------------------------------

        elif (
            "stomach pain" in symptoms_lower
            or "abdominal pain" in symptoms_lower
        ):

            recommendation = (
                "Monitor the abdominal symptoms and seek medical advice "
                "if the pain persists, worsens, or is associated with "
                "vomiting, fever, or bleeding."
            )

            medicine_guidance = (
                "No specific medicine recommendation is provided because "
                "abdominal pain can have many different causes. "
                "Professional evaluation may be required."
            )

        # -------------------------------------------------
        # GENERAL MILD SYMPTOMS
        # -------------------------------------------------

        else:

            recommendation = (
                "Monitor the symptoms and maintain general supportive "
                "care. Seek medical advice if symptoms persist or worsen."
            )

            medicine_guidance = (
                "No specific medicine recommendation. The appropriate "
                "treatment depends on the cause of the symptoms."
            )

    # =====================================================
    # SAVE PATIENT AND ASSESSMENT
    # =====================================================

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO patients
        (name, age, gender, symptoms, risk_level, status)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        name,
        age,
        gender,
        symptoms,
        risk_level,
        status
    ))

    patient_id = cursor.lastrowid

    cursor.execute("""
        INSERT INTO assessments
        (patient_id, symptoms, risk_level, recommendation)
        VALUES (?, ?, ?, ?)
    """, (
        patient_id,
        symptoms,
        risk_level,
        recommendation
    ))

    conn.commit()
    conn.close()

    # =====================================================
    # RETURN RESULT
    # =====================================================

    return jsonify({
        "success": True,
        "patient_id": patient_id,
        "name": name,
        "age": age,
        "gender": gender,
        "symptoms": symptoms,
        "severity": severity,
        "duration": duration,
        "risk_level": risk_level,
        "status": status,
        "recommendation": recommendation,
        "doctor_required": doctor_required,
        "medicine_guidance": medicine_guidance
    })


# =========================================================
# GET ALL PATIENTS
# =========================================================

@app.route("/api/patients", methods=["GET"])
def get_patients():

    conn = get_db()

    patients = conn.execute("""
        SELECT *
        FROM patients
        ORDER BY id DESC
    """).fetchall()

    conn.close()

    return jsonify([
        dict(patient)
        for patient in patients
    ])


# =========================================================
# GET SINGLE PATIENT
# =========================================================

@app.route("/api/patients/<int:patient_id>", methods=["GET"])
def get_patient(patient_id):

    conn = get_db()

    patient = conn.execute("""
        SELECT *
        FROM patients
        WHERE id = ?
    """, (patient_id,)).fetchone()

    conn.close()

    if patient is None:

        return jsonify({
            "error": "Patient not found"
        }), 404

    return jsonify(dict(patient))


# =========================================================
# HISTORY
# =========================================================

@app.route("/api/history", methods=["GET"])
def get_history():

    conn = get_db()

    history = conn.execute("""
        SELECT
            assessments.id,
            assessments.patient_id,
            patients.name,
            patients.age,
            patients.gender,
            assessments.symptoms,
            assessments.risk_level,
            assessments.recommendation,
            assessments.created_at
        FROM assessments
        LEFT JOIN patients
        ON assessments.patient_id = patients.id
        ORDER BY assessments.id DESC
    """).fetchall()

    conn.close()

    return jsonify([
        dict(item)
        for item in history
    ])


# =========================================================
# ANALYTICS
# =========================================================

@app.route("/api/analytics", methods=["GET"])
def analytics():

    conn = get_db()

    days = request.args.get(
        "days",
        default=7,
        type=int
    )

    if days not in [7, 30, 90]:
        days = 7

    # -----------------------------------------------------
    # TOTAL
    # -----------------------------------------------------

    total = conn.execute("""
        SELECT COUNT(*) AS count
        FROM assessments
    """).fetchone()["count"]

    # -----------------------------------------------------
    # RISK COUNTS
    # -----------------------------------------------------

    low = conn.execute("""
        SELECT COUNT(*) AS count
        FROM assessments
        WHERE risk_level = 'Low'
    """).fetchone()["count"]

    moderate = conn.execute("""
        SELECT COUNT(*) AS count
        FROM assessments
        WHERE risk_level = 'Moderate'
    """).fetchone()["count"]

    high = conn.execute("""
        SELECT COUNT(*) AS count
        FROM assessments
        WHERE risk_level = 'High'
    """).fetchone()["count"]

    emergency = conn.execute("""
        SELECT COUNT(*) AS count
        FROM assessments
        WHERE risk_level = 'Emergency'
    """).fetchone()["count"]

    # -----------------------------------------------------
    # DAILY ACTIVITY
    # -----------------------------------------------------

    daily_activity = conn.execute("""
        SELECT
            DATE(created_at) AS date,
            COUNT(*) AS count
        FROM assessments
        WHERE DATE(created_at) >= DATE('now', ?)
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
    """, (f"-{days - 1} days",)).fetchall()

    activity_dict = {
        row["date"]: row["count"]
        for row in daily_activity
    }

    # -----------------------------------------------------
    # COMPLETE DATE RANGE
    # -----------------------------------------------------

    today = datetime.now().date()

    complete_activity = []

    for i in range(days - 1, -1, -1):

        current_date = today - timedelta(days=i)

        date_string = current_date.strftime("%Y-%m-%d")

        complete_activity.append({
            "date": date_string,
            "count": activity_dict.get(date_string, 0)
        })

    conn.close()

    return jsonify({
        "total": total,
        "low": low,
        "moderate": moderate,
        "high": high,
        "emergency": emergency,
        "daily_activity": complete_activity
    })


# =========================================================
# EMERGENCY CARE
# =========================================================

@app.route("/api/emergency-care", methods=["GET"])
def emergency_care():

    facilities = [

        {
            "name": "City Emergency Hospital",
            "type": "24/7 Emergency Department",
            "distance": "1.2 km",
            "status": "Open",
            "phone": "+91 98765 43210"
        },

        {
            "name": "CarePlus Medical Center",
            "type": "Emergency & Trauma Care",
            "distance": "2.4 km",
            "status": "Open",
            "phone": "+91 98765 12345"
        },

        {
            "name": "LifeLine Hospital",
            "type": "Emergency Care Unit",
            "distance": "3.1 km",
            "status": "Open",
            "phone": "+91 98765 67890"
        }
    ]

    return jsonify(facilities)


# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )