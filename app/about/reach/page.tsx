'use client';

import React, { useState, useEffect } from 'react';
import AboutLayout from '@/components/AboutLayout';
import { MapPin, Train, Bus, Plane, Map, Loader2, Phone, Copy, Navigation } from 'lucide-react';
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
      <div className="space-y-12">
        {/* Map Section */}
        {data.mapEmbedUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2.5rem] overflow-hidden h-[450px] border-8 border-white shadow-2xl relative group"
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
          <div className="space-y-6">
            <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-4 text-primary">
                <MapPin className="w-6 h-6" />
                <h3 className="text-xl font-black text-secondary tracking-tight">{lang === 'mr' ? 'मंदिराचा पत्ता' : 'Temple Address'}</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                {localized.address}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">{lang === 'mr' ? 'सीमाचिन्ह' : 'Landmark'}</p>
                  <p className="text-sm font-bold text-secondary">{localized.landmark || '-'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">{lang === 'mr' ? 'जिल्हा' : 'District'}</p>
                  <p className="text-sm font-bold text-secondary">{localized.district || '-'}</p>
                </div>
              </div>
            </section>

            {data.english.contactInfo && (
              <section className="bg-secondary text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                  <h3 className="text-lg font-black text-accent flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    {lang === 'mr' ? 'संपर्क माहिती' : 'Contact Support'}
                  </h3>
                  <p className="text-white/90 font-bold text-xl tracking-tight">
                    {data.english.contactInfo}
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
              </section>
            )}
          </div>

          <div className="space-y-6">
            <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <Bus className="w-6 h-6" />
                <h3 className="text-xl font-black text-secondary tracking-tight">{lang === 'mr' ? 'प्रवास मार्गदर्शक' : 'Travel Guide'}</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-2">{lang === 'mr' ? 'वाहतूक सेवा' : 'Transportation'}</h4>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed whitespace-pre-line">{localized.transportation}</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-2">{lang === 'mr' ? 'प्रवास सूचना' : 'Travel Instructions'}</h4>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed whitespace-pre-line">{localized.travelInstructions}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AboutLayout>
  );
}
