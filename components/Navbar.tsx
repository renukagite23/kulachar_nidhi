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
      {/* Top Bar - Compact & Professional */}
      <div className="hidden md:block bg-secondary text-white/70 py-1.5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[11px] font-medium tracking-tight">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 italic text-accent font-semibold">|| ॐ श्री महालक्ष्म्यै नम: ||</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-accent" /> 022-2351 4732</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-accent" /> दर्शन: सकाळी 6:00 - रात्री 10:00</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-accent" /> श्री महालक्ष्मी मंदिर ट्रस्ट, मुंबई</span>
            <button
              onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
              className="flex items-center gap-1.5 hover:text-white transition-colors border-l border-white/10 pl-5 ml-2"
            >
              <Languages className="w-3 h-3 text-accent" />
              {language === 'en' ? 'मराठी' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar - Compact Height */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14 md:h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                  <img src="/devi.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-bold text-secondary leading-tight">श्री महालक्ष्मी मंदिर</span>
                  <span className="text-[9px] text-accent font-bold uppercase tracking-[0.15em]">मुंबई, महाराष्ट्र</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu - Compact & Minimal */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="text-secondary/80 hover:text-primary font-semibold transition-colors px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50">
                {t.nav.home}
              </Link>
              <Link href="#about" className="text-secondary/80 hover:text-primary font-semibold transition-colors px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50">
                परिचय
              </Link>
              <Link href="#darshan" className="text-secondary/80 hover:text-primary font-semibold transition-colors px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50">
                दर्शन
              </Link>
              <Link href="#gallery" className="text-secondary/80 hover:text-primary font-semibold transition-colors px-3 py-1.5 text-sm rounded-lg hover:bg-muted/50">
                गॅलरी
              </Link>

              <div className="flex items-center gap-2 ml-4">
                <button className="spiritual-button-outline !px-4 !py-2 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-primary" /> पूजा बुक करा
                </button>
                <a href="#donations" className="spiritual-button !px-4 !py-2 text-xs">
                  <HandHeart className="w-3.5 h-3.5" /> दान करा
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-lg text-secondary"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white px-4 pt-2 pb-6 space-y-1 border-t border-border shadow-inner"
          >
            <Link href="/" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">{t.nav.home}</Link>
            <a href="#about" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">परिचय</a>
            <a href="#darshan" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-semibold text-secondary hover:bg-muted/30 rounded-lg">दर्शन</a>
            <a href="#donations" onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-border/50 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg">दान करा</a>
            <button
              onClick={() => {
                setLanguage(language === 'en' ? 'mr' : 'en');
                setIsOpen(false);
              }}
              className="flex items-center gap-2 py-4 px-2 text-sm font-semibold text-secondary"
            >
              <Languages className="w-4 h-4 text-accent" /> {language === 'en' ? 'मराठी' : 'English'}
            </button>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
