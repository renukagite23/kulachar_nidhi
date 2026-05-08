'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';

export default function FestivalsPage() {
    const { lang } = useLanguage();

    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // ✅ FETCH EVENTS
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events');

                if (!res.ok) {
                    throw new Error('Failed to fetch events');
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    setEvents([]);
                }
            } catch (error) {
                console.error('FETCH EVENTS ERROR:', error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <Navbar />

            <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">

                {/* HEADER */}
                <div className="text-center py-12 px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        {lang === 'mr'
                            ? 'सण आणि कार्यक्रम'
                            : 'Festivals & Events'}
                    </h1>

                    <p className="text-gray-500 mt-2 text-sm">
                        {lang === 'mr'
                            ? 'मंदिरातील येणारे आणि चालू कार्यक्रम पहा'
                            : 'Explore upcoming and ongoing temple events'}
                    </p>
                </div>

                {/* LOADING */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
                    </div>
                )}

                {/* EVENTS SECTION */}
                {!loading && (
                    <div className="max-w-6xl mx-auto px-4 pb-16">

                        {/* EMPTY STATE */}
                        {events.length === 0 && (
                            <p className="text-center text-gray-500 py-10">
                                {lang === 'mr'
                                    ? 'कोणतेही कार्यक्रम उपलब्ध नाहीत'
                                    : 'No events available'}
                            </p>
                        )}

                        {/* EVENTS */}
                        {events.map((event, index) => {

                            if (!event) return null;

                            return (
                                <motion.div
                                    key={event._id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    viewport={{ once: true }}
                                    className="border-b border-gray-300 py-8"
                                >

                                    <div className="flex flex-col md:flex-row gap-6 items-start">

                                        {/* TEXT CONTENT */}
                                        <div className="flex-1">

                                            {/* TITLE */}
                                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                                                {lang === 'mr'
                                                    ? event.title_mr || 'कार्यक्रम'
                                                    : event.title_en || 'Event'}
                                            </h2>

                                            {/* DESCRIPTION */}
                                            <p className="text-gray-700 leading-8 text-[15px]">
                                                {lang === 'mr'
                                                    ? event.desc_mr || 'वर्णन उपलब्ध नाही'
                                                    : event.desc_en || 'No description available'}
                                            </p>


                                            {/* BUTTON */}
                                            {/* <button className="mt-5 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition">
                                                {lang === 'mr'
                                                    ? 'तपशील पहा'
                                                    : 'View Details'}
                                            </button> */}

                                        </div>

                                        {/* IMAGE */}
                                        <div className="w-full md:w-[180px] flex justify-center">

                                            <img
                                                src={event.image || '/devi.png'}
                                                alt={event.title_en || 'event'}
                                                className="w-[180px] h-[180px] object-cover rounded-md shadow-md"
                                            />

                                        </div>

                                    </div>

                                </motion.div>
                            );
                        })}

                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}