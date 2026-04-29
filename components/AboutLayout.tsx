'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

interface AboutLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  bannerImage?: string;
}

export default function AboutLayout({
  children,
  title,
  subtitle,
  bannerImage = "/images/bg2.png"
}: AboutLayoutProps) {
  const { t } = useLanguage();
  const displaySubtitle = subtitle || t('common.mumbai_address');
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />

      {/* Top Banner */}
      <section className="relative h-48 md:h-64 flex items-center justify-center overflow-hidden">
        <img
          src={bannerImage}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-white mb-2"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-accent text-xs md:text-sm font-black uppercase tracking-[0.3em]"
          >
            {displaySubtitle}
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Content (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8"
            >
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-border min-h-[500px]">
                {children}
              </div>
            </motion.div>

            {/* Sidebar (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4"
            >
              <Sidebar />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
