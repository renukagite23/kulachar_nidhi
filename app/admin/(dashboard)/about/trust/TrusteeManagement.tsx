'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Edit2,
    Trash2,
    ArrowUp,
    ArrowDown,
    Globe,
    Image as ImageIcon,
    User,
    CheckCircle,
    XCircle,
    Save,
    X,
    Loader2,
    Upload,
    MoreVertical,
    AlertCircle
} from 'lucide-react';
import axios from 'axios';

interface Trustee {
    _id?: string;
    english: { name: string; designation: string; description: string; };
    marathi: { name: string; designation: string; description: string; };
    image: string;
    isActive: boolean;
    sortOrder: number;
}

export default function TrusteeManagement() {
    const [trustees, setTrustees] = useState<Trustee[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTrustee, setEditingTrustee] = useState<Trustee | null>(null);
    const [activeTab, setActiveTab] = useState<'english' | 'marathi'>('english');
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Form State
    const [formData, setFormData] = useState<Trustee>({
        english: { name: '', designation: '', description: '' },
        marathi: { name: '', designation: '', description: '' },
        image: '',
        isActive: true,
        sortOrder: 0
    });

    useEffect(() => {
        fetchTrustees();
    }, []);

    const fetchTrustees = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/about/trustees');
            // Ensure we always have an array
            setTrustees(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error('Error fetching trustees:', error);
            setTrustees([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (trustee: Trustee) => {
        setEditingTrustee(trustee);
        setFormData({
            ...trustee,
            english: {
                name: trustee.english?.name || '',
                designation: trustee.english?.designation || '',
                description: trustee.english?.description || '',
            },
            marathi: {
                name: trustee.marathi?.name || '',
                designation: trustee.marathi?.designation || '',
                description: trustee.marathi?.description || '',
            }
        });
        setImagePreview(trustee.image);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingTrustee(null);
        setFormData({
            english: { name: '', designation: '', description: '' },
            marathi: { name: '', designation: '', description: '' },
            image: '',
            isActive: true,
            sortOrder: trustees.length
        });
        setImagePreview(null);
        setImageFile(null);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this trustee?')) return;
        try {
            await axios.delete(`/api/admin/about/trustees/${id}`);
            setNotification({ type: 'success', message: 'Trustee deleted successfully' });
            fetchTrustees();
        } catch (error) {
            setNotification({ type: 'error', message: 'Failed to delete trustee' });
        }
    };

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        const newTrustees = [...trustees];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= trustees.length) return;

        // Swap
        [newTrustees[index], newTrustees[targetIndex]] = [newTrustees[targetIndex], newTrustees[index]];

        // Update all sort orders
        const updatedTrustees = newTrustees.map((t, i) => ({ ...t, sortOrder: i }));
        setTrustees(updatedTrustees);

        // API calls to update order
        try {
            await Promise.all(updatedTrustees.map(t =>
                axios.put(`/api/admin/about/trustees/${t._id}`, { sortOrder: t.sortOrder })
            ));
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            let imageUrl = formData.image;

            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('file', imageFile);
                const uploadRes = await axios.post('/api/admin/about/upload', uploadData);
                imageUrl = uploadRes.data.url;
            }

            const payload = { ...formData, image: imageUrl };

            if (editingTrustee) {
                await axios.put(`/api/admin/about/trustees/${editingTrustee._id}`, payload);
                setNotification({ type: 'success', message: 'Trustee updated successfully' });
            } else {
                await axios.post('/api/admin/about/trustees', payload);
                setNotification({ type: 'success', message: 'Trustee added successfully' });
            }

            setIsFormOpen(false);
            fetchTrustees();
        } catch (error) {
            setNotification({ type: 'error', message: 'Failed to save trustee' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] shadow-sm border border-gray-100">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">Loading Trustees...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-secondary">Manage Trustees</h2>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">Board of Trustees & Leadership Team</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-2xl text-sm font-black shadow-lg shadow-secondary/20 hover:bg-black transition-all"
                >
                    <Plus className="w-4 h-4" /> Add New Trustee
                </button>
            </div>

            {notification && (
                <div className={`p-4 rounded-2xl border flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-bold">{notification.message}</p>
                    <button onClick={() => setNotification(null)} className="ml-auto opacity-50 hover:opacity-100"><X className="w-4 h-4" /></button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {trustees.map((trustee, index) => (
                        <motion.div
                            key={trustee._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all group relative overflow-hidden"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                                    {trustee.image ? (
                                        <img src={trustee.image} alt={trustee.english?.name || 'Trustee'} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <User className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${trustee.isActive ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-100 text-gray-500'}`}>
                                            {trustee.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleMove(index, 'up')} className="p-1.5 hover:bg-gray-50 rounded-lg text-muted-foreground hover:text-primary"><ArrowUp className="w-3 h-3" /></button>
                                            <button onClick={() => handleMove(index, 'down')} className="p-1.5 hover:bg-gray-50 rounded-lg text-muted-foreground hover:text-primary"><ArrowDown className="w-3 h-3" /></button>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-black text-secondary truncate">{trustee.english?.name || 'Unnamed Trustee'}</h4>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest truncate">{trustee.english?.designation || 'No Designation'}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleEdit(trustee)}
                                        className="p-2.5 bg-gray-50 text-secondary hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(trustee._id!)}
                                        className="p-2.5 bg-gray-50 text-secondary hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                                    Order: #{index + 1}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div>
                                    <h3 className="text-2xl font-black text-secondary">{editingTrustee ? 'Edit Trustee' : 'Add New Trustee'}</h3>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Fill in the details for the board member</p>
                                </div>
                                <button onClick={() => setIsFormOpen(false)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary hover:text-red-500 hover:shadow-lg transition-all border border-gray-100">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 scrollbar-thin">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    {/* Sidebar inside modal */}
                                    <div className="lg:col-span-4 space-y-6">
                                        {/* Image Upload */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-2"><ImageIcon className="w-3 h-3" /> Profile Image</label>
                                            <div className="relative group aspect-square rounded-3xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-primary transition-colors flex items-center justify-center">
                                                {imagePreview ? (
                                                    <>
                                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                            <label className="p-2 bg-white rounded-lg text-secondary cursor-pointer hover:bg-gray-100">
                                                                <Upload className="w-4 h-4" />
                                                                <input type="file" className="sr-only" accept="image/*" onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        setImageFile(file);
                                                                        setImagePreview(URL.createObjectURL(file));
                                                                    }
                                                                }} />
                                                            </label>
                                                            <button onClick={() => { setImagePreview(null); setImageFile(null); }} className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-50">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <label className="flex flex-col items-center gap-2 cursor-pointer text-gray-400 hover:text-primary transition-colors">
                                                        <Upload className="w-8 h-8" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">Upload Photo</span>
                                                        <input type="file" className="sr-only" accept="image/*" onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setImageFile(file);
                                                                setImagePreview(URL.createObjectURL(file));
                                                            }
                                                        }} />
                                                    </label>
                                                )}
                                            </div>
                                        </div>

                                        {/* Status Toggle */}
                                        <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-black text-secondary uppercase tracking-tight">Active Status</p>
                                                <p className="text-[9px] font-medium text-muted-foreground leading-tight">Toggle visibility on website</p>
                                            </div>
                                            <button
                                                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                                className={`relative w-11 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                                            >
                                                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.isActive ? 'translate-x-5' : ''}`} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Main Fields inside modal */}
                                    <div className="lg:col-span-8 space-y-6">
                                        {/* Lang Tabs */}
                                        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl w-fit">
                                            <button onClick={() => setActiveTab('english')} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'english' ? 'bg-white text-secondary shadow-sm' : 'text-secondary/40 hover:text-secondary'}`}>English</button>
                                            <button onClick={() => setActiveTab('marathi')} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'marathi' ? 'bg-white text-secondary shadow-sm' : 'text-secondary/40 hover:text-secondary'}`}>मराठी</button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Trustee Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    value={formData[activeTab].name}
                                                    onChange={(e) => setFormData({ ...formData, [activeTab]: { ...formData[activeTab], name: e.target.value } })}
                                                    placeholder={activeTab === 'english' ? "e.g. Ramesh Patil" : "उदा. रमेश पाटील"}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Designation</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    value={formData[activeTab].designation}
                                                    onChange={(e) => setFormData({ ...formData, [activeTab]: { ...formData[activeTab], designation: e.target.value } })}
                                                    placeholder={activeTab === 'english' ? "e.g. Secretary" : "उदा. सचिव"}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Description</label>
                                                <textarea
                                                    rows={4}
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none leading-relaxed resize-none"
                                                    value={formData[activeTab].description}
                                                    onChange={(e) => setFormData({ ...formData, [activeTab]: { ...formData[activeTab], description: e.target.value } })}
                                                    placeholder={activeTab === 'english' ? "Trustee's background and contribution..." : "मजकूर येथे लिहा..."}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-8 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 sticky bottom-0">
                                <button onClick={() => setIsFormOpen(false)} className="px-8 py-3.5 text-sm font-black text-muted-foreground hover:text-secondary transition-colors uppercase tracking-widest">Cancel</button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-10 py-3.5 bg-primary text-white rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                    {editingTrustee ? 'Update Trustee' : 'Create Trustee'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
