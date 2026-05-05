'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  SearchIcon,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import NotificationBell from '../NotificationBell';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminNavbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Breadcrumb
  const pathSegments = pathname.split('/').filter(p => p && p !== 'admin');
  const currentPage =
    pathSegments.length > 0
      ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() +
        pathSegments[pathSegments.length - 1].slice(1)
      : 'Dashboard';

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout
  const confirmLogout = () => {
    localStorage.removeItem('token');

    // Optional: clear redux state
    dispatch({ type: 'auth/logout' });

    router.push('/login');
  };

  return (
    <>
      <div className="h-20 px-8 flex items-center justify-between bg-white border-b border-border sticky top-0 z-40">
        
        {/* Left */}
        <div className="flex items-center gap-2 text-sm font-bold">
          <span className="text-muted-foreground">Admin</span>
          <span className="text-border">/</span>
          <span className="text-secondary">{currentPage}</span>
        </div>

        {/* Center */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search across admin panel..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-muted/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          
          {/* Actions */}
          <div className="flex items-center gap-2 border-r border-border pr-4">
            <NotificationBell />
            {/* <button className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-secondary transition-colors">
              <Settings className="w-5 h-5" />
            </button> */}
          </div>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-secondary leading-tight">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                  {user?.role || 'Admin'}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black shadow-inner group-hover:bg-primary group-hover:text-white transition-colors">
                {user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-52 bg-white border border-border rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95">
                
                {/* Profile */}
                <button
                  onClick={() => router.push('/admin/profile')}
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-muted transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>

                {/* Settings */}
                <button
                  onClick={() => router.push('/admin/settings')}
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-muted transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>

                <div className="border-t border-border my-1" />

                {/* Logout */}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔴 Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in-95">
            
            <h2 className="text-lg font-bold text-secondary mb-2">
              Confirm Logout
            </h2>

            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}