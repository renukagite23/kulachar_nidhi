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

        <section className="py-14 md:py-16 bg-gradient-to-b from-white via-orange-50 to-amber-50 relative overflow-hidden">

          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,153,0,0.15),_transparent_70%)] pointer-events-none"></div>

          {/* Floating Blur Shapes */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 left-1/3 w-32 h-32 bg-amber-300 rounded-full blur-2xl opacity-20"></div>
          <div className="absolute top-1/2 right-10 w-36 h-36 bg-orange-300 rounded-full blur-3xl opacity-20"></div>

          {/* Samai */}
          <img
            src="/images/samai.png"
            alt="samai"
            className="absolute bottom-0 right-10 w-40 opacity-10 pointer-events-none"
          />

          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">

            {/* Heading */}
            <p className="text-sm text-primary font-semibold mb-2">
              🙏 दान सेवा
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              तुमच्या दानातून चालते मंदिराची सेवा
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-sm md:text-base">
              तुमच्या प्रत्येक योगदानामुळे मंदिरातील पूजा, अन्नदान आणि धार्मिक कार्यक्रम
              सुरळीतपणे पार पडतात. चला, या पवित्र सेवेत सहभागी व्हा.
            </p>

            {/* Donation Card */}
            <div className="bg-white/80 backdrop-blur-md border border-orange-100 rounded-xl shadow-md p-6 md:p-7 hover:shadow-lg transition">

              {/* Amount Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {["₹101", "₹501", "₹1100", "₹2100"].map((amt) => (
                  <button
                    key={amt}
                    className="px-4 py-1.5 text-sm rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
                  >
                    {amt}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <a
                href="/donation"
                className="inline-block bg-primary text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-orange-600 transition transform hover:scale-105"
              >
                दान करा →
              </a>

              {/* Trust Indicators */}
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <span>✔ सुरक्षित पेमेंट</span>
                <span>✔ 80G कर सवलत</span>
                <span>✔ विश्वसनीय ट्रस्ट</span>
              </div>

            </div>
          </div>
        </section>

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
