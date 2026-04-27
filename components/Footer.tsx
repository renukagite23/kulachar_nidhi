'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Mail, Phone, MapPin, Globe, MessageCircle, Send, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary text-white/80 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center p-2 shadow-lg shadow-primary/10">
                <img src="/devi.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <h3 className="text-xl font-black text-white tracking-tight">Kuldaivat Trust</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Dedicated to preserving our spiritual heritage and supporting our community through transparency, technology, and devotion.
            </p>
            <div className="flex space-x-3">
              {[Globe, MessageCircle, Send].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg hover:bg-primary hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-accent uppercase tracking-widest">महत्त्वाच्या लिंक्स</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">मुख्यपृष्ठ</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">ट्रस्ट बद्दल</a></li>
              <li><a href="#donations" className="hover:text-primary transition-colors">ऑनलाइन देणगी</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">आरती वेळापत्रक</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-accent uppercase tracking-widest">{t.nav.contact}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>022-2351 4732</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>info@kuldaivattrust.org</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="leading-relaxed">श्री महालक्ष्मी मंदिर ट्रस्ट,<br />महालक्ष्मी, मुंबई - ४०० ०२६</span>
              </li>
            </ul>
          </div>

          {/* Legal / Trust Verification */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-accent uppercase tracking-widest">विश्वासार्हता</h4>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">नोंदणीकृत ट्रस्ट</p>
                <p className="text-[10px] text-white/40 mt-1">सर्व देणग्या प्राप्तिकर कायद्यांतर्गत ८०जी सवलतीस पात्र आहेत.</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs font-medium text-white/40">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-white/30">
          <p>© {new Date().getFullYear()} KULDAIVAT TRUST. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2">
            <span>DEVELOPED BY</span>
            <span className="text-white/60">PAARSH PROJECTS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
