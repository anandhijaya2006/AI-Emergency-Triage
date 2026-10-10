function Navbar({ activePage }) {
  return (
    <header className="navbar">

      <div>
        <h1>{activePage}</h1>
        <p>AI Emergency Triage Assistant</p>
      </div>

      <div className="navbar-right">

        <button className="icon-button">
          🔔
        </button>

        <div className="user-info">

          <div className="avatar">
            A
          </div>

          <div>
            <strong>Anandhi A</strong>
            <span>Student Account</span>
          </div>

        </div>

        <span className="arrow">⌄</span>

      </div>

    </header>
  );
}

export default Navbar;