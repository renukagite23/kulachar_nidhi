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
        <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none grayscale invert">
            <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover" />
          </div>

          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-6 bg-[#FFF7ED] p-8 rounded-2xl border border-gray-200 shadow-md"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-[1.3] tracking-tight">
                {t('impact.quote')}
              </h2>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
