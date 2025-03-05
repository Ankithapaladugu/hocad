import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './TicketContent.css';

const TicketContent = ({ TICKET_SHEET_ID, TICKET_SHEET_NAME1, API_KEY }) => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${TICKET_SHEET_ID}/values/sheet 5?key=${API_KEY}`
      );
      const data = await response.json();

      if (data.values && data.values.length > 1) {
        const ticketData = data.values.slice(1).map(row => ({
          timestamp: row[0] || '',
          name: row[1] || '',
          email: row[2] || '',
          complaint: row[3] || '',
          status: row[4]==='1' ? 'Closed' : 'Open'  // Default status for new tickets
        }));
        setTickets(ticketData);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.complaint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ticket-content">
      <div className="content-header">
        <h2 className="section-title">Support Tickets</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, email or complaint..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="search-icon" size={20} />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Complaint</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket, index) => (
              <tr key={index}>
                <td>{new Date(ticket.timestamp).toLocaleDateString()}</td>
                <td>{ticket.name}</td>
                <td>{ticket.email}</td>
                <td className="complaint-cell">{ticket.complaint}</td>
                <td>
                  <span className={`status-badge ${ticket.status.toLowerCase()}`}>
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketContent;