'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WelcomeSection from '@/components/WelcomeSection';
import AartiSchedule from '@/components/AartiSchedule';
import GallerySection from '@/components/GallerySection';
import DonationForm from '@/components/DonationForm';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fffdf5]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About/Welcome Section */}
        <WelcomeSection />

        {/* Aarti Schedule Section */}
        <AartiSchedule />

        {/* Donation Gateway Section */}
        <section id="donations" className="py-24 bg-[#fffdf5] relative overflow-hidden">
          {/* Background Decorative */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-0">
            <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover scale-150 rotate-12" />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-[#4a0404] mb-4 tracking-tight">ऑनलाइन देणगी / दान</h2>
              <p className="text-[#4a3728]/60 uppercase tracking-widest text-sm font-bold">तुमचे छोटे योगदान आपल्या आध्यात्मिक वारशाचे रक्षण करते</p>
              <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-4" />
            </div>

            <DonationForm />
          </div>
        </section>

        {/* Gallery Section */}
        <GallerySection />

        {/* Impact Section / Quote */}
        <section className="py-24 maroon-bg text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <span className="gold-text text-6xl font-serif block mb-8">“</span>
            <h2 className="text-3xl md:text-5xl font-black italic leading-tight mb-8">
              श्रद्धेने दिलेले प्रत्येक दान, आपल्या संस्कृतीच्या जतनासाठीचा एक भक्कम पाया आहे.
            </h2>
            <div className="w-20 h-1 bg-[#d4af37] mx-auto" />
            <p className="mt-8 text-white/60 font-bold uppercase tracking-[0.2em] text-xs">कुलदैवत ट्रस्ट, मुंबई</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
