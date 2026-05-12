'use client';

import { useEffect, useState, useRef } from 'react';
import { Plus, Trash2, Video as VideoIcon, X, LayoutGrid, Search, Upload, PlayCircle, ExternalLink } from 'lucide-react';
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

export default function AdminVideosPage() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [toast, setToast] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // FETCH VIDEOS
    const fetchVideos = async () => {
        try {
            const res = await fetch('/api/videos', {
                credentials: 'include',
                cache: 'no-store'
            });
            const data = await res.json();
            setVideos(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    // HANDLE FILE UPLOAD (FOR DIRECT VIDEO FILES)
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
                setVideoUrl(data.url);
                setToast({ message: 'Video uploaded successfully', type: 'success' });
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (err: any) {
            setToast({ message: err.message || 'Upload failed', type: 'error' });
        } finally {
            setUploading(false);
        }
    };

    // ADD VIDEO
    const handleAdd = async () => {
        if (!videoUrl) return;

        try {
            const res = await fetch('/api/videos', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoUrl, title, description }),
            });

            if (!res.ok) throw new Error('Failed to add video');

            setToast({ message: 'Video added successfully', type: 'success' });
            setVideoUrl('');
            setTitle('');
            setDescription('');
            setShowAdd(false);
            fetchVideos();
        } catch {
            setToast({ message: 'Failed to add video', type: 'error' });
        }
    };

    // DELETE VIDEO
    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`/api/videos/${deleteId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!res.ok) throw new Error('Delete failed');

            setToast({ message: 'Video deleted', type: 'success' });
            setDeleteId(null);
            fetchVideos();
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
                        <VideoIcon className="w-3 h-3" /> Temple Videos
                    </div>
                    <h1 className="text-4xl font-black text-secondary tracking-tight">
                        Video Management
                    </h1>
                </div>

                <button
                    onClick={() => setShowAdd(true)}
                    className="spiritual-button flex items-center gap-2 shadow-xl shadow-primary/20"
                >
                    <Plus className="w-4 h-4" />
                    Add New Video
                </button>
            </div>

            {/* MAIN CONTENT CARD */}
            <div className="spiritual-card bg-white border-border shadow-sm p-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-black text-secondary flex items-center gap-2 italic">
                        <PlayCircle className="w-5 h-5 text-primary" /> Video Assets
                    </h2>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Total {videos.length} Items
                    </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {videos.map((vid) => (
                            <motion.div
                                layout
                                key={vid._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative group rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500 bg-muted/20"
                            >
                                <div className="relative aspect-video">
                                    <img
                                        src={vid.thumbnailUrl || '/devi.png'}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={vid.title}
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="w-12 h-12 text-white" />
                                    </div>
                                    {vid.isYouTube && (
                                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-white text-[8px] font-black uppercase rounded">
                                            YouTube
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-4">
                                    <h3 className="text-sm font-bold text-secondary line-clamp-1 mb-1">{vid.title || 'Untitled Video'}</h3>
                                    <p className="text-[10px] text-muted-foreground line-clamp-2 mb-4 h-8">{vid.description || 'No description provided.'}</p>
                                    
                                    <div className="flex gap-2">
                                        <a 
                                            href={vid.videoUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex-1 py-2 bg-muted hover:bg-muted/80 text-secondary rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold transition-all"
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            View
                                        </a>
                                        <button
                                            onClick={() => setDeleteId(vid._id)}
                                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {videos.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <VideoIcon className="w-8 h-8 text-muted-foreground opacity-30" />
                        </div>
                        <p className="text-muted-foreground font-medium">No videos found in the gallery.</p>
                        <button 
                            onClick={() => setShowAdd(true)}
                            className="mt-4 text-primary font-bold text-sm hover:underline"
                        >
                            Upload your first video
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
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-black text-2xl text-secondary italic">Add Video Asset</h2>
                                <button 
                                    onClick={() => { setShowAdd(false); setVideoUrl(''); setTitle(''); setDescription(''); }}
                                    className="p-2 hover:bg-muted rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Video URL (YouTube/Direct)</label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            placeholder="https://youtube.com/watch?v=..."
                                            className="spiritual-input w-full !pl-11"
                                            value={videoUrl}
                                            onChange={(e) => setVideoUrl(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 py-2">
                                    <div className="h-px bg-border flex-grow"></div>
                                    <span className="text-[10px] font-black text-muted-foreground uppercase">OR</span>
                                    <div className="h-px bg-border flex-grow"></div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Upload Video File</label>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        accept="video/*"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploading}
                                        className="w-full h-20 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-orange-50 transition-all text-muted-foreground group"
                                    >
                                        {uploading ? (
                                            <div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Upload className="w-5 h-5 group-hover:text-primary" />
                                                <span className="text-[9px] font-bold uppercase tracking-widest">Click to upload</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Title</label>
                                    <input
                                        placeholder="Video Title..."
                                        className="spiritual-input w-full"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description</label>
                                    <textarea
                                        placeholder="Enter video description..."
                                        className="spiritual-input w-full min-h-[80px] py-3"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <button
                                    onClick={() => { setShowAdd(false); setVideoUrl(''); setTitle(''); setDescription(''); }}
                                    className="flex-1 border-2 border-border py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest text-secondary hover:bg-muted transition-all"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleAdd}
                                    disabled={!videoUrl || uploading}
                                    className="flex-1 spiritual-button !py-3.5 shadow-xl shadow-primary/20 disabled:opacity-50"
                                >
                                    Add Video
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
                            <h3 className="font-black text-xl text-secondary mb-2">Remove Video Asset?</h3>
                            <p className="text-muted-foreground text-sm mb-8">This action cannot be undone. The video will be permanently removed from the collection.</p>

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
