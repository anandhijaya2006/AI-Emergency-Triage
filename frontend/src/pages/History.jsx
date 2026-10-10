import { useEffect, useState } from "react";

function History() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All Risk Levels");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
const [showDetails, setShowDetails] = useState(false);

  // Fetch history from Flask
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/history")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        return response.json();
      })
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("History error:", error);
        setError(
          "Backend connection failed. Make sure Flask server is running."
        );
        setLoading(false);
      });
  }, []);

  // Search + filter
  const filteredRecords = records.filter((record) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      String(record.id).includes(searchText) ||
      String(record.patient_id).includes(searchText) ||
      String(record.name || "").toLowerCase().includes(searchText) ||
      String(record.symptoms || "").toLowerCase().includes(searchText);

    const matchesRisk =
      riskFilter === "All Risk Levels" ||
      record.risk_level === riskFilter;

    return matchesSearch && matchesRisk;
  });

  // Statistics
  const totalRecords = records.length;

  const emergencyCount = records.filter(
    (record) => record.risk_level === "Emergency"
  ).length;

  const highCount = records.filter(
    (record) => record.risk_level === "High"
  ).length;

  const lowCount = records.filter(
    (record) => record.risk_level === "Low"
  ).length;

  // Format date
  const formatDate = (date) => {
    if (!date) return "Recently";

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      return date;
    }

    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      return "";
    }

    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="history-page">

      {/* HEADER */}

      <div className="history-header">

        <div>

          <span className="history-label">
            TRIAGE RECORDS
          </span>

          <h1>Assessment History</h1>

          <p>
            View and manage previous emergency triage assessments.
          </p>

        </div>

        <button className="export-button">
          ↓ Export Records
        </button>

      </div>


      {/* SUMMARY */}

      <div className="history-summary">

        <div>
          <span>Total Records</span>
          <strong>{totalRecords}</strong>
        </div>

        <div>
          <span>Emergency</span>
          <strong>
            {String(emergencyCount).padStart(2, "0")}
          </strong>
        </div>

        <div>
          <span>High Risk</span>
          <strong>
            {String(highCount).padStart(2, "0")}
          </strong>
        </div>

        <div>
          <span>Low Risk</span>
          <strong>{lowCount}</strong>
        </div>

      </div>


      {/* FILTER */}

      <div className="history-filter">

        <div className="history-search">

          🔍

          <input
            type="text"
            placeholder="Search patient or assessment ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
        >

          <option>All Risk Levels</option>
          <option>Low</option>
          <option>Moderate</option>
          <option>High</option>
          <option>Emergency</option>

        </select>


        <select defaultValue="All Dates">

          <option>All Dates</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>

        </select>

      </div>


      {/* TABLE */}

      <div className="history-table-card">

        <div className="table-title">

          <div>

            <h3>Recent Assessments</h3>

            <p>
              Latest triage assessment records
            </p>

          </div>

          <span>
            {records.length} records
          </span>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="history-empty">

            ⏳ Loading assessment history...

          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <div className="history-empty">

            ⚠️ {error}

          </div>

        )}


        {/* TABLE */}

        {!loading && !error && (

          <div className="history-table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>Assessment ID</th>

                  <th>Patient</th>

                  <th>Symptoms</th>

                  <th>Risk Level</th>

                  <th>Date & Time</th>

                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {filteredRecords.map((record) => (

                  <tr key={record.id}>

                    {/* ID */}

                    <td>

                      <strong className="assessment-id">

                        TR-
                        {String(record.id).padStart(4, "0")}

                      </strong>

                    </td>


                    {/* PATIENT */}

                    <td>

                      <div className="patient-name">

                        <div className="patient-avatar">

                          {(record.name || "P")
                            .charAt(0)
                            .toUpperCase()}

                        </div>

                        <span>

                          {record.name || "Unknown Patient"}

                        </span>

                      </div>

                    </td>


                    {/* SYMPTOMS */}

                    <td>

                      <span className="symptom-text">

                        {record.symptoms}

                      </span>

                    </td>


                    {/* RISK */}

                    <td>

                      <span
                        className={`risk-badge ${
                          record.risk_level
                            ? record.risk_level.toLowerCase()
                            : ""
                        }`}
                      >

                        ● {record.risk_level}

                      </span>

                    </td>


                    {/* DATE */}

                    <td>

                      <div className="date-time">

                        <strong>
                          {formatDate(record.created_at)}
                        </strong>

                        <small>
                          {formatTime(record.created_at)}
                        </small>

                      </div>

                    </td>


                    {/* ACTION */}

                    <td>

<button
  className="view-button"
  onClick={() => {
    setSelectedRecord(record);
    setShowDetails(true);
  }}
>
  View →
</button>


                    </td>

                  </tr>

                ))}


                {/* NO RECORDS */}

                {filteredRecords.length === 0 && (

                  <tr>

                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        padding: "40px"
                      }}
                    >

                      No assessment records found.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}


        {/* PAGINATION */}

        {!loading && !error && (

          <div className="history-pagination">

            <button>
              ← Previous
            </button>

            <div>

              <span className="active-page-number">
                1
              </span>

              <span>2</span>

              <span>3</span>

              <span>...</span>

            </div>

            <button>
              Next →
            </button>

          </div>

        )}

      </div>


      {/* DISCLAIMER */}

      <div className="history-disclaimer">

        ⚠️ Assessment history contains decision-support records.
        Always verify critical information with a qualified healthcare professional.

      </div>
      
{/* ASSESSMENT DETAILS MODAL */}

{showDetails && selectedRecord && (
  <div className="patient-modal-overlay">
    <div className="patient-modal">

      <div className="patient-modal-header">
        <div>
          <h3>Assessment Details</h3>
          <p>
            TR-{String(selectedRecord.id).padStart(4, "0")}
          </p>
        </div>

        <button
          className="close-modal"
          onClick={() => setShowDetails(false)}
        >
          ✕
        </button>
      </div>

      <div className="details-section">
        <h4>👤 Patient Information</h4>

        <div className="details-grid">
          <div>
            <span>Patient Name</span>
            <strong>{selectedRecord.name || "Unknown"}</strong>
          </div>

          <div>
            <span>Patient ID</span>
            <strong>{selectedRecord.patient_id}</strong>
          </div>

          <div>
            <span>Age</span>
            <strong>{selectedRecord.age ?? "Not available"}</strong>
          </div>

          <div>
            <span>Gender</span>
            <strong>{selectedRecord.gender || "Not available"}</strong>
          </div>
        </div>
      </div>

      <div className="details-section">
        <h4>🩺 Assessment Information</h4>

        <div className="details-grid">
          <div>
            <span>Symptoms</span>
            <strong>{selectedRecord.symptoms || "Not available"}</strong>
          </div>

          <div>
            <span>Risk Level</span>
            <strong>{selectedRecord.risk_level || "Unknown"}</strong>
          </div>

          <div>
            <span>Assessment Date</span>
            <strong>{formatDate(selectedRecord.created_at)}</strong>
          </div>

          <div>
            <span>Assessment Time</span>
            <strong>{formatTime(selectedRecord.created_at) || "Not available"}</strong>
          </div>
        </div>
      </div>

      <div className="details-section">
        <h4>📋 Recommendation</h4>
        <p>
          {selectedRecord.recommendation ||
            "No recommendation is available for this assessment."}
        </p>
      </div>

      <div className="patient-modal-actions">
        <button
          className="close-details-button"
          onClick={() => setShowDetails(false)}
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}


    </div>
  );
}

export default History;