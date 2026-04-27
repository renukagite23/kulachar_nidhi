'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { Clock, HandHeart, MapPin, Phone, Calendar, ArrowRight } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  const infoItems = [
    { icon: Clock, label: 'दर्शन वेळा', value: 'सकाळी 6:00 - रात्री 10:00' },
    { icon: Calendar, label: 'पुढील आरती', value: 'धूप आरती @ 6:15 PM' },
    { icon: Phone, label: 'संपर्क', value: '022-2351 4732' },
    { icon: MapPin, label: 'स्थान', value: 'महालक्ष्मी, मुंबई' },
  ];

  return (
    <div className="relative h-[75vh] min-h-[600px] flex flex-col justify-center overflow-hidden bg-background">
      {/* Background with Professional Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/devi.png"
          alt="Temple Hero"
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Hero Content - Aligned Left for Professional Look */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">|| ॐ श्री महालक्ष्म्यै नम: ||</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-secondary tracking-tight leading-[1.1] mb-6">
            श्री महालक्ष्मी <br />
            <span className="text-primary">मंदिर ट्रस्ट</span>
          </h1>

          <p className="text-secondary/70 text-lg md:text-xl font-medium mb-10 leading-relaxed">
            मुंबईतील सर्वात आदरणीय हिंदू मंदिरांपैकी एक. देवी महालक्ष्मी यांच्या आशीर्वादाने धन, सौभाग्य व समृद्धीची प्रचिती घ्या.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="#donations" className="spiritual-button !px-8 !py-4 text-base w-full sm:w-auto shadow-lg shadow-primary/20">
              ऑनलाइन दान करा <ArrowRight className="w-4 h-4 ml-1" />
            </a>
            <button className="spiritual-button-outline !px-8 !py-4 text-base w-full sm:w-auto hover:bg-white">
              दर्शन वेळ पहा
            </button>
          </div>
        </motion.div>
      </div>

      {/* Quick Info Bar - Floating & Compact */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-full max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {infoItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 ${index !== infoItems.length - 1 ? 'md:border-r border-border/50' : ''} px-2`}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{item.label}</span>
                <span className="text-[13px] font-bold text-secondary truncate">{item.value}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
