'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sparkles, Calendar, Heart, Info, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function UserNotificationsPage() {
    const { t } = useLanguage();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications');
            const data = await res.json();
            // On public side, maybe only show general/event? 
            // Or show all if it's meant to be a public feed.
            setNotifications(data);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000); // refresh every 10s
        return () => clearInterval(interval);
    }, []);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'event': return <Calendar className="w-5 h-5 text-orange-500" />;
            case 'donation': return <Heart className="w-5 h-5 text-red-500" />;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-20 bg-secondary text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover scale-110" />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
                        >
                            {t('nav.notifications') || 'Temple Updates'}
                        </motion.h1>
                        <p className="text-accent font-bold uppercase tracking-[0.3em] text-sm italic">
                            Stay Connected with Sacred Activities
                        </p>
                    </div>
                </section>

                <section className="py-20 bg-[#FFFDF9] relative min-h-[60vh]">
                    <div className="max-w-4xl mx-auto px-4 relative z-10">
                        
                        <div className="text-center mb-16">
                            <div className="flex justify-center items-center gap-2 mb-4">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                    Latest Alerts
                                </span>
                            </div>
                            <h2 className="text-4xl font-black text-secondary tracking-tight italic">
                                Divine Announcements
                            </h2>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            </div>
                        ) : notifications.length > 0 ? (
                            <div className="space-y-6">
                                {notifications.map((n, i) => (
                                    <motion.div
                                        key={n._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="spiritual-card bg-white p-6 border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <div className="flex gap-4">
                                            <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center">
                                                {getTypeIcon(n.type)}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-black text-secondary italic">{n.title}</h3>
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/50 px-2 py-1 rounded-lg">
                                                        {new Date(n.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {n.message}
                                                </p>
                                                <div className="mt-4 flex items-center gap-2">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                                                        n.type === 'event' ? 'bg-orange-100 text-orange-600' :
                                                        n.type === 'donation' ? 'bg-red-100 text-red-600' :
                                                        'bg-blue-100 text-blue-600'
                                                    }`}>
                                                        {n.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-border">
                                <Bell className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                                <p className="text-muted-foreground font-bold italic">No active notifications at this moment.</p>
                            </div>
                        )}
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover grayscale" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
