'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function WelcomeSection() {
  return (
    <section id="about" className="py-24 bg-[#fffdf5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#4a0404] mb-4">देवी महालक्ष्मीच्या निवासस्थानात आपले स्वागत आहे</h2>
          <p className="text-[#4a3728]/60 uppercase tracking-widest text-sm font-bold">1831 पासून मुंबईच्या हृदयातील एक पवित्र तीर्थस्थान</p>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img src="/devi.png" alt="Temple Interior" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#d4af37] rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-[#4a0404]">दिव्य कृपेचे मंदिर</h3>
            <p className="text-[#4a3728]/80 text-lg leading-relaxed">
              श्री महालक्ष्मी मंदिर मुंबईतील महालक्ष्मी येथे भुलाभाई देसाई रोडवर भव्यतेने विराजमान आहे. हे आदरणीय मंदिर देवी महालक्ष्मी यांना समर्पित आहे, ज्या देवी महाकाली व देवी महासरस्वती यांच्यासह मुख्य देवता म्हणून विराजमान आहेत — या तिन्ही एकत्र त्रिदेव म्हणून ओळखल्या जातात.
            </p>
            <p className="text-[#4a3728]/80 text-lg leading-relaxed">
              1831 मध्ये हिंदू व्यापारी धाकजी दादाजी यांनी बांधलेले, हे मंदिर जवळजवळ दोन शतके मुंबईच्या आध्यात्मिक जीवनाचा आधारस्तंभ आहे. कथेनुसार देवी महालक्ष्मीची मूर्ती हॉर्नबी व्हेलार्ड (आता हाजी अली कॉजवे) बांधकामादरम्यान समुद्रात सापडली होती.
            </p>
            <button className="bg-[#4a0404] hover:bg-[#300000] text-white py-4 px-8 rounded-lg font-bold transition-all flex items-center gap-3">
              संपूर्ण इतिहास वाचा <ArrowRight className="w-5 h-5 gold-text" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
