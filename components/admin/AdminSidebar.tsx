'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  IndianRupee,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Bell,
  User,
  FileText,
  Calendar,
  GalleryHorizontal
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { title } from 'process';

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
    },
    {
      title: 'Registered Users',
      icon: Users,
      href: '/admin/users',
    },
    {
      title: 'Donations',
      icon: IndianRupee,
      href: '/admin/donations',
    },
    {
      title: 'Donors',
      icon: User,
      href: '/admin/donors',
    },
    {
      title: 'Collection Agents',
      icon: User,
      href: '/admin/collection-agents',
    },
    {
      title: 'Access Control',
      icon: ShieldCheck,
      href: '/admin/access-control',
    },
    {
      title: 'Notifications',
      icon: Bell,
      href: '/admin/notifications',
    },
    {
      title: 'Reports',
      icon: FileText,
      href: '/admin/reports',
    },
    {
      title: 'Events',
      icon: Calendar,
      href: '/admin/events',
    },
    {
      title: 'Gallery',
      icon: GalleryHorizontal,
      href: '/admin/gallery'
    },

    {
      title: 'Settings',
      icon: Settings,
      href: '/admin/settings',
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.push('/admin');
  };

  return (
    <div
      className={`h-screen flex flex-col bg-secondary text-white transition-all duration-300 relative border-r border-white/5 ${isCollapsed ? 'w-20' : 'w-72'
        }`}
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
          <img src="/devi.png" alt="Logo" className="w-6 h-6 object-contain brightness-0 invert" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="font-black text-lg tracking-tight uppercase">Trust Admin</h1>
            <p className="text-[10px] text-accent font-black uppercase tracking-widest">Portal Terminal</p>
          </div>
        )}
      </div>

      {/* Profile Section */}
      {!isCollapsed && (
        <div className="p-6 bg-white/5 mx-4 mt-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shadow-inner">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{user?.name || 'Administrator'}</p>
              <div className="flex items-center gap-1 text-[9px] text-green-500 font-bold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                System Online
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-grow p-4 mt-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${isActive
                ? 'bg-primary text-white shadow-xl shadow-primary/20'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-primary'}`} />
              {!isCollapsed && (
                <span className="font-bold text-sm tracking-wide">{item.title}</span>
              )}
              {isActive && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="font-bold text-sm">Logout Terminal</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-secondary shadow-lg hover:scale-110 transition-transform z-50 text-white"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </div>
  );
}
