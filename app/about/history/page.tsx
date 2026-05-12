'use client';

import React, { useState, useEffect } from 'react';
import AboutLayout from '@/components/AboutLayout';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import axios from 'axios';
import { Loader2, History, Sparkles } from 'lucide-react';

export default function HistoryPage() {
  const { t, lang } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/about/temple/history');
        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
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

  return (
    <AboutLayout
      title={localized?.title || (lang === 'mr' ? 'मंदिराचा इतिहास' : 'Temple History')}
      subtitle={localized?.heroSubtitle}
    >
      {!localized ? (
        <div className="text-center py-20">
          <History className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-medium italic">History content not found.</p>
        </div>
      ) : (
        <div className="space-y-10">

          {/* Intro Quote Box */}
          {localized.introQuote && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-orange-50/50 p-6 rounded-2xl border-l-4 border-primary/40"
            >
              <p className="text-secondary font-bold italic leading-relaxed text-sm md:text-base">
                "{localized.introQuote}"
              </p>
            </motion.div>
          )}

          {/* Section 1: Ancient Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded-full text-sm font-bold">1</span>
              <h2 className="text-xl md:text-2xl font-black text-secondary tracking-tight">
                {localized.section1Title || 'Ancient Context'}
              </h2>
            </div>

            <div className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line font-medium">
              {localized.section1Content}
            </div>

            {data.image && (
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <img
                  src={data.image}
                  alt="Temple"
                  className="w-full h-auto object-cover max-h-[400px]"
                />
              </div>
            )}
          </motion.div>

          {/* Section 2: Establishment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded-full text-sm font-bold">2</span>
              <h2 className="text-xl md:text-2xl font-black text-secondary tracking-tight">
                {localized.section2Title || 'Establishment'}
              </h2>
            </div>

            <div className="text-gray-600 leading-relaxed text-sm md:text-base font-medium">
              <ul className="space-y-2">
                {localized.section2Content?.split('\n').map((point: string, i: number) => (
                  point.trim() && <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Cards Row */}
            {localized.stats && localized.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {localized.stats.map((stat: any, i: number) => (
                  stat.label && stat.value && (
                    <div key={i} className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
                      <h4 className="text-[9px] font-black text-primary mb-1 uppercase tracking-wider">{stat.label}</h4>
                      <p className="text-xs font-black text-secondary">{stat.value}</p>
                    </div>
                  )
                ))}
              </div>
            )}
          </motion.div>

          {/* Modern Form Section */}
          {localized.modernTitle && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#5B463E] text-white p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="relative z-10 space-y-4">
                <h3 className="text-lg md:text-xl font-black tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  {localized.modernTitle}
                </h3>

                <div className="text-white/80 text-sm md:text-base font-medium space-y-2">
                  <ul className="space-y-2">
                    {localized.modernContent?.split('\n').map((point: string, i: number) => (
                      point.trim() && <li key={i} className="flex gap-2">
                        <span className="text-accent mt-1">+</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          )}

        </div>
      )}
    </AboutLayout>
  );
}