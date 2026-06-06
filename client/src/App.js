import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import './App.css';

export default function App() {
  const [tab, setTab] = useState('leads');

  return (
    <div className="app">
      <Toaster position="top-right" />

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-logo">⚡</span>
          <span className="nav-title">LeadCRM</span>
          <span className="nav-sub">InstaWeb Labs</span>
        </div>
        <div className="nav-tabs">
          <button className={`nav-tab ${tab === 'leads' ? 'active' : ''}`} onClick={() => setTab('leads')}>
            👥 Leads
          </button>
          <button className={`nav-tab ${tab === 'dashboard' ? 'active' : ''}`} onClick={() => setTab('dashboard')}>
            📊 Dashboard
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="main-content">
        {tab === 'leads' ? <Leads /> : <Dashboard />}
      </main>
    </div>
  );
}
