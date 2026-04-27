'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WelcomeSection from '@/components/WelcomeSection';
import AartiSchedule from '@/components/AartiSchedule';
import GallerySection from '@/components/GallerySection';
import DonationForm from '@/components/DonationForm';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function Home() {
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

        {/* Donation Gateway Section */}
        <section id="donations" className="py-12 md:py-16 bg-background relative overflow-hidden">
          {/* Background Decorative */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none -z-0">
            <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover scale-150 rotate-12" />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-primary fill-primary" />
                <span className="text-primary font-black text-[10px] uppercase tracking-[0.2em]">पवित्र दान</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight">ऑनलाइन देणगी / दान</h2>
              <p className="text-muted-foreground text-xs font-medium mt-2">तुमचे योगदान आपल्या आध्यात्मिक वारशाचे रक्षण करते</p>
            </div>

            <DonationForm />
          </div>
        </section>

        {/* Gallery Section */}
        <GallerySection />

        {/* Impact Section / Quote - Now in Saffron for High Contrast */}
        <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
          {/* Decorative Pattern */}
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
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-[#C2410C]/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#C2410C]" />
                </div>
              </div>

              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 leading-[1.3] tracking-tight">
                “श्रद्धेने दिलेले प्रत्येक दान, आपल्या संस्कृतीच्या जतनासाठीचा एक भक्कम पाया आहे.”
              </h2>

              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-0.5 bg-gray-300 rounded-full" />
                <p className="text-gray-500 font-semibold uppercase tracking-[0.2em] text-[11px]">
                  श्री महालक्ष्मी मंदिर ट्रस्ट, मुंबई
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
