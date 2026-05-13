'use client';

import React, { useState, useEffect } from 'react';
import AboutLayout from '@/components/AboutLayout';
import { MapPin, Train, Bus, Plane, Map, Loader2, Phone, Copy, Navigation, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ReachPage() {
  const { t, lang } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/about/temple/reach');
        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error('Error fetching reach details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const localized = data?.[lang === 'mr' ? 'marathi' : 'english'] || data?.english;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!localized) {
    return (
      <AboutLayout title={t('about.reach')}>
        <div className="text-center py-20 text-gray-400 font-medium italic">
          Reach details not available.
        </div>
      </AboutLayout>
    );
  }

  return (
    <AboutLayout title={t('about.reach')}>
      <div className="space-y-10">
        {/* Map Section */}
        {data.mapEmbedUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2.5rem] overflow-hidden h-[400px] border-4 border-white shadow-xl relative group"
          >
            <iframe
              src={data.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(localized.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary px-4 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-2 hover:bg-primary hover:text-white transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                {lang === 'mr' ? 'दिशा मिळवा' : 'Get Directions'}
              </a>
            </div>
          </motion.div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Temple Address Card */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-secondary tracking-tight">
                {lang === 'mr' ? 'मंदिराचा पत्ता' : 'Temple Address'}
              </h3>
            </div>

            <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base whitespace-pre-line">
              {localized.address}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-70">
                  {lang === 'mr' ? 'सीमाचिन्ह' : 'Landmark'}
                </p>
                <p className="text-xs md:text-sm font-black text-secondary">
                  {localized.landmark || '-'}
                </p>
              </div>

              <div className="space-y-1 text-right lg:text-left">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-70">
                  {lang === 'mr' ? 'जिल्हा' : 'District'}
                </p>
                <p className="text-xs md:text-sm font-black text-secondary">
                  {localized.district || '-'}
                </p>
              </div>
            </div>
          </section>

          {/* Spiritual Message Highlight */}
          <section className="bg-secondary text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden group flex flex-col justify-center">
            {/* Decorative Patterns */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full -ml-12 -mb-12 blur-xl" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent/80">
                  {lang === 'mr' ? 'आध्यात्मिक संदेश' : 'Spiritual Message'}
                </span>
              </div>

              <blockquote className="border-l-2 border-accent/30 pl-4 py-1">
                <p className="text-white font-bold text-sm md:text-base italic leading-relaxed tracking-wide">
                  "{lang === 'mr'
                    ? 'भक्ती म्हणजे केवळ प्रार्थना नाही, तर दैवी प्रकाशाच्या दिशेने झालेला आत्म्याचा प्रवास आहे. आई एकवीरा देवीच्या या पवित्र चरणांशी नतमस्तक होताना श्रद्धा तुमची मार्गदर्शक आणि भक्ती तुमची शक्ती होवो.'
                    : 'True devotion is not just a prayer, but a journey of the soul towards divine light. Let faith be your guide and devotion be your strength as you step into this sacred abode of Goddess Ekavira.'}"
                </p>
              </blockquote>
            </div>
          </section>
        </div>

        {/* Travel Guide Section */}
        <section className="bg-white p-6 md:p-10 rounded-3xl border border-border shadow-sm space-y-8">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-accent shadow-lg">
              <Bus className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-black text-secondary tracking-tight">
                {lang === 'mr' ? 'प्रवास मार्गदर्शक' : 'Travel Guide'}
              </h3>

              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                Transportation & Instructions
              </p>
            </div>
          </div>

          {/* Vertical Layout */}
          <div className="flex flex-col gap-6">

            {/* Transportation */}
            <div className="bg-orange-50/30 p-6 rounded-2xl border border-primary/10 hover:bg-orange-50/50 transition-colors">

              <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />

                {lang === 'mr'
                  ? 'वाहतूक सेवा'
                  : 'Transportation'}
              </h4>

              <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed whitespace-pre-line">
                {localized.transportation}
              </p>

            </div>

            {/* Travel Instructions */}
            <div className="bg-orange-50/30 p-6 rounded-2xl border border-primary/10 hover:bg-orange-50/50 transition-colors">

              <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />

                {lang === 'mr'
                  ? 'प्रवास सूचना'
                  : 'Travel Instructions'}
              </h4>

              <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed whitespace-pre-line">
                {localized.travelInstructions}
              </p>

            </div>

          </div>

        </section>
      </div>
    </AboutLayout>
  );
}
