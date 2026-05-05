'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CalendarDays, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';

export default function FestivalSpotlight() {
  const { t } = useLanguage();
  const [festivals, setFestivals] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        // Filter upcoming events and take first 2
        const now = new Date();
        const upcoming = data
          .filter((e: any) => new Date(e.endDate) >= now)
          .slice(0, 2);
        setFestivals(upcoming);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section id="festivals" className="py-16 md:py-24 bg-background relative overflow-hidden">

      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <img src="/devi.png" alt="Decorative" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              {t('festival.badge')}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-secondary tracking-tight">
            {t('festival.title')}
          </h2>

          <p className="text-muted-foreground text-sm md:text-base mt-3 max-w-2xl mx-auto">
            {t('festival.subtitle')}
          </p>
        </div>

        {/* Festival Cards - Centered */}
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {festivals.map((fest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl border border-border shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden w-full md:w-[calc(50%-1rem)] max-w-sm"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={fest.image}
                  alt={fest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-primary font-bold mb-2 uppercase tracking-wider">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(fest.startDate).toLocaleDateString()}
                </div>

                <h3 className="text-xl font-black text-secondary group-hover:text-primary transition-colors duration-300 line-clamp-1">
                  {fest.name}
                </h3>

                <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                  {fest.description}
                </p>

                <div className="mt-4 pt-4 border-t border-border/50">
                  <Link href="/festivals" className="inline-flex items-center text-xs font-black text-secondary hover:text-primary transition-colors gap-2">
                    {t('festival.more_info')} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/festivals" className="spiritual-button !px-10 !py-4 shadow-xl shadow-primary/20">
            {t('festival.view')} <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}