'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WelcomeSection from '@/components/WelcomeSection';
import AartiSchedule from '@/components/AartiSchedule';
import GallerySection from '@/components/GallerySection';
import DonationForm from '@/components/DonationForm';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import FestivalSpotLight from '@/components/FestivalSpotLight';

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About/Welcome Section */}
        <WelcomeSection />

        {/* Aarti Schedule Section */}
        <AartiSchedule />



        {/* Gallery Section */}
        <GallerySection />
        <FestivalSpotLight />



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
              <p className="text-orange-700 font-semibold uppercase tracking-[0.2em] text-[10px]">
                श्री महालक्ष्मी मंदिर ट्रस्ट, मुंबई
              </p>

            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
