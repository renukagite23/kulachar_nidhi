'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PlayCircle, X, Loader2, Video as VideoIcon, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function VideoGalleryPage() {
    const { t } = useLanguage();
    const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch('/api/videos', { cache: 'no-store' });
                const data = await res.json();
                setVideos(data);
            } catch (err) {
                console.error('Failed to fetch videos', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const getEmbedUrl = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            if (match && match[2].length === 11) {
                return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
            }
        }
        return url;
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
                            {t('nav.videos')}
                        </motion.h1>
                        <p className="text-accent font-bold uppercase tracking-[0.3em] text-sm italic">
                            Sacred Cinematic Journey
                        </p>
                    </div>
                </section>

                <section className="py-20 md:py-32 bg-[#FFFDF9] relative">
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        
                        <div className="text-center mb-16">
                            <div className="flex justify-center items-center gap-2 mb-4">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                    Divine Vision
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
                                Temple Video Gallery
                            </h2>
                        </div>
                        
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 w-full col-span-full">
                                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs italic">Loading Divine Videos...</p>
                            </div>
                        ) : videos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full">
                                {videos.map((vid, i) => (
                                    <motion.div
                                        key={vid._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="relative group cursor-pointer"
                                        onClick={() => setSelectedVideo(vid)}
                                    >
                                        <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border-[12px] border-white group-hover:shadow-primary/20 transition-all duration-500 aspect-video">
                                            <img
                                                src={vid.thumbnailUrl || '/devi.png'}
                                                alt={vid.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-secondary/40 opacity-40 group-hover:opacity-60 transition-all duration-500 flex items-center justify-center backdrop-blur-[1px]">
                                                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-500 border border-white/30 backdrop-blur-md">
                                                    <PlayCircle className="w-10 h-10 fill-white/20" />
                                                </div>
                                            </div>

                                            {/* YouTube Badge */}
                                            {vid.isYouTube && (
                                                <div className="absolute top-6 left-6 px-3 py-1 bg-red-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                                    YouTube
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="mt-8 px-4">
                                            <h3 className="text-xl font-black text-secondary group-hover:text-primary transition-colors mb-2 uppercase tracking-tight italic">
                                                {vid.title || "Untitled Video"}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2 font-medium">
                                                {vid.description || "Divine moments captured in time, showcasing the spiritual essence of the temple."}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 w-full col-span-full">
                                <VideoIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs italic">No videos in the gallery yet.</p>
                            </div>
                        )}
                    </div>

                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover grayscale" />
                    </div>
                </section>
            </main>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-secondary/98 backdrop-blur-xl p-4 md:p-10"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all group"
                            onClick={() => setSelectedVideo(null)}
                        >
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="relative max-w-6xl w-full aspect-video rounded-[2.5rem] overflow-hidden bg-black shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedVideo.isYouTube ? (
                                <iframe
                                    src={getEmbedUrl(selectedVideo.videoUrl)}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    src={selectedVideo.videoUrl}
                                    className="w-full h-full"
                                    controls
                                    autoPlay
                                />
                            )}
                        </motion.div>
                        
                        <div className="absolute bottom-10 left-0 right-0 text-center text-white p-6 max-w-3xl mx-auto">
                             <h4 className="text-2xl font-black italic uppercase tracking-tight mb-2">{selectedVideo.title}</h4>
                             <p className="text-sm text-white/60">{selectedVideo.description}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
