import React from 'react';
import { LayoutDashboard, Users, Ticket, Settings, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-gray-800 text-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Admin Portal</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg 
              ${activeSection === id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;