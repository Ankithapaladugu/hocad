import React from 'react';

const SettingsPanel = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
                <input type="checkbox" className="mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dark Mode
                </label>
                <input type="checkbox" className="mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;