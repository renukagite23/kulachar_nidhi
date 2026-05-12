'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Upload, CheckCircle, AlertCircle, Trash2, Globe, Image as ImageIcon, Loader2, Plus, X, List, Sparkles } from 'lucide-react';
import axios from 'axios';

export default function HistoryForm() {
    const [activeTab, setActiveTab] = useState<'english' | 'marathi'>('english');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<any>({
        english: {
            title: '',
            heroSubtitle: '',
            introQuote: '',
            section1Title: '',
            section1Content: '',
            section2Title: '',
            section2Content: '',
            stats: [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }],
            modernTitle: '',
            modernContent: ''
        },
        marathi: {
            title: '',
            heroSubtitle: '',
            introQuote: '',
            section1Title: '',
            section1Content: '',
            section2Title: '',
            section2Content: '',
            stats: [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }],
            modernTitle: '',
            modernContent: ''
        },
        image: '',
        gallery: [],
        isPublished: false
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/about/temple/history');
            if (res.data && (res.data.english || res.data.marathi)) {
                const fetchedData = res.data;
                // Ensure stats has 4 items
                ['english', 'marathi'].forEach(lang => {
                    if (!fetchedData[lang].stats || fetchedData[lang].stats.length < 4) {
                        fetchedData[lang].stats = [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }];
                    }
                });
                setData(fetchedData);
                if (res.data.image) setImagePreview(res.data.image);
                if (res.data.gallery) setGalleryPreviews(res.data.gallery);
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => setGalleryPreviews(prev => [...prev, reader.result as string]);
                reader.readAsDataURL(file);
            });
        }
    };

    const removeGalleryItem = (index: number) => {
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            let imageUrl = data.image;

            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                const uploadRes = await axios.post('/api/admin/about/upload', formData);
                imageUrl = uploadRes.data.url;
            }

            const uploadedGallery = await Promise.all(
                galleryPreviews.map(async (item) => {
                    if (item.startsWith('data:')) {
                        const file = await fetch(item).then(res => res.blob());
                        const formData = new FormData();
                        formData.append('file', file, 'gallery-image.jpg');
                        const res = await axios.post('/api/admin/about/upload', formData);
                        return res.data.url;
                    }
                    return item;
                })
            );

            await axios.post('/api/admin/about/temple/history', {
                ...data,
                image: imageUrl,
                gallery: uploadedGallery
            });

            setNotification({ type: 'success', message: 'Temple history updated successfully!' });
        } catch (error) {
            console.error('Error saving history:', error);
            setNotification({ type: 'error', message: 'Failed to update temple history.' });
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

    const labels: any = {
        english: {
            title: 'Hero Title',
            heroSubtitle: 'Hero Subtitle',
            introQuote: 'Intro Quote Box',
            section1Title: 'Section 1 Title',
            section1Content: 'Section 1 Content',
            section2Title: 'Section 2 Title',
            section2Content: 'Section 2 List (Bullet points)',
            modernTitle: 'Modern Form Title',
            modernContent: 'Modern Form List',
            stats: 'Quick Stats Row',
            image: 'Main History Image',
            gallery: 'Gallery Images'
        },
        marathi: {
            title: 'मुख्य शीर्षक',
            heroSubtitle: 'उपशीर्षक',
            introQuote: 'प्रस्तावना कोट बॉक्स',
            section1Title: 'विभाग १ शीर्षक',
            section1Content: 'विभाग १ मजकूर',
            section2Title: 'विभाग २ शीर्षक',
            section2Content: 'विभाग २ यादी',
            modernTitle: 'आधुनिक स्वरूप शीर्षक',
            modernContent: 'आधुनिक स्वरूप यादी',
            stats: 'आकडेवारी',
            image: 'मुख्य चित्र',
            gallery: 'दालन चित्रे'
        }
    };

    const currentLabels = labels[activeTab];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <ImageIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-secondary tracking-tight uppercase">Temple History</h2>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest italic">Sacred Legacy Management</p>
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
                        {saving ? 'Processing...' : 'Sync History'}
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
                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-4 block">{currentLabels.image}</label>
                        <div className="relative group aspect-video rounded-[2rem] overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-primary transition-all">
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
                                    <Upload className="w-5 h-5 text-primary mb-2" />
                                    <span className="text-[10px] font-black text-muted-foreground uppercase">Upload Image</span>
                                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-4 block">{currentLabels.gallery}</label>
                        <div className="grid grid-cols-2 gap-3">
                            {galleryPreviews.map((src, idx) => (
                                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                                    <img src={src} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removeGalleryItem(idx)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
                                <Plus className="w-5 h-5 text-gray-300" />
                                <input type="file" className="hidden" multiple onChange={handleGalleryChange} accept="image/*" />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Content Column */}
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
                                    {tab === 'english' ? 'ENGLISH' : 'मराठी'}
                                </button>
                            ))}
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Hero Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{currentLabels.title}</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                        value={data[activeTab]?.title || ''}
                                        onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], title: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{currentLabels.heroSubtitle}</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                        value={data[activeTab]?.heroSubtitle || ''}
                                        onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], heroSubtitle: e.target.value } })}
                                    />
                                </div>
                            </div>

                            {/* Intro Quote */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{currentLabels.introQuote}</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-orange-50/30 border-orange-100 rounded-2xl py-4 px-6 text-sm font-semibold italic text-secondary focus:ring-2 focus:ring-orange-200 transition-all border outline-none resize-none"
                                    value={data[activeTab]?.introQuote || ''}
                                    onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], introQuote: e.target.value } })}
                                />
                            </div>

                            {/* Section 1 */}
                            <div className="space-y-4 pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 bg-primary text-white rounded-lg flex items-center justify-center text-[10px] font-black">1</div>
                                    <label className="text-[10px] font-black text-secondary uppercase tracking-widest">{currentLabels.section1Title}</label>
                                </div>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                    value={data[activeTab]?.section1Title || ''}
                                    onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], section1Title: e.target.value } })}
                                />
                                <textarea
                                    rows={8}
                                    placeholder="Write history description here..."
                                    className="w-full bg-gray-50 border-gray-100 rounded-3xl py-5 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all border outline-none leading-relaxed resize-none"
                                    value={data[activeTab]?.section1Content || ''}
                                    onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], section1Content: e.target.value } })}
                                />
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-4 pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 bg-primary text-white rounded-lg flex items-center justify-center text-[10px] font-black">2</div>
                                    <label className="text-[10px] font-black text-secondary uppercase tracking-widest">{currentLabels.section2Title}</label>
                                </div>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all border outline-none"
                                    value={data[activeTab]?.section2Title || ''}
                                    onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], section2Title: e.target.value } })}
                                />
                                <textarea
                                    rows={5}
                                    placeholder="Enter points separated by new lines..."
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-5 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all border outline-none leading-relaxed resize-none"
                                    value={data[activeTab]?.section2Content || ''}
                                    onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], section2Content: e.target.value } })}
                                />
                            </div>

                            {/* Stats Row */}
                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{currentLabels.stats}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[0, 1, 2, 3].map((idx) => (
                                        <div key={idx} className="space-y-2 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                            <input
                                                type="text"
                                                placeholder="Label (e.g. Land)"
                                                className="w-full bg-gray-50 border-none rounded-lg py-2 px-3 text-[10px] font-bold focus:ring-1 focus:ring-primary/20 outline-none"
                                                value={data[activeTab]?.stats?.[idx]?.label || ''}
                                                onChange={(e) => {
                                                    const newStats = [...data[activeTab].stats];
                                                    newStats[idx].label = e.target.value;
                                                    setData({ ...data, [activeTab]: { ...data[activeTab], stats: newStats } });
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Value (e.g. 5 Acres)"
                                                className="w-full bg-gray-50 border-none rounded-lg py-2 px-3 text-[10px] font-bold text-primary focus:ring-1 focus:ring-primary/20 outline-none"
                                                value={data[activeTab]?.stats?.[idx]?.value || ''}
                                                onChange={(e) => {
                                                    const newStats = [...data[activeTab].stats];
                                                    newStats[idx].value = e.target.value;
                                                    setData({ ...data, [activeTab]: { ...data[activeTab], stats: newStats } });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Modern Form Section */}
                            <div className="space-y-4 pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-5 h-5 text-orange-500" />
                                    <label className="text-[10px] font-black text-secondary uppercase tracking-widest">{currentLabels.modernTitle}</label>
                                </div>
                                <input
                                    type="text"
                                    className="w-full bg-secondary text-white border-none rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-accent/20 transition-all outline-none"
                                    value={data[activeTab]?.modernTitle || ''}
                                    onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], modernTitle: e.target.value } })}
                                />
                                <textarea
                                    rows={5}
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-5 px-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all border outline-none leading-relaxed resize-none"
                                    value={data[activeTab]?.modernContent || ''}
                                    onChange={(e) => setData({ ...data, [activeTab]: { ...data[activeTab], modernContent: e.target.value } })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
