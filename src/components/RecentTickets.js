import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const RecentTickets = () => {
  const recentTickets = [
    { id: 1, title: 'Server Error', status: 'open', date: '2024-03-05' },
    { id: 2, title: 'Login Issue', status: 'resolved', date: '2024-03-04' },
    { id: 3, title: 'Data Sync', status: 'open', date: '2024-03-03' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Recent Tickets</h2>
      <div className="space-y-4">
        {recentTickets.map(ticket => (
          <div key={ticket.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{ticket.title}</p>
              <p className="text-sm text-gray-500">{ticket.date}</p>
            </div>
            <div className="flex items-center">
              {ticket.status === 'resolved' ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <AlertCircle className="text-yellow-500" size={20} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTickets;