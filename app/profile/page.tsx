'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Mail, Phone, Shield, IndianRupee, Heart, MapPin, Calendar, Edit3 } from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center p-0.5 shadow-2xl">
            <div className="w-full h-full rounded-[20px] bg-white flex items-center justify-center relative overflow-hidden group">
              <User className="w-12 h-12 text-primary" />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                <Edit3 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-secondary">{user.name}</h1>
            <p className="text-accent font-bold uppercase tracking-[0.2em] text-[10px] mt-1">Devotee of Kuldaivat Trust</p>
          </div>
          <button className="md:ml-auto spiritual-button-outline !px-6 text-xs uppercase tracking-widest font-black">
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Overview */}
          <div className="md:col-span-2 space-y-6">
            <div className="spiritual-card p-8">
              <h2 className="text-xl font-black text-secondary mb-6 border-b border-border pb-4">Personal Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-2">Email Identity</label>
                    <div className="flex items-center gap-3 text-secondary font-bold">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-2">Contact Number</label>
                    <div className="flex items-center gap-3 text-secondary font-bold">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      {user.phone || 'Not Provided'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-2">Role Access</label>
                    <div className="flex items-center gap-3 text-secondary font-bold">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-2">Location</label>
                    <div className="flex items-center gap-3 text-secondary font-bold">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      Mumbai, MH
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="spiritual-card p-8 bg-secondary text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Heart className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h2 className="text-xl font-black mb-4">Member Status</h2>
                <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-wider text-sm mb-6">
                  <Calendar className="w-4 h-4" /> Joined {new Date().getFullYear()}
                </div>
                <p className="text-white/70 text-sm leading-relaxed max-w-md italic">
                  "Your contribution ensures that our traditions and spiritual services continue to flourish for generations."
                </p>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <div className="spiritual-card p-6 border-primary/20 bg-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em]">Donation Summary</h3>
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-black text-secondary flex items-baseline gap-1">
                <IndianRupee className="w-5 h-5 text-accent" />
                {user.totalDonations?.toLocaleString() || '0'}
              </div>
              <p className="text-[10px] text-muted-foreground font-bold mt-2">Lifetime Charity Contribution</p>
              
              <button 
                onClick={() => router.push('/donations')}
                className="w-full mt-6 spiritual-button text-xs py-3"
              >
                View History
              </button>
            </div>

            <div className="spiritual-card p-6">
              <h3 className="text-xs font-black text-secondary uppercase tracking-[0.2em] mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <button className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Security Settings
                  </button>
                </li>
                <li>
                  <button className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Notification Preferences
                  </button>
                </li>
                <li>
                  <button className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Legal & Terms
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
