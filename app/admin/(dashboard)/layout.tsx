'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, isAdminAuthenticated } = useSelector((state: RootState) => state.adminAuth);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!isAdminAuthenticated || admin?.role !== 'admin')) {
      router.push('/admin');
    }
  }, [isAdminAuthenticated, admin, router, mounted]);

  // Return a generic loading state that matches the server render until mounted
  if (!mounted || !isAdminAuthenticated || admin?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white relative w-full">
      <AdminSidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />
      <div className="flex-grow flex flex-col overflow-hidden bg-[#FFFDF9] w-full min-w-0">
        <AdminNavbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        <div className="flex-grow overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
