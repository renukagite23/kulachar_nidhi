'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Sparkles, Camera, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function GalleryPage() {
    const { t } = useLanguage();

    const images = [
        "/devi.png",
        "/images/diwali_lakshmi.png",
        "/images/sharad_navratri.png",
        "/images/akshaya_tritiya.png",
        "/images/devi2about.png",
        "/images/devi3.png",
        "/devi.png",
        "/images/diwali_lakshmi.png",
        "/images/sharad_navratri.png",
    ];

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
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {images.map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className="relative group"
                                >
                                    <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border-8 border-white group-hover:shadow-2xl transition-all duration-500 aspect-[4/3]">
                                        <img
                                            src={img}
                                            alt={`Temple Gallery ${i + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                        
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-secondary scale-50 group-hover:scale-100 transition-transform duration-500">
                                                <ZoomIn className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative corner */}
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-accent/20 rounded-br-2xl group-hover:border-accent transition-colors duration-500" />
                                </motion.div>
                            ))}
                        </div>

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

            <Footer />
        </div>
    );
}