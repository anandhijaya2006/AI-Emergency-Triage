
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import NewTriage from "./pages/NewTriage";
import Patients from "./pages/Patients";
import Analytics from "./pages/Analytics";
import EmergencyCare from "./pages/EmergencyCare";
import History from "./pages/History";
import Settings from "./pages/Settings";
import VoiceAssistant from "./pages/VoiceAssistant";
import FirstAid from "./pages/FirstAid";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard setActivePage={setActivePage} />;

      case "New Triage":
        return <NewTriage />;

      case "Patients":
        return <Patients />;

      case "Analytics":
        return <Analytics />;

      case "Emergency Care":
        return <EmergencyCare />;

      case "History":
        return <History />;

      case "Settings":
        return <Settings />;

      case "Voice Assistant":
        return <VoiceAssistant />;

      case "First-Aid Guidance":
        return <FirstAid />;

      default:
        return (
          <div className="placeholder-page">
            <h2>{activePage}</h2>
            <p>This page will be developed next.</p>
          </div>
        );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-area">
        <Navbar activePage={activePage} />

        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
