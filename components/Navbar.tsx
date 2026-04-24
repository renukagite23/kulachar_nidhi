'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Languages, Phone, Clock, MapPin, Menu, X, HandHeart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="hidden md:block bg-[#4a0404] text-white/80 py-2 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs font-medium">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 italic gold-text">|| ॐ श्री महालक्ष्म्यै नम: ||</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 gold-text" /> 022-2351 4732</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 gold-text" /> दर्शन: सकाळी 6:00 - रात्री 10:00</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 gold-text" /> श्री महालक्ष्मी मंदिर ट्रस्ट, मुंबई</span>
            <button
              onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
              className="flex items-center gap-1.5 hover:text-white transition-colors border-l border-white/20 pl-6"
            >
              <Languages className="w-3.5 h-3.5 gold-text" />
              {language === 'en' ? 'मराठी' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-[#4a0404] md:bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-20 md:h-24">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#800000] rounded-lg flex items-center justify-center p-2 shadow-lg">
                  <img src="/devi.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold text-[#4a0404] leading-tight md:block hidden">श्री महालक्ष्मी मंदिर</span>
                  <span className="text-lg md:text-xl font-bold text-white leading-tight md:hidden">श्री महालक्ष्मी मंदिर</span>
                  <span className="text-[10px] md:text-xs text-[#d4af37] font-bold uppercase tracking-widest">मुंबई, महाराष्ट्र</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-[#4a3728] hover:text-[#800000] font-bold transition-colors px-2 py-1 border-b-2 border-transparent hover:border-[#d4af37]">
                {t.nav.home}
              </Link>
              <Link href="#about" className="text-[#4a3728] hover:text-[#800000] font-bold transition-colors px-2 py-1">
                परिचय
              </Link>
              <Link href="#darshan" className="text-[#4a3728] hover:text-[#800000] font-bold transition-colors px-2 py-1">
                दर्शन
              </Link>
              <Link href="#gallery" className="text-[#4a3728] hover:text-[#800000] font-bold transition-colors px-2 py-1">
                गॅलरी
              </Link>

              <div className="flex items-center gap-3 ml-4">
                <button className="bg-[#ff9933] hover:bg-[#e68a2e] text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> पूजा बुक करा
                </button>
                <a href="#donations" className="bg-[#d4af37] hover:bg-[#b8962d] text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2">
                  <HandHeart className="w-4 h-4" /> दान करा
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-white"
              >
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-[#4a0404] text-white px-4 pt-2 pb-8 space-y-4 border-t border-white/10"
          >
            <Link href="/" onClick={() => setIsOpen(false)} className="block py-3 border-b border-white/10 font-bold">{t.nav.home}</Link>
            <a href="#about" onClick={() => setIsOpen(false)} className="block py-3 border-b border-white/10 font-bold">परिचय</a>
            <a href="#darshan" onClick={() => setIsOpen(false)} className="block py-3 border-b border-white/10 font-bold">दर्शन</a>
            <a href="#donations" onClick={() => setIsOpen(false)} className="block py-3 border-b border-white/10 font-bold text-[#ff9933]">दान करा</a>
            <button
              onClick={() => {
                setLanguage(language === 'en' ? 'mr' : 'en');
                setIsOpen(false);
              }}
              className="flex items-center gap-2 py-3 font-bold"
            >
              <Languages className="w-5 h-5 gold-text" /> {language === 'en' ? 'मराठी' : 'English'}
            </button>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
