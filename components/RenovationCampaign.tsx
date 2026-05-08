'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RenovationCampaign() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 bg-gradient-to-b from-orange-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              {t('renovation.badge')}
            </span>

            <h4
              className="text-4xl md:text-3xl font-bold text-gray-900 leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: t('renovation.title') }}
            />

            <p className="text-gray-700 text-lg leading-8 mb-6">
              {t('renovation.desc')}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl">
                  🛕
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {t('renovation.features.plan_title')}
                  </h4>
                  <p className="text-gray-600">
                    {t('renovation.features.plan_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl">
                  🏠
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {t('renovation.features.stay_title')}
                  </h4>
                  <p className="text-gray-600">
                    {t('renovation.features.stay_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl">
                  🤝
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {t('renovation.features.support_title')}
                  </h4>
                  <p className="text-gray-600">
                    {t('renovation.features.support_desc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/donation"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 inline-block"
              >
                {t('renovation.cta_donate')}
              </Link>

              <Link
                href="/about/history"
                className="border border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-block"
              >
                {t('renovation.cta_more')}
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500 italic">
              {t('renovation.donor_note')}
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* MAIN IMAGE */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white ">
              <img
                src="/mandir.jpg"
                alt="Ekveera Devi Temple"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000';
                }}
              />
            </div>

            {/* FLOATING CARD */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 w-64 border border-orange-100 hidden md:block"
            >
              <h4 className="text-sm font-bold text-gray-900 mb-2">
                {t('renovation.floating.title')}
              </h4>

              <p className="text-gray-600 text-sm leading-6 mb-4">
                {t('renovation.floating.desc')}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">2026</p>
                  <p className="text-xs text-gray-500">{t('renovation.floating.target_year')}</p>
                </div>

                <div className="h-10 w-px bg-gray-200"></div>

                <div className="text-center">
                  <p className="text-xl text-orange-600">🙏</p>
                  <p className="text-xs text-gray-500">{t('renovation.floating.devotee_support')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
