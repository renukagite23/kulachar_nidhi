'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState } from 'react';

export default function ProfilePage() {
  const { admin } = useSelector((state: RootState) => state.adminAuth);

  const [name, setName] = useState(admin?.name || '');
  const [email, setEmail] = useState(admin?.email || '');

  const handleSave = () => {
    // later connect API
    alert('Profile updated (UI only)');
  };

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-secondary mb-6">Profile Settings</h1>

      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">
        
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
            {name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div>
            <p className="font-semibold text-secondary">{name}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 h-10 px-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 h-10 px-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-primary text-white text-sm hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}