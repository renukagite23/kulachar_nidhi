'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FestivalsPage() {
    const [festivals, setFestivals] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await fetch('/api/events');
            const data = await res.json();
            setFestivals(data);
        };

        fetchEvents();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#FFFDF9]">
            <Navbar />

            <main className="flex-grow">
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4">

                        <h1 className="text-4xl font-black text-center mb-10">
                            Festivals & Events
                        </h1>

                        <div className="flex flex-wrap justify-center gap-6">
                            {festivals.map((fest) => (
                                <motion.div
                                    key={fest._id}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden w-[300px]"
                                >
                                    <img
                                        src={fest.image}
                                        className="h-40 w-full object-cover"
                                    />

                                    <div className="p-4">
                                        <div className="flex items-center gap-2 text-xs text-primary mb-2">
                                            <CalendarDays className="w-4 h-4" />
                                            {new Date(fest.startDate).toLocaleDateString()}
                                        </div>

                                        <h3 className="font-bold text-secondary">
                                            {fest.name}
                                        </h3>

                                        <p className="text-sm text-muted-foreground mt-2">
                                            {fest.description}
                                        </p>

                                        <Link href={`/festivals/${fest.slug}`}>
                                            <button className="mt-4 spiritual-button w-full text-xs">
                                                View Details
                                            </button>
                                        </Link>
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