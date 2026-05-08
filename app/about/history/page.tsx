'use client';

import React from 'react';
import AboutLayout from '@/components/AboutLayout';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function HistoryPage() {
  const { t } = useLanguage();

  return (
    <AboutLayout 
      title={t('about_history.title')} 
      bannerImage="/images/bg2.png"
    >

      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12">

        {/* Intro Quote */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary"
        >
          <p className="text-secondary font-semibold italic leading-relaxed">
            {t('about_history.intro_quote')}
          </p>
        </motion.section>

        {/* Section 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-black text-secondary flex items-center gap-3">
            <span className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-xl text-lg font-bold">1</span>
            {t('about_history.section1.title')}
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {t('about_history.section1.p1')}
          </p>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {t('about_history.section1.p2')}
          </p>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {t('about_history.section1.p3')}
          </p>

          <img
            src="/devi.png"
            alt="Temple"
            className="w-full h-80 object-cover rounded-2xl shadow-md"
          />
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-black text-secondary flex items-center gap-3">
            <span className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-xl text-lg font-bold">2</span>
            {t('about_history.section2.title')}
          </h2>

          <ul className="space-y-3 text-gray-600 text-sm md:text-base">
            <li>• {t('about_history.section2.list1')}</li>
            <li>• {t('about_history.section2.list2')}</li>
            <li>• {t('about_history.section2.list3')}</li>
            <li>• {t('about_history.section2.list4')}</li>
          </ul>

          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: t('about_history.cards.establishment'), value: t('about_history.cards.establishment_val') },
              { title: t('about_history.cards.renovation'), value: t('about_history.cards.renovation_val') },
              { title: t('about_history.cards.land'), value: t('about_history.cards.land_val') },
              { title: t('about_history.cards.location'), value: t('about_history.cards.location_val') },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-muted rounded-xl border text-center">
                <h4 className="text-xs font-bold text-primary mb-1">{item.title}</h4>
                <p className="text-sm font-semibold text-secondary">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Modern Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary text-white p-8 rounded-3xl relative overflow-hidden"
        >
          <div className="relative z-10 space-y-4">
            <h3 className="text-xl md:text-2xl font-black text-accent">
              {t('about_history.modern.title')}
            </h3>

            <ul className="text-white/80 text-sm md:text-base space-y-2">
              <li>• {t('about_history.modern.list1')}</li>
              <li>• {t('about_history.modern.list2')}</li>
              <li>• {t('about_history.modern.list3')}</li>
            </ul>
          </div>

          <img
            src="/devi.png"
            alt="icon"
            className="absolute right-4 top-4 w-32 opacity-10 brightness-0 invert"
          />
        </motion.section>

      </div>
    </AboutLayout>
  );
}