import React from 'react';

const RecentClients = () => {
  const recentClients = [
    { id: 1, name: 'John Doe', company: 'Tech Corp', joinDate: '2024-03-01' },
    { id: 2, name: 'Jane Smith', company: 'Design Co', joinDate: '2024-02-28' },
    { id: 3, name: 'Mike Johnson', company: 'Dev Inc', joinDate: '2024-02-27' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Recent Clients</h2>
      <div className="space-y-4">
        {recentClients.map(client => (
          <div key={client.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{client.name}</p>
              <p className="text-sm text-gray-500">{client.company}</p>
            </div>
            <span className="text-sm text-gray-500">{client.joinDate}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentClients;