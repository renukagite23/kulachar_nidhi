'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { Clock, HandHeart, MapPin, Phone, Calendar } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  const infoItems = [
    { icon: Clock, label: 'दर्शन वेळा', value: 'सकाळी 6:00 - रात्री 10:00' },
    { icon: Calendar, label: 'पुढील आरती', value: 'सायंकाळी धूप आरती @ 6:15 PM' },
    { icon: Phone, label: 'संपर्क', value: '022-2351 4732' },
    { icon: MapPin, label: 'स्थान', value: 'श्री महालक्ष्मी मंदिर ट्रस्ट, मुंबई' },
  ];

  return (
    <div className="relative h-[85vh] flex flex-col justify-end overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/devi.png"
          alt="Temple Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 mandir-gradient" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-24 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="italic gold-text text-lg md:text-xl font-medium block">|| ॐ श्री महालक्ष्म्यै नम: ||</span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-tight">
            श्री महालक्ष्मी मंदिर
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            मुंबईतील सर्वात आदरणीय हिंदू मंदिरांपैकी एक, जे देवी महालक्ष्मी यांना समर्पित आहे — धन, सौभाग्य व समृद्धीची दिव्य प्रदायिनी.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
            <button className="spiritual-button-gold w-full md:w-auto">
              <Clock className="w-5 h-5" /> दर्शन वेळा
            </button>
            <a href="#donations" className="spiritual-button-outline w-full md:w-auto">
              <HandHeart className="w-5 h-5" /> ऑनलाइन दान
            </a>
          </div>
        </motion.div>
      </div>

      {/* Quick Info Bar */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {infoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 text-white"
            >
              <item.icon className="w-8 h-8 gold-text flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest gold-text font-bold">{item.label}</span>
                <span className="text-sm font-bold truncate">{item.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
