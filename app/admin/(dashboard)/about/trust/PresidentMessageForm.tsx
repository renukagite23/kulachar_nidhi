'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Upload, CheckCircle, AlertCircle, Trash2, Globe, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function PresidentMessageForm() {
    const { admin } = useSelector((state: RootState) => state.adminAuth);
    const [activeTab, setActiveTab] = useState<'english' | 'marathi'>('english');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<any>({
        english: { name: '', designation: '', title: '', description: '', majorWorksTitle: '', majorWorks: '', staffQuartersTitle: '', staffQuarters: '', donorRemembrance: '', legacyText: '', heroTitle: '', heroSubtitle: '', stats: [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }] },
        marathi: { name: '', designation: '', title: '', description: '', majorWorksTitle: '', majorWorks: '', staffQuartersTitle: '', staffQuarters: '', donorRemembrance: '', legacyText: '', heroTitle: '', heroSubtitle: '', stats: [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }] },
        image: '',
        isPublished: false
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        fetchMessage();
    }, []);

    const fetchMessage = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/about/president-message');
            if (res.data && (res.data.english || res.data.marathi)) {
                setMessage({
                    ...res.data,
                    english: {
                        name: res.data.english?.name || '',
                        designation: res.data.english?.designation || '',
                        title: res.data.english?.title || '',
                        description: res.data.english?.description || '',
                        majorWorksTitle: res.data.english?.majorWorksTitle || '',
                        majorWorks: res.data.english?.majorWorks || '',
                        staffQuartersTitle: res.data.english?.staffQuartersTitle || '',
                        staffQuarters: res.data.english?.staffQuarters || '',
                        donorRemembrance: res.data.english?.donorRemembrance || '',
                        legacyText: res.data.english?.legacyText || '',
                        heroTitle: res.data.english?.heroTitle || '',
                        heroSubtitle: res.data.english?.heroSubtitle || '',
                        stats: res.data.english?.stats?.length === 4 ? res.data.english.stats : [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }],
                    },
                    marathi: {
                        name: res.data.marathi?.name || '',
                        designation: res.data.marathi?.designation || '',
                        title: res.data.marathi?.title || '',
                        description: res.data.marathi?.description || '',
                        majorWorksTitle: res.data.marathi?.majorWorksTitle || '',
                        majorWorks: res.data.marathi?.majorWorks || '',
                        staffQuartersTitle: res.data.marathi?.staffQuartersTitle || '',
                        staffQuarters: res.data.marathi?.staffQuarters || '',
                        donorRemembrance: res.data.marathi?.donorRemembrance || '',
                        legacyText: res.data.marathi?.legacyText || '',
                        heroTitle: res.data.marathi?.heroTitle || '',
                        heroSubtitle: res.data.marathi?.heroSubtitle || '',
                        stats: res.data.marathi?.stats?.length === 4 ? res.data.marathi.stats : [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }],
                    }
                });
                if (res.data.image) setImagePreview(res.data.image);
            }
        } catch (error) {
            console.error('Error fetching message:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            let imageUrl = message.image;

            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('upload_preset', 'kulachar_nidhi');
                const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dmod9908/image/upload', formData);
                imageUrl = uploadRes.data.secure_url;
            }

            const res = await axios.post('/api/admin/about/president-message', {
                ...message,
                image: imageUrl
            });

            setNotification({ type: 'success', message: 'President message updated successfully!' });
        } catch (error) {
            console.error('Error saving message:', error);
            setNotification({ type: 'error', message: 'Failed to update president message.' });
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
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-secondary tracking-tight">PRESIDENT MESSAGE</h2>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Publicity Center</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMessage({ ...message, isPublished: !message.isPublished })}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${message.isPublished ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-gray-100 text-gray-500 border border-gray-200'
                            }`}
                    >
                        {message.isPublished ? 'Published' : 'Draft'}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                        {saving ? 'Processing...' : 'Sync Data'}
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
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-4 block">Official Portrait</label>
                        <div className="relative group aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-primary transition-all">
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => { setImageFile(null); setImagePreview(null); }}
                                            className="bg-red-500 text-white p-2.5 rounded-xl hover:scale-110 transition-transform"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <label className="bg-white text-secondary p-2.5 rounded-xl cursor-pointer hover:scale-110 transition-transform">
                                            <Upload className="w-4 h-4" />
                                            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-100 transition-all">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-all">
                                        <Upload className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center px-4">Upload President Image</span>
                                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
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
                                    {tab === 'english' ? 'ENGLISH' : 'MARATHI'}
                                </button>
                            ))}
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{activeTab === 'english' ? 'Hero Title' : 'मुख्य शीर्षक'}</label>
                                    <input
                                        type="text"
                                        placeholder={activeTab === 'english' ? "e.g. ABOUT TRUST" : "उदा. ट्रस्टबद्दल"}
                                        className="w-full bg-white border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                        value={message[activeTab]?.heroTitle || ''}
                                        onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], heroTitle: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{activeTab === 'english' ? 'Hero Subtitle' : 'उपशीर्षक'}</label>
                                    <input
                                        type="text"
                                        placeholder={activeTab === 'english' ? "e.g. LEGACY OF DEVOTION" : "उदा. भक्तीचा वारसा"}
                                        className="w-full bg-white border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                        value={message[activeTab]?.heroSubtitle || ''}
                                        onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], heroSubtitle: e.target.value } })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{activeTab === 'english' ? 'President Name' : 'अध्यक्षांचे नाव'}</label>
                                    <input
                                        type="text"
                                        placeholder={activeTab === 'english' ? "e.g. Shri. Ramesh Shah" : "उदा. श्री. रमेश शाह"}
                                        className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                        value={message[activeTab]?.name || ''}
                                        onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], name: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{activeTab === 'english' ? 'Designation' : 'पद'}</label>
                                    <input
                                        type="text"
                                        placeholder={activeTab === 'english' ? "e.g. Trust President" : "उदा. अध्यक्ष"}
                                        className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                        value={message[activeTab]?.designation || ''}
                                        onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], designation: e.target.value } })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{activeTab === 'english' ? 'Message Title' : 'संदेश शीर्षक'}</label>
                                <input
                                    type="text"
                                    placeholder={activeTab === 'english' ? "A message to all devotees" : "भक्तांसाठी संदेश"}
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                    value={message[activeTab]?.title || ''}
                                    onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], title: e.target.value } })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{activeTab === 'english' ? 'Full Message Description' : 'सविस्तर संदेश'}</label>
                                <textarea
                                    rows={8}
                                    placeholder={activeTab === 'english' ? "Write the detailed message here..." : "येथे सविस्तर संदेश लिहा..."}
                                    className="w-full bg-gray-50 border-gray-100 rounded-3xl py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all border outline-none leading-relaxed resize-none"
                                    value={message[activeTab]?.description || ''}
                                    onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], description: e.target.value } })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                                <div className="space-y-2">
                                    <div className="flex flex-col">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{activeTab === 'english' ? 'Major Works Title' : 'विकासकामे शीर्षक'}</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Major Developmental Works"
                                            className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none mb-2"
                                            value={message[activeTab]?.majorWorksTitle || ''}
                                            onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], majorWorksTitle: e.target.value } })}
                                        />
                                    </div>
                                    <textarea
                                        rows={5}
                                        placeholder={activeTab === 'english' ? "Describe major works..." : "प्रमुख विकासकामे..."}
                                        className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all border outline-none leading-relaxed resize-none"
                                        value={message[activeTab]?.majorWorks || ''}
                                        onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], majorWorks: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-col">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{activeTab === 'english' ? 'Staff Quarters Title' : 'कर्मचारी निवास शीर्षक'}</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Staff Quarters Info"
                                            className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none mb-2"
                                            value={message[activeTab]?.staffQuartersTitle || ''}
                                            onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], staffQuartersTitle: e.target.value } })}
                                        />
                                    </div>
                                    <textarea
                                        rows={5}
                                        placeholder={activeTab === 'english' ? "Information about staff quarters..." : "कर्मचारी निवासाबाबत माहिती..."}
                                        className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all border outline-none leading-relaxed resize-none"
                                        value={message[activeTab]?.staffQuarters || ''}
                                        onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], staffQuarters: e.target.value } })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-gray-50">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{activeTab === 'english' ? 'Donor Remembrance Box Content' : 'देणगीदारांच्या स्मरणार्थ'}</label>
                                <textarea
                                    rows={4}
                                    placeholder={activeTab === 'english' ? "Text for the donor remembrance box..." : "देणगीदारांच्या स्मरणार्थ मजकूर..."}
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all border outline-none leading-relaxed resize-none"
                                    value={message[activeTab]?.donorRemembrance || ''}
                                    onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], donorRemembrance: e.target.value } })}
                                />
                            </div>

                            <div className="space-y-2 pt-4 border-t border-gray-50">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{activeTab === 'english' ? 'Legacy Text (Badge below image)' : 'वारसा मजकूर'}</label>
                                <input
                                    type="text"
                                    placeholder={activeTab === 'english' ? "e.g. Trustees Mandate since 1976" : "उदा. १९७६ पासून विश्वस्त आदेश"}
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                    value={message[activeTab]?.legacyText || ''}
                                    onChange={(e) => setMessage({ ...message, [activeTab]: { ...message[activeTab], legacyText: e.target.value } })}
                                />
                            </div>

                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <h4 className="text-sm font-black text-secondary uppercase tracking-wider px-1">{activeTab === 'english' ? 'Quick Stats Row' : 'आकडेवारी'}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[0, 1, 2, 3].map((idx) => (
                                        <div key={idx} className="space-y-2 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-muted-foreground uppercase">{activeTab === 'english' ? `Stat ${idx + 1} Label` : `सांख्यिकी ${idx + 1} शीर्षक`}</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Devotees"
                                                    className="w-full bg-gray-50 border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-1 focus:ring-primary/20 outline-none"
                                                    value={message[activeTab]?.stats?.[idx]?.label || ''}
                                                    onChange={(e) => {
                                                        const newStats = [...(message[activeTab]?.stats || [])];
                                                        newStats[idx] = { ...newStats[idx], label: e.target.value };
                                                        setMessage({ ...message, [activeTab]: { ...message[activeTab], stats: newStats } });
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-muted-foreground uppercase">{activeTab === 'english' ? `Stat ${idx + 1} Value` : `सांख्यिकी ${idx + 1} मूल्य`}</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 50,000+"
                                                    className="w-full bg-gray-50 border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-1 focus:ring-primary/20 outline-none"
                                                    value={message[activeTab]?.stats?.[idx]?.value || ''}
                                                    onChange={(e) => {
                                                        const newStats = [...(message[activeTab]?.stats || [])];
                                                        newStats[idx] = { ...newStats[idx], value: e.target.value };
                                                        setMessage({ ...message, [activeTab]: { ...message[activeTab], stats: newStats } });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
