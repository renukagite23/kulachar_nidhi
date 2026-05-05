'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FestivalDetail() {
    const params = useParams();
    const slug = params.slug as string;

    const [event, setEvent] = useState<any>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const res = await fetch('/api/events');
            const data = await res.json();

            const found = data.find((e: any) => e.slug === slug);
            setEvent(found);
        };

        fetchEvent();
    }, [slug]);

    if (!event) return <div className="p-20 text-center">Loading...</div>;

    return (
        <div className="bg-[#FFFDF9] min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow p-10 max-w-4xl mx-auto">
                <h1 className="text-3xl font-black mb-4">{event.name}</h1>

                <img
                    src={event.image}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                />

                <p className="text-muted-foreground mb-4">
                    {event.description}
                </p>

                <p className="text-sm">
                    📅 {new Date(event.startDate).toDateString()} -{' '}
                    {new Date(event.endDate).toDateString()}
                </p>

                <p className="text-sm mt-2">📍 {event.location}</p>
            </main>

            <Footer />
        </div>
    );
}