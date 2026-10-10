
function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "New Triage", icon: "🚑" },
    { name: "Patients", icon: "👥" },
    { name: "Analytics", icon: "📊" },
    { name: "Emergency Care", icon: "📍" },
    { name: "Voice Assistant", icon: "🎙️" },
    { name: "First-Aid Guidance", icon: "🩹" },
    { name: "History", icon: "📜" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🚑</div>

        <div>
          <h2>TriageAI</h2>
          <span>Emergency Assistant</span>
        </div>
      </div>

      <div className="sidebar-menu">
        <p className="menu-title">MAIN MENU</p>

        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`sidebar-item ${
              activePage === item.name ? "active" : ""
            }`}
            onClick={() => setActivePage(item.name)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="help-box">
          <span>❓</span>
          <div>
            <strong>Need Help?</strong>
            <small>Emergency support information</small>
          </div>
        </div>

        <div className="account-box">
          <div className="account-avatar">A</div>
          <div>
            <strong>Anandhi A</strong>
            <small>Student Account</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
