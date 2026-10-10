
import { useCallback, useEffect, useState } from "react";

function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch latest analytics from Flask
  const fetchAnalytics = useCallback(async (showLoader = false) => {
    if (showLoader) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    setError("");

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/analytics?days=7`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result = await response.json();

      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Analytics error:", err);
      setError(
        "Unable to refresh analytics. Please check whether the Flask backend is running."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial fetch and automatic refresh every 15 seconds
  useEffect(() => {
    fetchAnalytics(true);

    const intervalId = setInterval(() => {
      fetchAnalytics(false);
    }, 15000);

    return () => clearInterval(intervalId);
  }, [fetchAnalytics]);

  if (loading && !data) {
    return (
      <div className="analytics-page">
        <h1>Analytics</h1>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  if (!data && error) {
    return (
      <div className="analytics-page">
        <h1>Analytics</h1>
        <p role="alert">{error}</p>

        <button
          type="button"
          className="map-button"
          onClick={() => fetchAnalytics(true)}
        >
          Retry
        </button>
      </div>
    );
  }

  const total = Number(data?.total) || 0;
  const low = Number(data?.low) || 0;
  const moderate = Number(data?.moderate) || 0;
  const high = Number(data?.high) || 0;
  const emergency = Number(data?.emergency) || 0;

  const getPercentage = (value) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const riskItems = [
    {
      label: "Low Risk",
      icon: "🟢",
      value: low,
      className: "low-progress",
    },
    {
      label: "Moderate Risk",
      icon: "🟡",
      value: moderate,
      className: "moderate-progress",
    },
    {
      label: "High Risk",
      icon: "🟠",
      value: high,
      className: "high-progress",
    },
    {
      label: "Emergency",
      icon: "🔴",
      value: emergency,
      className: "emergency-progress",
    },
  ];

  return (
    <div className="analytics-page">
      {/* HEADER */}
      <div className="analytics-header">
        <div>
          <span className="analytics-label">SYSTEM INSIGHTS</span>
          <h1>Analytics</h1>
          <p>
            Monitor emergency triage performance and risk distribution.
          </p>
        </div>

        <div className="analytics-live-controls">
          <span className="analytics-date">
            <span className="live-dot">●</span> Live Data
          </span>

          <button
            type="button"
            className="map-button"
            onClick={() => fetchAnalytics(false)}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>
      </div>

      {/* STATUS */}
      <div className="analytics-sync-status" role="status">
        {refreshing
          ? "Updating analytics..."
          : lastUpdated
            ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
            : "Waiting for analytics data"}
      </div>

      {error && (
        <div className="analytics-error" role="alert">
          ⚠️ {error}
          <button
            type="button"
            onClick={() => fetchAnalytics(false)}
          >
            Try again
          </button>
        </div>
      )}

      {/* OVERVIEW */}
      <div className="analytics-overview">
        <div className="analytics-main-card">
          <div className="analytics-icon blue">📋</div>
          <div>
            <span>Total Assessments</span>
            <strong>{total}</strong>
            <small>Patient assessments recorded</small>
          </div>
        </div>

        <div className="analytics-main-card">
          <div className="analytics-icon green">✓</div>
          <div>
            <span>Low Risk</span>
            <strong>{low}</strong>
            <small>{getPercentage(low)}% of assessments</small>
          </div>
        </div>

        <div className="analytics-main-card">
          <div className="analytics-icon orange">⚠️</div>
          <div>
            <span>Moderate Risk</span>
            <strong>{moderate}</strong>
            <small>{getPercentage(moderate)}% of assessments</small>
          </div>
        </div>

        <div className="analytics-main-card">
          <div className="analytics-icon red">🚨</div>
          <div>
            <span>Emergency</span>
            <strong>{emergency}</strong>
            <small>{getPercentage(emergency)}% of assessments</small>
          </div>
        </div>
      </div>

      {/* MAIN ANALYTICS */}
      <div className="analytics-grid">
        {/* RISK DISTRIBUTION */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h2>Risk Distribution</h2>
              <p>Breakdown of patient assessment severity</p>
            </div>
          </div>

          <div className="risk-bars">
            {riskItems.map((item) => (
              <div className="risk-item" key={item.label}>
                <div className="risk-title">
                  <span>
                    {item.icon} {item.label}
                  </span>
                  <strong>{item.value}</strong>
                </div>

                <div className="progress-bg">
                  <div
                    className={`progress ${item.className}`}
                    style={{
                      width: `${getPercentage(item.value)}%`,
                    }}
                  />
                </div>

                <small>{getPercentage(item.value)}%</small>
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h2>Assessment Summary</h2>
              <p>Current system performance</p>
            </div>
          </div>

          <div className="summary-content">
            <div className="summary-row">
              <div>
                <span>All Assessments</span>
                <strong>{total}</strong>
              </div>
              <span className="summary-badge">Total</span>
            </div>

            <div className="summary-row">
              <div>
                <span>Low Risk Patients</span>
                <strong>{low}</strong>
              </div>
              <span className="summary-badge green-badge">Low Risk</span>
            </div>

            <div className="summary-row">
              <div>
                <span>Patients Requiring Attention</span>
                <strong>{moderate + high}</strong>
              </div>
              <span className="summary-badge orange-badge">Attention</span>
            </div>

            <div className="summary-row">
              <div>
                <span>Emergency Cases</span>
                <strong>{emergency}</strong>
              </div>
              <span className="summary-badge red-badge">Urgent</span>
            </div>
          </div>
        </div>
      </div>

      {/* INSIGHT */}
      <div className="analytics-insight">
        <div className="insight-icon">💡</div>
        <div>
          <h3>System Insight</h3>
          <p>
            The system has recorded <strong>{total}</strong> assessments.
            {" "} <strong>{getPercentage(low)}%</strong> are classified as
            low risk, and <strong>{emergency}</strong> are classified as
            emergency cases. These categories are system-generated
            classifications, not a medical diagnosis.
          </p>
        </div>
      </div>

      <p className="analytics-footnote">
        Data refreshes automatically every 15 seconds. Analytics covers
        the latest 7-day period returned by the backend.
      </p>
    </div>
  );
}

export default Analytics;
