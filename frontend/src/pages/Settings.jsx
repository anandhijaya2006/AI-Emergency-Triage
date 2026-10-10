function Settings() {
  return (
    <div className="settings-page">

      {/* HEADER */}
      <div className="settings-header">
        <div>
          <span className="settings-label">SYSTEM SETTINGS</span>
          <h1>Settings</h1>
          <p>
            Manage your profile, application preferences and system settings.
          </p>
        </div>
      </div>


      {/* PROFILE */}
      <div className="settings-card">

        <div className="settings-card-header">
          <div>
            <h3>Profile Information</h3>
            <p>Manage your account information.</p>
          </div>

          <button className="settings-edit">
            Edit Profile
          </button>
        </div>


        <div className="profile-section">

          <div className="profile-avatar">
            A
          </div>

          <div className="profile-details">
            <h3>Administrator</h3>
            <p>Emergency Triage System</p>
          </div>

        </div>


        <div className="settings-form">

          <div className="setting-field">
            <label>Full Name</label>
            <input
              type="text"
              value="Administrator"
              readOnly
            />
          </div>

          <div className="setting-field">
            <label>Email Address</label>
            <input
              type="email"
              value="admin@triagecare.com"
              readOnly
            />
          </div>

          <div className="setting-field">
            <label>Role</label>
            <input
              type="text"
              value="System Administrator"
              readOnly
            />
          </div>

          <div className="setting-field">
            <label>Organization</label>
            <input
              type="text"
              value="TriageCare"
              readOnly
            />
          </div>

        </div>

      </div>


      {/* APPLICATION SETTINGS */}
      <div className="settings-card">

        <div className="settings-card-header">
          <div>
            <h3>Application Preferences</h3>
            <p>Customize how the application behaves.</p>
          </div>
        </div>


        <div className="setting-option">

          <div>
            <strong>Emergency Alerts</strong>
            <p>Show immediate alerts for emergency-level assessments.</p>
          </div>

          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span></span>
          </label>

        </div>


        <div className="setting-option">

          <div>
            <strong>Location Services</strong>
            <p>
              Allow the application to find nearby emergency-care facilities.
            </p>
          </div>

          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span></span>
          </label>

        </div>


        <div className="setting-option">

          <div>
            <strong>Assessment Notifications</strong>
            <p>Receive notifications when a triage assessment is completed.</p>
          </div>

          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span></span>
          </label>

        </div>


        <div className="setting-option">

          <div>
            <strong>AI Decision Support</strong>
            <p>
              Enable AI-assisted risk classification during triage.
            </p>
          </div>

          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span></span>
          </label>

        </div>

      </div>


      {/* SYSTEM */}
      <div className="settings-card">

        <div className="settings-card-header">
          <div>
            <h3>System Information</h3>
            <p>Application and AI system status.</p>
          </div>
        </div>


        <div className="system-info-grid">

          <div>
            <span>Application Version</span>
            <strong>1.0.0</strong>
          </div>

          <div>
            <span>AI Engine</span>
            <strong>Online</strong>
          </div>

          <div>
            <span>Backend Status</span>
            <strong className="online">Connected</strong>
          </div>

          <div>
            <span>Last System Check</span>
            <strong>Just now</strong>
          </div>

        </div>

      </div>


      {/* SAVE */}
      <div className="settings-actions">
        <button className="cancel-settings">
          Cancel
        </button>

        <button className="save-settings">
          Save Changes
        </button>
      </div>


      {/* DISCLAIMER */}
      <div className="settings-disclaimer">
        ⚠️ AI-generated information is intended for decision support only
        and should not replace professional medical judgment.
      </div>

    </div>
  );
}

export default Settings;