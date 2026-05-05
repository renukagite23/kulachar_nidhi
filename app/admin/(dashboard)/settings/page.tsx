'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-secondary mb-6">System Settings</h1>

      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">

        {/* Theme */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-secondary">Dark Mode</p>
            <p className="text-sm text-muted-foreground">Enable dark theme</p>
          </div>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-secondary">Notifications</p>
            <p className="text-sm text-muted-foreground">Receive system alerts</p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        {/* Language */}
        <div>
          <p className="font-medium text-secondary mb-1">Language</p>
          <select className="w-full h-10 px-3 rounded-xl border border-border">
            <option>English</option>
            <option>Marathi</option>
          </select>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button className="px-5 py-2 rounded-xl bg-primary text-white text-sm hover:opacity-90">
            Save Settings
          </button>
        </div>

      </div>
    </div>
  );
}