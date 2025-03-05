import React from 'react';

const TicketManagement = () => {
  const tickets = [
    { 
      id: 1, 
      title: 'Server Issue', 
      client: 'John Doe',
      status: 'Open',
      priority: 'High',
      created: '2024-03-05'
    },
    // Add more tickets as needed
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ticket Management</h1>
      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td className="px-6 py-4">{ticket.title}</td>
                <td className="px-6 py-4">{ticket.client}</td>
                <td className="px-6 py-4">{ticket.status}</td>
                <td className="px-6 py-4">{ticket.priority}</td>
                <td className="px-6 py-4">{ticket.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketManagement;