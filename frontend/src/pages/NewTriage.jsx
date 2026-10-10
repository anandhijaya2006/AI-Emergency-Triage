import { useState } from "react";

function NewTriage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState("Mild");
  const [duration, setDuration] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const assessRisk = async () => {
    if (!name.trim()) {
      alert("Please enter patient name.");
      return;
    }

    if (!age) {
      alert("Please enter patient age.");
      return;
    }

    if (!symptoms.trim()) {
      alert("Please enter patient symptoms.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/triage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          age: age,
          gender: gender,
          symptoms: symptoms,
          severity: severity,
          duration: duration,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Assessment failed");
      }

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Backend connection failed. Make sure Flask server is running.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskClass = () => {
    if (!result) return "";

    return result.risk_level
      .toLowerCase()
      .replace(" ", "-");
  };

  const getRiskIcon = () => {
    if (!result) return "⚕️";

    if (result.risk_level === "Emergency") {
      return "🚨";
    }

    if (result.risk_level === "High") {
      return "⚠️";
    }

    if (result.risk_level === "Moderate") {
      return "🟡";
    }

    return "✅";
  };

  return (
    <div className="new-triage-page">

      {/* PAGE HEADER */}
      <div className="triage-page-header">
        <div>
          <span className="triage-label">
            EMERGENCY ASSESSMENT
          </span>

          <h1>New Triage</h1>

          <p>
            Enter patient information to assess emergency risk.
          </p>
        </div>

        <div className="secure-badge">
          🔒 Secure Assessment
        </div>
      </div>

      {/* MEDICAL WARNING */}
      <div className="triage-warning">
        <span>⚠️</span>

        <div>
          <strong>Important Medical Notice</strong>

          <p>
            This tool provides decision-support information only.
            It is not a diagnostic or prescription replacement.
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="triage-card">

        <div className="triage-card-header">
          <div>
            <h2>Patient Information</h2>

            <p>
              Provide the patient's current symptoms and condition.
            </p>
          </div>

          <span className="required-text">
            * Required fields
          </span>
        </div>

        <div className="triage-form">

          {/* NAME */}
          <div className="form-group">
            <label>
              Patient Name <span>*</span>
            </label>

            <input
              type="text"
              placeholder="Enter patient name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* AGE */}
          <div className="form-group">
            <label>
              Age <span>*</span>
            </label>

            <input
              type="number"
              placeholder="Enter patient age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="0"
              max="120"
            />
          </div>

          {/* GENDER */}
          <div className="form-group">
            <label>Gender</label>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* SEVERITY */}
          <div className="form-group">
            <label>Current Severity</label>

            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>

          {/* SYMPTOMS */}
          <div className="form-group full-width">
            <label>
              Symptoms <span>*</span>
            </label>

            <textarea
              placeholder="Example: chest pain, difficulty breathing, fever..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows="5"
            />

            <small>
              Describe the patient's main symptoms clearly.
            </small>
          </div>

          {/* DURATION */}
          <div className="form-group">
            <label>Symptom Duration</label>

            <input
              type="text"
              placeholder="Example: 30 minutes"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

        </div>

        {/* ASSESS BUTTON */}
        <button
          className="assess-button"
          onClick={assessRisk}
          disabled={loading}
        >
          {loading
            ? "⏳ Assessing..."
            : "🔎 Assess Emergency Risk"}
        </button>

      </div>

      {/* RESULT */}
      {result && (
        <div className={`triage-result ${getRiskClass()}`}>

          {/* RESULT HEADER */}
          <div className="result-header">

            <div>
              <span className="result-label">
                AI RISK ASSESSMENT
              </span>

              <h2>Assessment Result</h2>
            </div>

            <div className="risk-level">
              {result.risk_level}
            </div>

          </div>

          {/* RISK SUMMARY */}
          <div className="result-content">

            <div className="result-icon">
              {getRiskIcon()}
            </div>

            <div>
              <h3>
                {result.risk_level} Risk
              </h3>

              <p>
                {result.recommendation}
              </p>
            </div>

          </div>

          {/* DOCTOR + MEDICINE */}
          <div className="medical-recommendations">

            {/* DOCTOR */}
            <div className="recommendation-box">

              <div className="recommendation-icon">
                👨‍⚕️
              </div>

              <div>
                <h4>
                  Doctor Requirement
                </h4>

                <p>
                  {result.doctor_required}
                </p>
              </div>

            </div>

            {/* MEDICINE */}
            <div className="recommendation-box">

              <div className="recommendation-icon">
                💊
              </div>

              <div>
                <h4>
                  Medicine Guidance
                </h4>

                <p>
                  {result.medicine_guidance}
                </p>
              </div>

            </div>

          </div>

          {/* CARE RECOMMENDATION */}
          <div className="care-recommendation">

            <div className="care-icon">
              🏥
            </div>

            <div>
              <h4>Recommended Care</h4>

              <p>
                {result.recommendation}
              </p>
            </div>

          </div>

          {/* NOTICE */}
          <div className="result-notice">
            ⚕️ This assessment is intended for decision support.
            For severe or life-threatening symptoms, seek
            professional emergency medical care immediately.
          </div>

        </div>
      )}

    </div>
  );
}

export default NewTriage;