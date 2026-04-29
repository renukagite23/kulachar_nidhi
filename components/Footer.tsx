'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Mail, Phone, MapPin, Globe, MessageCircle, Send, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary text-white/80 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Link href="/" className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center p-2 shadow-lg shadow-primary/10">
                <img src="/devi.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
              </Link>
              <h3 className="text-xl font-black text-white tracking-tight">{t('hero.title_1')} {t('hero.title_2')}</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              {t('footer.about_desc')}
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
            <h4 className="text-sm font-bold text-accent uppercase tracking-widest">{t('footer.quick_links')}</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link></li>
              <li><Link href="/about/history" className="hover:text-primary transition-colors">{t('nav.about_temple')}</Link></li>
              <li><Link href="/donation" className="hover:text-primary transition-colors">{t('nav.donate')}</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">{t('nav.gallery')}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* About Temple (Information) */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-accent uppercase tracking-widest">{t('footer.temple_info')}</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/about/history" className="hover:text-primary transition-colors">{t('about.history')}</Link></li>
              <li><Link href="/about/schedule" className="hover:text-primary transition-colors">{t('about.schedule')}</Link></li>
              <li><Link href="/about/pooja" className="hover:text-primary transition-colors">{t('about.pooja')}</Link></li>
              <li><Link href="/about/reach" className="hover:text-primary transition-colors">{t('about.reach')}</Link></li>
              <li><Link href="/about/facilities" className="hover:text-primary transition-colors">{t('about.facilities')}</Link></li>
              <li><Link href="/about/rti" className="hover:text-primary transition-colors">{t('about.rti')}</Link></li>
              <li><Link href="/about/charges" className="hover:text-primary transition-colors">{t('about.charges')}</Link></li>
            </ul>
          </div>

          {/* Contact & Trust Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-accent uppercase tracking-widest">{t('footer.contact_us')}</h4>
            <ul className="space-y-4 text-sm font-medium mb-6">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{t('hero.info.phone')}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>info@kuldaivattrust.org</span>
              </li>
            </ul>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-tight">Tax Exemption</p>
                <p className="text-[10px] text-white/40 mt-1">{t('footer.80g_desc')}</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs font-medium text-white/40">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/30">
            <Link href="/admin" className="hover:text-primary transition-colors">Admin Portal</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-white/30 text-center md:text-right">
            <p>© {new Date().getFullYear()} {t('hero.title_1')?.toUpperCase()} {t('hero.title_2')?.toUpperCase()}. {t('footer.rights')}</p>
            <div className="flex items-center gap-2">
              <span>{t('footer.developed_by')}</span>
              <span className="text-white/60">PAARSH PROJECTS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}

