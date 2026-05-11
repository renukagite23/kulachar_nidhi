'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, History, Heart, Shield } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function WelcomeSection() {
  const { t } = useLanguage();
  const features = [
    { icon: History, title: t('welcome.features.heritage'), desc: t('welcome.features.heritage_desc') },
    { icon: Heart, title: t('welcome.features.devotion'), desc: t('welcome.features.devotion_desc') },
    { icon: Shield, title: t('welcome.features.trust'), desc: t('welcome.features.trust_desc') },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-primary font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em]">{t('welcome.badge_title')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight mb-4">{t('welcome.main_title')}</h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-2xl mx-auto">{t('welcome.main_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-border">
              <img src="/devi.png" alt="Temple Interior" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-border hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary">{t('welcome.badge_title')}</p>
                  <p className="text-[10px] text-muted-foreground">{t('welcome.badge_subtitle')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-secondary leading-tight">{t('welcome.section_title')}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {t('welcome.desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-secondary">{f.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/about/history">
                <button className="spiritual-button !px-8 !py-4 shadow-lg shadow-primary/20">
                  {t('welcome.cta')} <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
