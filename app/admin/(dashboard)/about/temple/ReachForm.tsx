'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, MapPin, CheckCircle, AlertCircle, Globe, Loader2, Navigation, Phone, Mail, Copy } from 'lucide-react';
import axios from 'axios';

export default function ReachForm() {
    const [activeTab, setActiveTab] = useState<'english' | 'marathi'>('english');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<any>({
        english: { address: '', landmark: '', district: '', state: '', transportation: '', travelInstructions: '', contactInfo: '' },
        marathi: { address: '', landmark: '', district: '', state: '', transportation: '', travelInstructions: '' },
        mapEmbedUrl: '',
        isPublished: false
    });
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/about/temple/reach');
            if (res.data && (res.data.english || res.data.marathi)) {
                setData(res.data);
            }
        } catch (error) {
            console.error('Error fetching reach details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.post('/api/admin/about/temple/reach', data);
            setNotification({ type: 'success', message: 'Reach details updated successfully!' });
        } catch (error) {
            console.error('Error saving reach details:', error);
            setNotification({ type: 'error', message: 'Failed to update reach details.' });
        } finally {
            setSaving(false);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-secondary tracking-tight uppercase">How to Reach</h2>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest italic">Location & Access Management</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setData({ ...data, isPublished: !data.isPublished })}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${data.isPublished ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-gray-100 text-gray-500 border border-gray-200'
                            }`}
                    >
                        {data.isPublished ? 'Published' : 'Draft'}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                        {saving ? 'Processing...' : 'Sync Reach'}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold border ${notification.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
                            }`}
                    >
                        {notification.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-4 block">Google Maps Embed URL</label>
                        <input
                            type="text"
                            placeholder="Paste Embed URL here..."
                            className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none mb-4"
                            value={data.mapEmbedUrl}
                            onChange={(e) => setData({ ...data, mapEmbedUrl: e.target.value })}
                        />
                        <div className="aspect-video rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100">
                            {data.mapEmbedUrl ? (
                                <iframe
                                    src={data.mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                    <MapPin className="w-10 h-10 mb-2 opacity-20" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Map Preview Area</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex border-b border-gray-100">
                            {(['english', 'marathi'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                                        ? 'text-primary bg-primary/5 border-b-2 border-primary'
                                        : 'text-muted-foreground hover:bg-gray-50'
                                        }`}
                                >
                                    <Globe className={`w-3 h-3 ${activeTab === tab ? 'text-primary' : 'text-muted-foreground'}`} />
                                    {tab === 'english' ? 'ENGLISH' : 'मराठी'}
                                </button>
                            ))}
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Full Address</label>
                                    <textarea
                                        rows={3}
                                        className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none resize-none"
                                        value={data[activeTab]?.address || ''}
                                        onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], address: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Landmark</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                        value={data[activeTab]?.landmark || ''}
                                        onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], landmark: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">District / City</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                        value={data[activeTab]?.district || ''}
                                        onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], district: e.target.value } })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Transportation (Bus, Train, Air)</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all border outline-none resize-none"
                                    value={data[activeTab]?.transportation || ''}
                                    onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], transportation: e.target.value } })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Travel Instructions</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all border outline-none resize-none"
                                    value={data[activeTab]?.travelInstructions || ''}
                                    onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], travelInstructions: e.target.value } })}
                                />
                            </div>

                            {activeTab === 'english' && (
                                <div className="space-y-2 pt-4 border-t border-gray-50">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Official Contact Information</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. +91 98765 43210 / info@temple.com"
                                        className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                        value={data.english.contactInfo}
                                        onChange={(e) => setData({ ...data, english: { ...data.english, contactInfo: e.target.value } })}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
