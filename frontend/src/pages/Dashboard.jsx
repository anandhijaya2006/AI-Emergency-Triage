import { useEffect, useState } from "react";

function Dashboard({ setActivePage }) {
  const [analytics, setAnalytics] = useState({
    total: 0,
    low: 0,
    moderate: 0,
    high: 0,
    emergency: 0,
    daily_activity: [],
  });

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activityRange, setActivityRange] = useState("7");

  // =========================
  // FETCH DASHBOARD DATA
  // =========================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // -------------------------
        // Analytics
        // -------------------------

        const analyticsResponse = await fetch(
  `http://127.0.0.1:5000/api/analytics?days=${activityRange}`
);
        if (!analyticsResponse.ok) {
          throw new Error("Analytics request failed");
        }

        const analyticsData = await analyticsResponse.json();

        setAnalytics({
          total: analyticsData.total || 0,
          low: analyticsData.low || 0,
          moderate: analyticsData.moderate || 0,
          high: analyticsData.high || 0,
          emergency: analyticsData.emergency || 0,
          daily_activity: analyticsData.daily_activity || [],
        });

        // -------------------------
        // Recent History
        // -------------------------

        const historyResponse = await fetch(
          "http://127.0.0.1:5000/api/history"
        );

        if (!historyResponse.ok) {
          throw new Error("History request failed");
        }

        const historyData = await historyResponse.json();

        setHistory(historyData.slice(0, 4));
      } catch (error) {
        console.error("Dashboard backend error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [activityRange]);

  // =========================
  // VALUES
  // =========================

  const total = analytics.total || 0;

  const lowPercentage =
    total > 0
      ? ((analytics.low / total) * 100).toFixed(1)
      : "0.0";

  const moderatePercentage =
    total > 0
      ? ((analytics.moderate / total) * 100).toFixed(1)
      : "0.0";

  const highPercentage =
    total > 0
      ? ((analytics.high / total) * 100).toFixed(1)
      : "0.0";

  const emergencyPercentage =
    total > 0
      ? ((analytics.emergency / total) * 100).toFixed(1)
      : "0.0";
      // =========================
// TRIAGE ACTIVITY DATA
// =========================

const activityData = analytics.daily_activity ||[];
const rangeDays = Number(activityRange);

const filteredActivity = activityData.slice(-rangeDays);

const chartValues = filteredActivity.map(
  (item) => item.count
);

const maxValue = Math.max(...chartValues, 1);

  // =========================
  // FORMAT TIME
  // =========================

  const formatTime = (createdAt) => {
    if (!createdAt) {
      return "Recently";
    }

    const date = new Date(createdAt.replace(" ", "T"));

    if (Number.isNaN(date.getTime())) {
      return createdAt;
    }

    return date.toLocaleString();
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div className="dashboard-page">

      {/* =========================
          WELCOME HEADER
      ========================= */}

      <div className="welcome-section">

        <div>
          <h2>
            Good morning, Anandhi 👋
          </h2>

          <p>
            Here's what's happening with your
            emergency triage system today.
          </p>
        </div>

        <button
          className="new-triage-btn"
          onClick={() => setActivePage("New Triage")}
        >
          + New Triage
        </button>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <div className="stats-grid">

        {/* TOTAL ASSESSMENTS */}

        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon blue">
              📋
            </div>

            <span className="trend">
              Live
            </span>

          </div>

          <p>
            Total Assessments
          </p>

          <h2>
            {loading ? "..." : total}
          </h2>

          <span className="stat-description">
            From database
          </span>

        </div>


        {/* LOW RISK */}

        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon green">
              ✓
            </div>

            <span className="trend">
              {lowPercentage}%
            </span>

          </div>

          <p>
            Low Risk
          </p>

          <h2>
            {loading ? "..." : analytics.low}
          </h2>

          <span className="stat-description">
            {lowPercentage}% of assessments
          </span>

        </div>


        {/* HIGH RISK */}

        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon orange">
              ⚠️
            </div>

            <span className="trend">
              {highPercentage}%
            </span>

          </div>

          <p>
            High Risk
          </p>

          <h2>
            {loading ? "..." : analytics.high}
          </h2>

          <span className="stat-description">
            Requires attention
          </span>

        </div>


        {/* EMERGENCY */}

        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon red">
              🚨
            </div>

            <span className="trend red-text">
              {emergencyPercentage}%
            </span>

          </div>

          <p>
            Emergency
          </p>

          <h2>
            {loading ? "..." : analytics.emergency}
          </h2>

          <span className="stat-description">
            Immediate attention
          </span>

        </div>

      </div>


      {/* =========================
          CHART + RISK BREAKDOWN
      ========================= */}

      <div className="dashboard-grid">


        {/* =========================
            TRIAGE ACTIVITY
        ========================= */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h3>
                Triage Activity
              </h3>

              <p>
                Emergency assessments over time
              </p>
            </div>

            <select
  value={activityRange}
  onChange={(e) => setActivityRange(e.target.value)}
>
  <option value="7">Last 7 days</option>
  <option value="30">Last 30 days</option>
  <option value="90">Last 3 months</option>
</select>

          </div>


          <div className="chart">

            <div className="y-axis">

              <span>40</span>
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>0</span>

            </div>


            <div className="chart-area">

              <div className="grid-line line1"></div>
              <div className="grid-line line2"></div>
              <div className="grid-line line3"></div>
              <div className="grid-line line4"></div>


              <svg
  className="chart-svg"
  viewBox="0 0 600 200"
  preserveAspectRatio="none"
>
  {chartValues.length > 1 && (
    <polyline
      points={chartValues
        .map((value, index) => {
          const x =
            (index / (chartValues.length - 1)) * 600;

          const y =
            180 - (value / maxValue) * 150;

          return `${x},${y}`;
        })
        .join(" ")}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
  )}
</svg>


    <div className="x-axis">

  {filteredActivity.length > 0 ? (
    filteredActivity
      .filter((_, index) => {
        if (rangeDays === 7) return true;
        if (rangeDays === 30) return index % 5 === 0;
        return index % 15 === 0;
      })
      .map((item) => (
        <span key={item.date}>
          {new Date(item.date).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
            }
          )}
        </span>
      ))
  ) : (
    <span>No data</span>
  )}

</div>

<div className="x-axis">

  {filteredActivity.length > 0 ? (
    filteredActivity
      .filter((_, index) => {
        if (rangeDays === 7) return true;
        if (rangeDays === 30) return index % 5 === 0;
        return index % 15 === 0;
      })
      .map((item) => (
        <span key={item.date}>
          {new Date(item.date).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
            }
          )}
        </span>
      ))
  ) : (
    <span>No data</span>
  )}

</div>

            </div>

          </div>

        </div>


        {/* =========================
            RISK BREAKDOWN
        ========================= */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h3>
                Risk Breakdown
              </h3>

              <p>
                Assessment distribution
              </p>
            </div>

          </div>


          <div className="risk-circle">

            <div>

              <strong>
                {loading ? "..." : total}
              </strong>

              <span>
                Total
              </span>

            </div>

          </div>


          <div className="risk-list">


            {/* LOW */}

            <div>

              <span>

                <span className="dot low-dot"></span>

                Low Risk

              </span>

              <strong>
                {analytics.low}
              </strong>

            </div>


            {/* MODERATE */}

            <div>

              <span>

                <span className="dot moderate-dot"></span>

                Moderate

              </span>

              <strong>
                {analytics.moderate}
              </strong>

            </div>


            {/* HIGH */}

            <div>

              <span>

                <span className="dot high-dot"></span>

                High Risk

              </span>

              <strong>
                {analytics.high}
              </strong>

            </div>


            {/* EMERGENCY */}

            <div>

              <span>

                <span className="dot emergency-dot"></span>

                Emergency

              </span>

              <strong>
                {analytics.emergency}
              </strong>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          RECENT TRIAGE ALERTS
      ========================= */}

      <div className="dashboard-card alerts-card">

        <div className="card-header">

          <div>

            <h3>
              Recent Triage Alerts
            </h3>

            <p>
              Latest emergency assessments
            </p>

          </div>


          <button
            className="view-all"
            onClick={() => setActivePage("History")}
          >
            View all →
          </button>

        </div>


        <div className="alert-table">


          {/* TABLE HEADER */}

          <div className="table-header">

            <span>
              Assessment
            </span>

            <span>
              Symptoms
            </span>

            <span>
              Risk Level
            </span>

            <span>
              Time
            </span>

          </div>


          {/* BACKEND DATA */}

          {history.length > 0 ? (

            history.map((record) => (

              <div
                className="table-row"
                key={record.id}
              >

                {/* ASSESSMENT ID */}

                <span className="assessment-id">

                  #TRI-
                  {String(record.id).padStart(4, "0")}

                </span>


                {/* SYMPTOMS */}

                <span>
                  {record.symptoms || "No symptoms"}
                </span>


                {/* RISK LEVEL */}

                <span
                  className={`badge ${
                    record.risk_level
                      ? record.risk_level.toLowerCase()
                      : ""
                  }`}
                >

                  {record.risk_level || "Unknown"}

                </span>


                {/* TIME */}

                <span>
                  {formatTime(record.created_at)}
                </span>

              </div>

            ))

          ) : (

            <div className="table-row">

              <span>
                No assessments
              </span>

              <span>
                No records available
              </span>

              <span>
                -
              </span>

              <span>
                -
              </span>

            </div>

          )}

        </div>

      </div>


      {/* =========================
          DISCLAIMER
      ========================= */}

      <div className="history-disclaimer">

        ⚠️ Assessment information is intended for
        decision-support purposes only. Always verify
        critical information with a qualified healthcare
        professional.

      </div>

    </div>
  );
}

export default Dashboard;