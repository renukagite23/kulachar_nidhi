'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { CalendarDays, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function FestivalsPage() {
    const { t } = useLanguage();

    const festivals = [
        {
            name: "Sharadiya Navaratri Ustav",
            date: "September / October",
            desc: "Nine days of devotion and celebration",
            image: "/images/sharad_navratri.png"
        },
        {
            name: "Diwali Lakshmi Poojan",
            date: "October / November",
            desc: "Festival of lights seeking wealth and prosperity",
            image: "/images/diwali_lakshmi.png"
        },
        {
            name: "Akshaya Tritiya",
            date: "April / May",
            desc: "Holy day for new beginnings and unending prosperity",
            image: "/images/akshaya_tritiya.png"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#FFFDF9]">

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
                            {t('nav.festivals')}
                        </motion.h1>
                        <p className="text-accent font-bold uppercase tracking-[0.3em] text-sm italic">
                            Celebrate the Divine Grace of Mahalakshmi
                        </p>
                    </div>
                </section>

                <section className="py-20 bg-transparent relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 relative z-10">

                        {/* Cards */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {festivals.map((fest, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition overflow-hidden"
                                >
                                    {/* Image */}
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={fest.image}
                                            className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-2">
                                            <CalendarDays className="w-4 h-4" />
                                            {fest.date}
                                        </div>

                                        <h3 className="text-lg font-bold text-secondary">
                                            {fest.name}
                                        </h3>

                                        <p className="text-sm text-muted-foreground mt-2">
                                            {fest.desc}
                                        </p>

                                        <button className="mt-4 spiritual-button w-full text-xs">
                                            Book Participation
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}