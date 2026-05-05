'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationForm from '@/components/DonationForm';
import { useLanguage } from '@/lib/LanguageContext';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DonationPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-secondary">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none grayscale invert">
            <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover" />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">
                  {t('donation.badge')}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                {t('donation.title')}
              </h1>
              <p className="text-white/60 text-sm md:text-base font-medium max-w-2xl mx-auto">
                {t('donation.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Donation Form Section */}
        <section className="py-12 md:py-20 bg-background relative">
          <div className="max-w-7xl mx-auto px-4">
            <DonationForm />
          </div>
        </section>

        {/* Quote Section */}
        <section className="relative py-8 md:py-10 bg-gradient-to-br from-orange-200 via-orange-100 to-amber-100 overflow-hidden">

          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none grayscale">
            <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover scale-110" />
          </div>

          {/* Soft Glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/30 blur-3xl rounded-full" />

          <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-5"
            >

              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center shadow">
                  <Sparkles className="w-5 h-5 text-orange-600" />
                </div>
              </div>

              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 leading-[1.3] tracking-tight">
                {t('impact.quote')}
              </h2>

              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-0.5 bg-gray-300 rounded-full" />
                <p className="text-gray-500 font-semibold uppercase tracking-[0.2em] text-[11px]">
                  {t('hero.title_1')} {t('hero.title_2')}, {t('hero.info.place')}
                </p>
              </div>

              {/* Trust Name */}
              {/* <p className="text-orange-700 font-semibold uppercase tracking-[0.2em] text-[10px]">
                Shri Kulaswamini Ekavira Devi Mandir Trust
              </p> */}

            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
