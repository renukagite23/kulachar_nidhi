'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Mail, Phone, MapPin, Globe, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#4a3728] text-[#fffdf5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#ff9933]">Kuldaivat Trust</h3>
            <p className="text-[#fffdf5]/80 leading-relaxed">
              Dedicated to preserving our spiritual heritage and supporting our community through transparency and devotion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-[#fffdf5]/10 rounded-full hover:bg-[#ff9933] transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-[#fffdf5]/10 rounded-full hover:bg-[#ff9933] transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-[#fffdf5]/10 rounded-full hover:bg-[#ff9933] transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>


          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#d4af37]">{t.nav.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#ff9933]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#ff9933]" />
                <span>info@kuldaivattrust.org</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ff9933] mt-1" />
                <span>Main Mandir Road, Village Kulapur,<br />Maharashtra, India</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#d4af37]">Important Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#ff9933] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#ff9933] transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#ff9933] transition-colors">Donation Policy</a></li>
              <li><a href="#" className="hover:text-[#ff9933] transition-colors">Annual Reports</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#fffdf5]/10 text-center text-[#fffdf5]/60">
          <p>© {new Date().getFullYear()} Kuldaivat Trust. All rights reserved.</p>
          <p className="mt-1 text-xs">Developed with Devotion by Paarsh Projects</p>
        </div>
      </div>
    </footer>
  );
}
