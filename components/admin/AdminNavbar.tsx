'use client';

import React from 'react';
import { Search, Bell, Settings, SearchIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { usePathname } from 'next/navigation';

export default function AdminNavbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();

  // Simple breadcrumb logic based on pathname
  const pathSegments = pathname.split('/').filter(p => p && p !== 'admin');
  const currentPage = pathSegments.length > 0
    ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1)
    : 'Dashboard';

  return (
    <div className="h-20 px-8 flex items-center justify-between bg-white border-b border-border sticky top-0 z-40">
      {/* Left: Breadcrumbs / Title */}
      <div className="flex items-center gap-2 text-sm font-bold">
        <span className="text-muted-foreground">Admin</span>
        <span className="text-border">/</span>
        <span className="text-secondary">{currentPage}</span>
      </div>

      {/* Center: Global Search (Optional) */}
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

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Actions */}
        <div className="flex items-center gap-2 border-r border-border pr-4">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-secondary transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse border-2 border-white"></span>
          </button>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-secondary transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-secondary leading-tight">{user?.name || 'Administrator'}</p>
            <p className="text-[10px] font-black text-primary uppercase tracking-widest">{user?.role || 'Admin'}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black shadow-inner group-hover:bg-primary group-hover:text-white transition-colors">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
        </div>
      </div>
    </div>
  );
}
