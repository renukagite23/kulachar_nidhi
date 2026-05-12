'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

interface EventType {
  _id?: string;
  title_en: string;
  title_mr: string;
  date?: string;
  desc_en?: string;
  desc_mr?: string;
  image?: string;
}

export default function FestivalSpotlight() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');

        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await res.json();

        const eventsData = Array.isArray(data)
          ? data
          : Array.isArray(data.events)
          ? data.events
          : [];

        // Show only first 3 events
        setEvents(eventsData.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-primary font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em]">
              {t('festival.badge')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight">
            {t('festival.title')}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-2xl mx-auto">
            {t('festival.subtitle')}
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-16 text-gray-500 text-lg">
            {lang === 'mr' ? 'कार्यक्रम लोड होत आहेत...' : 'Loading events...'}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-lg">
            {lang === 'mr' ? 'कोणतेही कार्यक्रम उपलब्ध नाहीत.' : 'No events available.'}
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={event._id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={event.image || '/festival-placeholder.jpg'}
                      alt={lang === 'mr' ? event.title_mr : event.title_en}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Title on Image */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="text-xl font-bold text-white leading-snug">
                        {lang === 'mr' ? event.title_mr : event.title_en}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                      {(lang === 'mr' ? event.desc_mr : event.desc_en) ||
                        (lang === 'mr' 
                          ? 'या सुंदर उत्सवाच्या कार्यक्रमासह संस्कृती, भक्ती आणि एकत्रपणा साजरा करा.'
                          : 'Celebrate culture, devotion, and togetherness with this beautiful festival event.')}
                    </p>

                    {/* Button */}
                    <Link
                      href="/festivals"
                      className="inline-flex items-center gap-2 text-primary hover:text-orange-600 font-bold text-sm transition-all duration-300"
                    >
                      {t('festival.explore')}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Button */}
            <div className="flex justify-center mt-14">
              <Link
                href="/festivals"
                className="bg-primary hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105"
              >
                {t('festival.view')}
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}