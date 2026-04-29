'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function TrusteesPage() {
  const { t } = useLanguage();

  const trustees = [
    {
      name: t('trustees.names.gokhale'),
      role: t('trustees.roles.president_judge'),
      image: '/images/dummy1.png',
      large: true
    },
    {
      name: t('trustees.names.deshpande'),
      role: t('trustees.roles.vice_president_judge'),
      image: '/images/dummy2.png',
      large: true
    },
    {
      name: t('trustees.names.kulkarni_r'),
      role: t('trustees.roles.trustee'),
      image: '/images/dummy1.png'
    },
    {
      name: t('trustees.names.joshi'),
      role: t('trustees.roles.trustee'),
      image: '/images/dummy1.png'
    },
    {
      name: t('trustees.names.patwardhan'),
      role: t('trustees.roles.trustee'),
      image: '/images/dummy1.png'
    }
  ];

  const trusteesRow3 = [
    {
      name: t('trustees.names.kulkarni_s'),
      role: t('trustees.roles.trustee'),
      image: '/images/dummy2.png'
    },
    {
      name: t('trustees.names.bhave'),
      role: t('trustees.roles.trustee'),
      image: '/images/dummy1.png'
    },
    {
      name: t('trustees.names.ranade'),
      role: t('trustees.roles.trustee'),
      image: '/images/dummy1.png'
    }
  ];

  const administrator = {
    name: t('trustees.names.sane'),
    role: t('trustees.roles.executive_officer'),
    image: '/images/dummy1.png'
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black text-[#A02020] mb-4"
            >
              {t('trustees.title')}
            </motion.h1>
            <div className="h-1 w-24 bg-[#A02020]/20 mx-auto rounded-full" />
          </div>

          <div className="space-y-20">
            {/* Row 1 - 2 Trustees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-4xl mx-auto">
              {trustees.slice(0, 2).map((item, idx) => (
                <TrusteeCard key={idx} {...item} />
              ))}
            </div>

            {/* Row 2 - 3 Trustees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto pb-12 border-b border-gray-100">
              {trustees.slice(2, 5).map((item, idx) => (
                <TrusteeCard key={idx} {...item} />
              ))}
            </div>

            {/* Row 3 - 3 Trustees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto pb-12 border-b border-gray-100">
              {trusteesRow3.map((item, idx) => (
                <TrusteeCard key={idx} {...item} />
              ))}
            </div>

            {/* Row 4 - 1 Administrator */}
            <div className="max-w-xs mx-auto">
              <TrusteeCard {...administrator} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function TrusteeCard({ name, role, image, large = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center group"
    >
      <div className={`relative mx-auto mb-6 ${large ? 'w-48 h-48 md:w-56 md:h-56' : 'w-40 h-40 md:w-44 md:h-44'}`}>
        <div className="absolute inset-0 rounded-full border-4 border-white shadow-xl overflow-hidden ring-1 ring-gray-200 bg-muted">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
          />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-gray-500 font-medium whitespace-pre-line max-w-[200px] mx-auto">
          {role}
        </p>
      </div>
    </motion.div>
  );
}
