'use client';

import { useEffect, useState, useRef } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, LayoutGrid, Search, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Toast Component
const Toast = ({ message, type, onClose }: any) => {
    useEffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-4 right-4 px-6 py-3 rounded-2xl text-white font-bold shadow-2xl z-[100] flex items-center gap-2 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
            {message}
        </motion.div>
    );
};

export default function AdminGalleryPage() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [toast, setToast] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // FETCH IMAGES
    const fetchImages = async () => {
        try {
            const res = await fetch('/api/gallery', {
                credentials: 'include',
            });
            const data = await res.json();
            setImages(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    // HANDLE FILE UPLOAD
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setImageUrl(data.url);
                setToast({ message: 'Image uploaded successfully', type: 'success' });
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (err: any) {
            setToast({ message: err.message || 'Upload failed', type: 'error' });
        } finally {
            setUploading(false);
        }
    };

    // ADD IMAGE
    const handleAdd = async () => {
        if (!imageUrl) return;

        try {
            const res = await fetch('/api/gallery', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl, caption }),
            });

            if (!res.ok) throw new Error('Failed to add image');

            setToast({ message: 'Image added successfully', type: 'success' });
            setImageUrl('');
            setCaption('');
            setShowAdd(false);
            fetchImages();
        } catch {
            setToast({ message: 'Failed to add image', type: 'error' });
        }
    };

    // DELETE IMAGE
    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`/api/gallery/${deleteId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!res.ok) throw new Error('Delete failed');

            setToast({ message: 'Image deleted', type: 'success' });
            setDeleteId(null);
            fetchImages();
        } catch {
            setToast({ message: 'Delete failed', type: 'error' });
        }
    };

    if (loading) {
        return (
            <div className="p-12 flex justify-center items-center h-full">
                <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-[1400px] mx-auto">
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <div className="text-[10px] uppercase font-black tracking-[0.2em] text-primary mb-1 flex items-center gap-2">
                        <LayoutGrid className="w-3 h-3" /> Temple Gallery
                    </div>
                    <h1 className="text-4xl font-black text-secondary tracking-tight">
                        Gallery Management
                    </h1>
                </div>

                <button
                    onClick={() => setShowAdd(true)}
                    className="spiritual-button flex items-center gap-2 shadow-xl shadow-primary/20"
                >
                    <Plus className="w-4 h-4" />
                    Add New Image
                </button>
            </div>

            {/* MAIN CONTENT CARD */}
            <div className="spiritual-card bg-white border-border shadow-sm p-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-black text-secondary flex items-center gap-2 italic">
                        <ImageIcon className="w-5 h-5 text-primary" /> Visual Assets
                    </h2>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Total {images.length} Items
                    </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {images.map((img) => (
                            <motion.div
                                layout
                                key={img._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative group rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500 bg-muted/20"
                            >
                                <img
                                    src={img.imageUrl}
                                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={img.caption}
                                />
                                
                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    {img.caption && (
                                        <p className="text-white text-xs font-medium mb-3 line-clamp-2">
                                            {img.caption}
                                        </p>
                                    )}
                                    <button
                                        onClick={() => setDeleteId(img._id)}
                                        className="w-full py-2 bg-red-600/90 hover:bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold backdrop-blur-sm transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Remove Asset
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {images.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ImageIcon className="w-8 h-8 text-muted-foreground opacity-30" />
                        </div>
                        <p className="text-muted-foreground font-medium">No images found in the gallery.</p>
                        <button 
                            onClick={() => setShowAdd(true)}
                            className="mt-4 text-primary font-bold text-sm hover:underline"
                        >
                            Upload your first image
                        </button>
                    </div>
                )}
            </div>

            {/* ADD MODAL */}
            <AnimatePresence>
                {showAdd && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border border-white/20 relative overflow-hidden"
                        >
                            {/* Decorative background circle */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-black text-2xl text-secondary italic">Add Visual Asset</h2>
                                <button 
                                    onClick={() => { setShowAdd(false); setImageUrl(''); setCaption(''); }}
                                    className="p-2 hover:bg-muted rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* UPLOAD OPTION */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Upload Image</label>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploading}
                                        className="w-full h-24 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-orange-50 transition-all text-muted-foreground group"
                                    >
                                        {uploading ? (
                                            <div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Upload className="w-6 h-6 group-hover:text-primary" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Click to upload</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="flex items-center gap-4 py-2">
                                    <div className="h-px bg-border flex-grow"></div>
                                    <span className="text-[10px] font-black text-muted-foreground uppercase">OR</span>
                                    <div className="h-px bg-border flex-grow"></div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Image URL</label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            placeholder="https://example.com/image.jpg"
                                            className="spiritual-input w-full !pl-11"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Caption (Optional)</label>
                                    <input
                                        placeholder="Event or Deity name..."
                                        className="spiritual-input w-full"
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                    />
                                </div>

                                {/* PREVIEW */}
                                <AnimatePresence>
                                    {imageUrl && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="relative rounded-2xl overflow-hidden mt-2 border border-border">
                                                <img
                                                    src={imageUrl}
                                                    className="w-full h-40 object-cover"
                                                    alt="Preview"
                                                    onError={() => setImageUrl('')}
                                                />
                                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[9px] text-white font-black uppercase tracking-widest">
                                                    Live Preview
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <button
                                    onClick={() => { setShowAdd(false); setImageUrl(''); setCaption(''); }}
                                    className="flex-1 border-2 border-border py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest text-secondary hover:bg-muted transition-all"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleAdd}
                                    disabled={!imageUrl}
                                    className="flex-1 spiritual-button !py-3.5 shadow-xl shadow-primary/20 disabled:opacity-50"
                                >
                                    Add Asset
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* DELETE MODAL */}
            <AnimatePresence>
                {deleteId && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white p-8 rounded-[2rem] text-center max-w-sm w-full shadow-2xl"
                        >
                            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8" />
                            </div>
                            <h3 className="font-black text-xl text-secondary mb-2">Remove Visual Asset?</h3>
                            <p className="text-muted-foreground text-sm mb-8">This action cannot be undone. The image will be permanently removed from the gallery.</p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="flex-1 border-2 border-border py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-secondary hover:bg-muted transition-all"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleDelete}
                                    className="flex-1 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-red-700 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
