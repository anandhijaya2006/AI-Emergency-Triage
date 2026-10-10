
import { useEffect, useState } from "react";

function Patients() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  // Fetch patients from Flask
  const fetchPatients = () => {
    setLoading(true);
    setError("");

    fetch("http://127.0.0.1:5000/api/patients")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        return response.json();
      })
      .then((data) => {
        setPatients(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Patients error:", err);
        setError("Backend connection failed. Make sure Flask is running.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Search patients
  const filteredPatients = patients.filter((patient) =>
    `${patient.name || ""} ${patient.id || ""} ${patient.symptoms || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Open patient details and request full record from backend
  const handleViewPatient = async (patient) => {
    setSelectedPatient(patient);
    setPatientDetails(patient);
    setDetailsLoading(true);
    setDetailsError("");

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/patients/${patient.id}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error(`Unable to load full details (${response.status})`);
      }

      const details = await response.json();
      setPatientDetails(details);
    } catch (err) {
      console.error("Patient details error:", err);
      setDetailsError(
        "Showing available patient information. Full details could not be loaded."
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  const closePatientDetails = () => {
    setSelectedPatient(null);
    setPatientDetails(null);
    setDetailsError("");
  };

  // Statistics
  const totalPatients = patients.length;

  const stablePatients = patients.filter(
    (patient) => patient.status === "Stable"
  ).length;

  const monitoringPatients = patients.filter(
    (patient) => patient.status === "Monitoring"
  ).length;

  const emergencyPatients = patients.filter(
    (patient) => patient.risk_level === "Emergency"
  ).length;

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString();
  };

  const detail = patientDetails || selectedPatient;

  return (
    <div className="patients-page">
      {/* HEADER */}
      <div className="patients-header">
        <div>
          <div className="breadcrumb">Dashboard / Patients</div>
          <h2>Patients</h2>
          <p>Manage patient information and triage assessment history.</p>
        </div>

        <button
          type="button"
          className="new-triage-btn"
          onClick={() => {
            window.location.href = "/new-triage";
          }}
        >
          + New Patient
        </button>
      </div>

      {/* STATISTICS */}
      <div className="patient-stats">
        <div className="patient-stat-card">
          <div className="patient-stat-icon blue">👥</div>
          <div>
            <span>Total Patients</span>
            <strong>{totalPatients}</strong>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon green">✓</div>
          <div>
            <span>Stable</span>
            <strong>{stablePatients}</strong>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon orange">⚠️</div>
          <div>
            <span>Monitoring</span>
            <strong>{monitoringPatients}</strong>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon red">🚨</div>
          <div>
            <span>Emergency</span>
            <strong>{String(emergencyPatients).padStart(2, "0")}</strong>
          </div>
        </div>
      </div>

      {/* PATIENT RECORDS */}
      <div className="patients-card">
        <div className="patients-card-header">
          <div>
            <h3>Patient Records</h3>
            <p>Recent patient assessment records</p>
          </div>

          <div className="patient-actions">
            <div className="search-box">
              🔍
              <input
                type="text"
                placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="filter-button"
              onClick={fetchPatients}
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {loading && (
          <div className="no-patients">Loading patient records...</div>
        )}

        {!loading && error && (
          <div className="no-patients" role="alert">
            ⚠️ {error}
            <button type="button" onClick={fetchPatients}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="patients-table">
            <div className="patients-table-header">
              <span>Patient</span>
              <span>Age / Gender</span>
              <span>Last Assessment</span>
              <span>Risk Level</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {filteredPatients.map((patient) => (
              <div className="patients-table-row" key={patient.id}>
                <div className="patient-info">
                  <div className="patient-avatar">
                    {patient.name
                      ? patient.name.charAt(0).toUpperCase()
                      : "P"}
                  </div>

                  <div>
                    <strong>{patient.name || "Unknown"}</strong>
                    <span>
                      PAT-{String(patient.id).padStart(4, "0")}
                    </span>
                  </div>
                </div>

                <div className="patient-age">
                  {patient.age ?? "N/A"} years
                  <span>{patient.gender || "Not specified"}</span>
                </div>

                <div className="assessment-info">
                  <strong>{patient.symptoms || "Not available"}</strong>
                  <span>{formatDate(patient.created_at)}</span>
                </div>

                <span
                  className={`badge ${
                    patient.risk_level
                      ? patient.risk_level.toLowerCase()
                      : ""
                  }`}
                >
                  {patient.risk_level || "Unclassified"}
                </span>

                <span
                  className={`patient-status ${
                    patient.status ? patient.status.toLowerCase() : ""
                  }`}
                >
                  ● {patient.status || "Unknown"}
                </span>

                <button
                  type="button"
                  className="view-button"
                  onClick={() => handleViewPatient(patient)}
                >
                  View →
                </button>
              </div>
            ))}

            {filteredPatients.length === 0 && (
              <div className="no-patients">No patients found.</div>
            )}
          </div>
        )}

        {!loading && !error && (
          <div className="patients-footer">
            <span>
              Showing {filteredPatients.length} of {patients.length} patients
            </span>
          </div>
        )}
      </div>

      {/* PATIENT DETAILS MODAL */}
      {selectedPatient && detail && (
        <div
          className="patient-modal-overlay"
          onClick={closePatientDetails}
        >
          <div
            className="patient-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="patient-details-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="patient-modal-header">
              <div>
                <h3 id="patient-details-title">Patient Details</h3>
                <p>
                  PAT-{String(detail.id).padStart(4, "0")}
                </p>
              </div>

              <button
                type="button"
                className="close-modal"
                onClick={closePatientDetails}
                aria-label="Close patient details"
              >
                ✕
              </button>
            </div>

            {detailsLoading && (
              <p role="status">Loading full patient details...</p>
            )}

            {detailsError && (
              <p role="status">{detailsError}</p>
            )}

            <div className="details-section">
              <h4>👤 Personal Information</h4>

              <div className="details-grid">
                <div>
                  <span>Patient Name</span>
                  <strong>{detail.name || "Not available"}</strong>
                </div>

                <div>
                  <span>Patient ID</span>
                  <strong>
                    PAT-{String(detail.id).padStart(4, "0")}
                  </strong>
                </div>

                <div>
                  <span>Age</span>
                  <strong>
                    {detail.age != null ? `${detail.age} years` : "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Gender</span>
                  <strong>{detail.gender || "Not specified"}</strong>
                </div>

                <div>
                  <span>Risk Level</span>
                  <strong>{detail.risk_level || "Not available"}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{detail.status || "Not available"}</strong>
                </div>

                <div>
                  <span>Assessment Date</span>
                  <strong>{formatDate(detail.created_at)}</strong>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h4>🩺 Assessment Information</h4>

              <div>
                <span>Reported Symptoms</span>
                <p>{detail.symptoms || "No symptoms recorded."}</p>
              </div>
            </div>

            <div className="patient-modal-actions">
              <button
                type="button"
                className="close-details-button"
                onClick={closePatientDetails}
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

export default Patients;
