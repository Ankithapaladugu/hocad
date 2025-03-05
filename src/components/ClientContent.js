import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './ClientContent.css';
const SHEET_ID = "1L3yD7ERwDcn6fTg3GXGKNVvi4VW-vBZye0t7xEGCOBI";
const API_KEY = "AIzaSyBOihTTRnYWegWEPPOX-12kL71sic8tcco";
const SHEET_NAME = "Sheet1";


const ClientContent = ({ SHEET_ID, SHEET_NAME, API_KEY }) => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
      );
      const data = await response.json();

      if (data.values && data.values.length > 1) {
        // Remove header row and map the data
        const clientData = data.values.slice(1).map(row => ({
          name: row[2] || '',
          email: row[0] || '',
          password: row[1] || '',
          company: row[18] || '',
          service: row[17] || ''
        }));
        setClients(clientData);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="client-content">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Client Management</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search clients..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="search-icon" size={24} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientContent;