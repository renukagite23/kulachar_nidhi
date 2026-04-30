'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CalendarDays, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

export default function FestivalDetail() {
    const { t } = useLanguage();
    const params = useParams();
    const slug = params?.slug as string;

    // Available slugs to prevent errors if non-existent slug is accessed
    const validSlugs = ['tripuri', 'kojagiri'];
    
    if (!validSlugs.includes(slug)) {
        return (
            <div className="bg-[#FFFDF9] min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-secondary mb-4">Festival not found</h2>
                        <Link href="/festivals" className="spiritual-button inline-flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Events
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const fest = {
        title: t(`festival.${slug}`),
        subtitle: t(`festival.${slug}_subtitle`),
        date: t(`festival.${slug}_date`),
        image: slug === 'tripuri' ? "/devi.png" : "/images/devi2about.png",
        content: t(`festival.${slug}_content`)
    };

    if (!fest) {
        return (
            <div className="bg-[#FFFDF9] min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-secondary mb-4">Festival not found</h2>
                        <Link href="/festivals" className="spiritual-button inline-flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Events
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-[#FFFDF9] min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-10 pb-6 md:pt-12 md:pb-8 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <img src="/devi.png" alt="Decorative" className="w-full h-full object-cover" />
                </div>
                
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <Link href="/festivals" className="inline-flex items-center text-sm font-semibold text-primary mb-4 hover:opacity-80 transition-opacity">
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t('common.back_to_events')}
                    </Link>
                    
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-3 h-3 text-primary" />
                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                    {t('festival.badge')}
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-4xl font-black text-secondary tracking-tight mb-3 leading-tight">
                                {fest.title}
                            </h1>
                            <p className="text-sm md:text-base text-muted-foreground mb-4">
                                {fest.subtitle}
                            </p>
                            
                            <div className="flex items-center gap-2 bg-white/50 border border-border/50 py-2 px-4 rounded-full inline-flex shadow-sm">
                                <CalendarDays className="w-4 h-4 text-primary" />
                                <span className="font-bold text-secondary text-xs">{fest.date}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative h-[180px] md:h-[250px] rounded-3xl overflow-hidden shadow-2xl border border-border/50"
                        >
                            <img
                                src={fest.image}
                                alt={fest.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 bg-white flex-1 mb-8">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-secondary mb-3">{fest.title}</h2>
                        
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base text-justify">
                            {fest.content}
                        </p>
                        
                        {/* A thin divider line to match the second screenshot layout where festivals are separated by a line */}
                        <div className="h-px bg-border/50 w-full mt-12"></div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}