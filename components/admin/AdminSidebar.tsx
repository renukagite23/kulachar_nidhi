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
  ChevronDown,
  ShieldCheck,
  Bell,
  User,
  FileText,
  Calendar,
  GalleryHorizontal,
  Video as VideoIcon
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '@/redux/slices/adminAuthSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { admin } = useSelector((state: RootState) => state.adminAuth);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
    },
    {
      title: 'About',
      icon: User,
      isExpandable: true,
      subItems: [
        { title: 'About Temple', href: '/admin/about/temple' },
        { title: 'About Trust', href: '/admin/about/trust' },
      ],
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
      title: 'Collectors',
      icon: Users,
      href: '/admin/collectors',
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
      title: 'Videos',
      icon: VideoIcon,
      href: '/admin/videos'
    },

    {
      title: 'Settings',
      icon: Settings,
      href: '/admin/settings',
    },
  ];

  const handleLogout = () => {
    dispatch(adminLogout());
    router.push('/admin');
  };

  const [expandedMenus, setExpandedMenus] = React.useState<string[]>(['About']);

  const toggleMenu = (title: string) => {
    setExpandedMenus(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
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

      {/* Profile Section Removed as requested */}

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto overflow-x-hidden p-4 mt-4 space-y-1 scrollbar-thin">
        {menuItems.map((item) => {
          if (item.isExpandable) {
            const isExpanded = expandedMenus.includes(item.title);
            const isAnySubActive = item.subItems?.some(sub => pathname === sub.href);

            return (
              <div key={item.title} className="space-y-1">
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl transition-all group ${isAnySubActive && !isExpanded
                    ? 'bg-primary/20 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isAnySubActive ? 'text-white' : 'text-primary'}`} />
                  {!isCollapsed && (
                    <>
                      <span className="font-bold text-sm tracking-wide">{item.title}</span>
                      <div className="ml-auto">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </>
                  )}
                </button>

                {!isCollapsed && isExpanded && (
                  <div className="ml-9 space-y-1 mt-1">
                    {item.subItems?.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all ${isSubActive
                            ? 'bg-primary text-white shadow-lg shadow-primary/10'
                            : 'text-white/40 hover:text-white hover:bg-white/5'
                            }`}
                        >
                          <span className="font-bold text-xs">{sub.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href || item.title}
              href={item.href || '#'}
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
