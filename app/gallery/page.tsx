'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera, ZoomIn, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function GalleryPage() {
    const { t } = useLanguage();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/gallery', { cache: 'no-store' });
                const data = await res.json();
                setImages(data);
            } catch (err) {
                console.error('Failed to fetch gallery images', err);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section - EXACTLY matching About Us format */}
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
                            {t('nav.gallery')}
                        </motion.h1>
                        <p className="text-accent font-bold uppercase tracking-[0.3em] text-sm italic">
                            Divine Collection of Sacred Moments
                        </p>
                    </div>
                </section>

                <section className="py-20 md:py-32 bg-[#FFFDF9] relative">
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        
                        <div className="text-center mb-16">
                            <div className="flex justify-center items-center gap-2 mb-4">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                    Sacred Moments
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
                                {t('gallery.title')}
                            </h2>
                        </div>
                        
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 w-full col-span-full">
                                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs italic">Loading Divine Gallery...</p>
                            </div>
                        ) : images.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                                {images.map((img, i) => (
                                    <motion.div
                                        key={img._id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                        viewport={{ once: true }}
                                        className="relative group cursor-pointer"
                                        onClick={() => setSelectedImage(img.imageUrl)}
                                    >
                                        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border-8 border-white group-hover:shadow-2xl transition-all duration-500 aspect-[4/3]">
                                            <img
                                                src={img.imageUrl}
                                                alt={img.caption || `Temple Gallery ${i + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-secondary scale-50 group-hover:scale-100 transition-transform duration-500">
                                                    <ZoomIn className="w-6 h-6" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Caption if exists */}
                                        {img.caption && (
                                            <div className="mt-4 px-2">
                                                <p className="text-xs font-black text-secondary uppercase tracking-widest italic">{img.caption}</p>
                                            </div>
                                        )}

                                        {/* Decorative corner */}
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-accent/20 rounded-br-2xl group-hover:border-accent transition-colors duration-500" />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 w-full col-span-full">
                                <ImageIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs italic">No images in the gallery yet.</p>
                            </div>
                        )}

                        {/* End Message */}
                        <div className="mt-24 text-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-muted/50 border border-border"
                            >
                                <Sparkles className="w-5 h-5 text-primary" />
                                <p className="text-xs font-black text-secondary uppercase tracking-[0.2em]">{t('gallery.festival_desc') || "More moments being captured..."}</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Background Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover grayscale" />
                    </div>
                </section>
            </main>

            {/* Image Zoom Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-secondary/95 backdrop-blur-md p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative max-w-5xl w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Zoomed View"
                                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-4 border-white/10"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}