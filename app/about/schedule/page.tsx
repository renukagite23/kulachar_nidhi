'use client';

import React, { useState, useEffect } from 'react';
import AboutLayout from '@/components/AboutLayout';
import {
  Clock, Sparkles, Loader2, Calendar,
  Sun, Moon, Sunrise, Sunset, Flame, Bell, Monitor
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import axios from 'axios';
import { motion } from 'framer-motion';

const IconMap: any = {
  Clock, Sparkles, Calendar, Sun, Moon, Sunrise, Sunset, Flame, Bell, Monitor
};

export default function SchedulePage() {
  const { t, lang } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/about/temple/daily-schedule');
        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const localized = data?.[lang === 'mr' ? 'marathi' : 'english'];
  const activeSchedules = localized?.schedules?.filter((s: any) => s.isActive).sort((a: any, b: any) => a.order - b.order) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AboutLayout
      title={localized?.title || t('about.schedule')}
      subtitle={localized?.subtitle}
    >
      <div className="space-y-10">
        {/* Intro Text */}
        <p className="text-gray-600 leading-relaxed font-medium">
          {lang === 'mr'
            ? 'मंदिरातील दैनंदिन कार्यक्रम देवीच्या उपासनेसाठी अत्यंत महत्त्वाचे आहेत. भक्तांनी या वेळेनुसार दर्शनाचा लाभ घ्यावा.'
            : 'The daily temple schedule is vital for the worship of the Goddess. Devotees should take advantage of darshan according to these timings.'}
        </p>

        {/* Schedule List */}
        <div className="space-y-4">
          {activeSchedules.length === 0 ? (
            <div className="text-center py-10 text-gray-400 font-medium italic border-2 border-dashed border-gray-50 rounded-2xl">
              {lang === 'mr' ? 'वेळापत्रक उपलब्ध नाही.' : 'Daily schedule not available.'}
            </div>
          ) : (
            activeSchedules.map((item: any, index: number) => {
              const IconComponent = IconMap[item.icon] || Clock;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={index}
                  className="flex items-center gap-6 p-5 rounded-2xl border border-gray-100 bg-white hover:border-primary/30 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-orange-50/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-accent font-black text-[10px] uppercase tracking-[0.2em] mb-1">{item.time}</p>
                    <h4 className="text-secondary font-bold text-lg leading-tight">{item.heading}</h4>
                    {item.description && (
                      <p className="text-xs text-gray-400 font-medium mt-1">{item.description}</p>
                    )}
                  </div>
                  <Clock className="w-5 h-5 text-gray-200 hidden md:block" />
                </motion.div>
              );
            })
          )}
        </div>

        {/* Special Note Box */}
        <div className="p-8 rounded-3xl bg-orange-50/30 border border-orange-100/50">
          <h3 className="text-base font-black text-secondary flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            {lang === 'mr' ? 'विशेष सूचना' : 'Special Note'}
          </h3>
          <ul className="space-y-3">
            <li className="text-sm text-gray-600 font-medium flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              {lang === 'mr' ? 'सण आणि उत्सवाच्या दिवशी वेळेत बदल होऊ शकतो.' : 'Timings may change on festival days.'}
            </li>
            <li className="text-sm text-gray-600 font-medium flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              {lang === 'mr' ? 'नवरात्रीच्या काळात मंदिर २४ तास उघडे राहते.' : 'The temple remains open 24 hours during Navratri.'}
            </li>
          </ul>
        </div>
      </div>
    </AboutLayout>
  );
}
