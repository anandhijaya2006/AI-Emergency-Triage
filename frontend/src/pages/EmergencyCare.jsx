
import { useEffect, useState } from "react";

function EmergencyCare() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationMessage, setLocationMessage] = useState(
    "Location not detected"
  );
  const [locationLoading, setLocationLoading] = useState(false);

  // Load hospitals from Flask backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/emergency-care")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load hospitals");
        }
        return response.json();
      })
      .then((data) => {
        setHospitals(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Emergency Care error:", err);
        setError(
          "Cannot load saved hospitals. Please check whether Flask is running."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  // Search the hospital records already available in the backend
  const filteredHospitals = hospitals.filter((hospital) => {
    const query = search.trim().toLowerCase();

    const hospitalInfo = [
      hospital.name,
      hospital.type,
      hospital.address,
      hospital.city,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return hospitalInfo.includes(query);
  });

  // Search any hospital or location on Google Maps
  const searchOnGoogleMaps = () => {
    const query = search.trim();

    if (!query) {
      alert("Please enter a hospital name or location.");
      return;
    }

    const params = new URLSearchParams({
      api: "1",
      query: query,
    });

    window.open(
      `https://www.google.com/maps/search/?${params.toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Open the emergency calling app
  const callEmergency = () => {
    window.location.href = "tel:112";
  };

  // Detect the user's current location
  const updateLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage("Your browser does not support location access.");
      return;
    }

    setLocationLoading(true);
    setLocationMessage("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setLocationMessage("Your location detected successfully.");
        setLocationLoading(false);
      },
      (err) => {
        const messages = {
          1: "Location permission denied. Allow location access in your browser.",
          2: "Your location is currently unavailable.",
          3: "Location request timed out. Please try again.",
        };

        setLocationMessage(
          messages[err.code] || "Unable to get your location."
        );
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  // Open Google Maps with the required search
  const getMapsUrl = () => {
    const query = location
      ? `emergency hospitals near ${location.lat},${location.lng}`
      : "emergency hospitals near me";

    const params = new URLSearchParams({
      api: "1",
      query,
    });

    return `https://www.google.com/maps/search/?${params.toString()}`;
  };

  // Get directions to a selected hospital
  const openDirections = (hospital) => {
    const destination = [
      hospital.name,
      hospital.address,
      hospital.city,
    ]
      .filter(Boolean)
      .join(", ");

    if (!destination.trim()) {
      alert("Hospital location is not available.");
      return;
    }

    const params = new URLSearchParams({
      api: "1",
      destination,
      travelmode: "driving",
    });

    if (location) {
      params.set("origin", `${location.lat},${location.lng}`);
    }

    window.open(
      `https://www.google.com/maps/dir/?${params.toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="emergency-page">
      {/* HEADER */}
      <div className="emergency-header">
        <div>
          <span className="emergency-label">EMERGENCY SERVICES</span>
          <h1>Emergency Care</h1>
          <p>
            Find emergency-care facilities and essential emergency information.
          </p>
        </div>

        <div className="location-status">
          <span>●</span>{" "}
          {location ? "Location detected" : "Location not detected"}
        </div>
      </div>

      {/* EMERGENCY ALERT */}
      <div className="emergency-alert">
        <div className="alert-icon">🚨</div>

        <div className="alert-content">
          <strong>Medical Emergency?</strong>
          <p>
            For a life-threatening emergency in India, call 112.
          </p>
        </div>

        <button
          type="button"
          className="call-emergency"
          onClick={callEmergency}
        >
          📞 Call 112
        </button>
      </div>

      {/* SEARCH */}
      <div className="care-search-card">
        <div>
          <h3>Find Emergency Care</h3>
          <p>
            Search saved hospitals or find other hospitals on Google Maps.
          </p>
        </div>

        <div className="care-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Try KMCH Coimbatore or PSG Hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchOnGoogleMaps();
              }
            }}
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
            >
              Clear
            </button>
          )}

          <button
            type="button"
            className="map-button"
            onClick={searchOnGoogleMaps}
          >
            Search Maps ↗
          </button>
        </div>
      </div>

      {/* HOSPITAL LIST HEADER */}
      <div className="care-section-header">
        <div>
          <h2>Emergency Centers</h2>
          <p>Hospitals available in your backend records</p>
        </div>

        <button
          type="button"
          className="map-button"
          onClick={() =>
            window.open(
              getMapsUrl(),
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          🗺️ View Map
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="care-loading">
          ⏳ Loading emergency facilities...
        </div>
      )}

      {/* BACKEND ERROR */}
      {!loading && error && (
        <div className="care-loading">
          ⚠️ {error}
        </div>
      )}

      {/* HOSPITAL CARDS */}
      {!loading && !error && (
        <div className="hospital-grid">
          {filteredHospitals.map((hospital, index) => (
            <div
              className="hospital-card"
              key={hospital.id || hospital.name || index}
            >
              <div className="hospital-top">
                <div className="hospital-icon">🏥</div>
                <span className="open-status">
                  ● {hospital.status || "Status unverified"}
                </span>
              </div>

              <h3>{hospital.name || "Unnamed Facility"}</h3>

              <p className="hospital-type">
                {hospital.type || "Emergency care facility"}
              </p>

              {hospital.rating && (
                <div className="hospital-rating">
                  ⭐ {hospital.rating}
                </div>
              )}

              <div className="hospital-info">
                <div>
                  <span>📍</span>
                  <p>
                    <strong>
                      {hospital.distance || "Distance unavailable"}
                    </strong>
                    <small>Distance not independently verified</small>
                  </p>
                </div>

                {hospital.time && (
                  <div>
                    <span>🚗</span>
                    <p>
                      <strong>{hospital.time}</strong>
                      <small>Estimated travel time</small>
                    </p>
                  </div>
                )}
              </div>

              {hospital.phone && (
                <div className="hospital-phone">
                  📞 {hospital.phone}
                </div>
              )}

              <div className="hospital-actions">
                <button
                  type="button"
                  className="details-button"
                  onClick={() => setSelectedHospital(hospital)}
                >
                  View Details
                </button>

                <button
                  type="button"
                  className="direction-button"
                  onClick={() => openDirections(hospital)}
                >
                  Directions ↗
                </button>
              </div>
            </div>
          ))}

          {filteredHospitals.length === 0 && (
            <div className="care-loading">
              <h3>No matching saved hospitals found.</h3>
              <p>
                Search for "{search}" on Google Maps to find other hospitals.
              </p>

              <button
                type="button"
                className="map-button"
                onClick={searchOnGoogleMaps}
              >
                🔍 Find This Hospital on Google Maps
              </button>
            </div>
          )}
        </div>
      )}

      {/* LOCATION SECTION */}
      <div className="care-map-section">
        <div className="map-placeholder">
          <div className="map-overlay">
            <div className="your-location">
              <span>●</span>{" "}
              {location ? "Your location detected" : "Location not detected"}
            </div>
          </div>
        </div>

        <div className="map-info">
          <span className="emergency-label">LOCATION SERVICES</span>
          <h2>Find facilities near you</h2>

          <p>
            Allow location access to help find nearby facilities and
            get directions from your current location.
          </p>

          {location && (
            <p>
              Latitude: {location.lat.toFixed(5)}
              <br />
              Longitude: {location.lng.toFixed(5)}
            </p>
          )}

          <p role="status">{locationMessage}</p>

          <button
            type="button"
            className="location-button"
            onClick={updateLocation}
            disabled={locationLoading}
          >
            📍{" "}
            {locationLoading
              ? "Detecting Location..."
              : "Update My Location"}
          </button>
        </div>
      </div>

      {/* EMERGENCY CONTACT */}
      <div className="emergency-contacts">
        <div>
          <span className="contact-icon">🚑</span>
          <div>
            <strong>Emergency Services — 112</strong>
            <p>For immediate life-threatening emergencies in India</p>
          </div>
        </div>

        <button
          type="button"
          className="contact-button"
          onClick={callEmergency}
        >
          📞 Call 112
        </button>
      </div>

      {/* HOSPITAL DETAILS POPUP */}
      {selectedHospital && (
        <div
          className="patient-modal-overlay"
          onClick={() => setSelectedHospital(null)}
        >
          <div
            className="patient-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hospital-details-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="patient-modal-header">
              <div>
                <h3 id="hospital-details-title">Hospital Details</h3>
                <p>Facility information</p>
              </div>

              <button
                type="button"
                className="close-modal"
                onClick={() => setSelectedHospital(null)}
                aria-label="Close hospital details"
              >
                ✕
              </button>
            </div>

            <div className="details-section">
              <h4>🏥 Facility Information</h4>

              <div className="details-grid">
                <div>
                  <span>Name</span>
                  <strong>
                    {selectedHospital.name || "Not available"}
                  </strong>
                </div>

                <div>
                  <span>Facility Type</span>
                  <strong>
                    {selectedHospital.type || "Not available"}
                  </strong>
                </div>

                <div>
                  <span>Reported Status</span>
                  <strong>
                    {selectedHospital.status || "Unverified"}
                  </strong>
                </div>

                <div>
                  <span>Distance</span>
                  <strong>
                    {selectedHospital.distance || "Not available"}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedHospital.phone || "Not available"}
                  </strong>
                </div>

                <div>
                  <span>Address</span>
                  <strong>
                    {selectedHospital.address || "Not provided by backend"}
                  </strong>
                </div>
              </div>
            </div>

            <p className="care-disclaimer">
              Verify the address, phone number and emergency availability
              before travelling. Backend details may be sample data.
            </p>

            <div className="patient-modal-actions">
              {selectedHospital.phone && (
                <a
                  className="contact-button"
                  href={`tel:${String(selectedHospital.phone).replace(/[^\d+]/g, "")}`}
                >
                  📞 Call Facility
                </a>
              )}

              <button
                type="button"
                className="direction-button"
                onClick={() => openDirections(selectedHospital)}
              >
                📍 Get Directions
              </button>

              <button
                type="button"
                className="close-details-button"
                onClick={() => setSelectedHospital(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISCLAIMER */}
      <div className="care-disclaimer">
        ⚠️ <strong>Important:</strong> This application provides
        decision-support information only. It does not replace
        professional medical advice or emergency services.
      </div>
    </div>
  );
}

export default EmergencyCare;
