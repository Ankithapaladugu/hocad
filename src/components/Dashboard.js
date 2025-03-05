import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import TicketContent from './TicketContent';                                                                            
import ClientContent from './ClientContent';
import { Users, Ticket, CheckCircle, AlertCircle ,Settings, LogOut, LayoutDashboard} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const SHEET_ID = "1L3yD7ERwDcn6fTg3GXGKNVvi4VW-vBZye0t7xEGCOBI";
const API_KEY = "AIzaSyBOihTTRnYWegWEPPOX-12kL71sic8tcco";
const SHEET_NAME = "Sheet1";
const TICKET_SHEET_NAME1 = "sheet 5";

const TICKET_SHEET_ID = "19Udik1gaj1GTbSsU74lPq5UVjP0jME7vyGDozTrehuQ";
const TICKET_SHEET_NAME = "sheet 4";
function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [clientCount, setClientCount] = useState(0);
  const [ticketStats, setTicketStats] = useState({
    raised: 0,
    resolved: 0,
    open: 0
  });
  const navigate = useNavigate();
  useEffect(() => {
    fetchClientCount();
    fetchTicketStats();
  }, []);
  const handleLogout = () => {
    // Add any logout logic here (clearing tokens, etc)
    navigate('/');
  };
  const fetchTicketStats = async () => {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${TICKET_SHEET_ID}/values/${TICKET_SHEET_NAME}?key=${API_KEY}`
      );
      const data = await response.json();
    
    if (data.values && data.values.length > 1) {
      const tickets = data.values.slice(1); // Remove header row
      
      // Sum up ticket count column (column 1)
      const raised = tickets.reduce((total, row) => {
        const count = parseInt(row[3]) || 0; // Using index 0 for ticket count
        return total + count;
      }, 0);

      // Sum up solved tickets column (column 2)
      const resolved = tickets.reduce((total, row) => {
        const solved = parseInt(row[4]) || 0; // Using index 1 for solved tickets
        return total + solved;
      }, 0);
      const open = raised - resolved;

      setTicketStats({
        raised,
        resolved,
        open
      });
    }
      
    } catch (error) {
      console.error('Error fetching ticket stats:', error);
    }
  };
  const fetchClientCount = async () => {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
      );
      const data = await response.json();
      // Subtract 1 to exclude header row
      const count = data.values ? data.values.length - 1 : 0;
      setClientCount(count);
    } catch (error) {
      console.error('Error fetching client count:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="content">
            <h1 className="dashboard-title">Dashboard Overview</h1>
            <div className="dashboard-stats-container">
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Total Clients</h3>
                    <Users size={24} className="stat-icon primary" />
                  </div>
                  <p className="stat-value">{clientCount}</p>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Open Tickets</h3>
                    <AlertCircle size={24} className="stat-icon warning" />
                  </div>
                  <p className="stat-value">{ticketStats.open}</p>
                </div>
              </div>
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Resolved Tickets</h3>
                    <CheckCircle size={24} className="stat-icon success" />
                  </div>
                  <p className="stat-value">{ticketStats.resolved}</p>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Total Tickets</h3>
                    <Ticket size={24} className="stat-icon primary" />
                  </div>
                  <p className="stat-value">{ticketStats.raised}</p>
                </div>
              </div>
            </div>
          </div>
        );
      // ...rest of the cases
      case 'clients':
        return <ClientContent 
        SHEET_ID={SHEET_ID} 
        SHEET_NAME={SHEET_NAME} 
        API_KEY={API_KEY} 
      />;
      case 'tickets':
        return <TicketContent 
        TICKET_SHEET_ID={TICKET_SHEET_ID} 
        TICKET_SHEET_NAME={TICKET_SHEET_NAME} 
        API_KEY={API_KEY} 
      />;
      case 'settings':
        return <div className="content">Settings Content</div>;
      default:
        return <div className="content">Dashboard Content</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
             <LayoutDashboard size={20} className="nav-icon" />
            Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            <Users size={20} className="nav-icon" />
            <span>Clients</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'tickets' ? 'active' : ''}`}
            onClick={() => setActiveTab('tickets')}
          >
            <Ticket size={20} className="nav-icon" />
            <span>Tickets</span>
          </button>
          <button
           
          >
            <Settings size={20} className="nav-icon" />
            <span>Settings</span>
          </button>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;