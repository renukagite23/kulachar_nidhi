'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      details: t('hero.title_1') + ' ' + t('hero.title_2') + ', ' + t('hero.info.place') + ' - ४०० ०२६, महाराष्ट्र, भारत.',
      action: t('contact.actions.map')
    },
    {
      icon: Mail,
      title: t('contact.email'),
      details: 'info@kuldaivattrust.org\nsupport@kuldaivattrust.org',
      action: t('contact.actions.email')
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      details: t('contact.hours').includes('Office') ? 'Monday to Sunday:\n10:00 AM to 6:00 PM' : 'सोमवार ते रविवार:\nसकाळी १०:०० ते सायंकाळी ६:००',
      action: t('contact.actions.hours')
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      details: '०२२-२३५१ ४७३२\n०२२-२३५१ २२३३',
      action: t('contact.actions.call')
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Contact Header */}
        <section className="relative py-12 md:py-20 bg-secondary overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none grayscale invert">
            <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-primary/50" />
                <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">{t('nav.contact')}</span>
                <div className="h-px w-8 bg-primary/50" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                {t('contact.title_1')} <span className="text-primary">{t('contact.title_2')}</span>
              </h1>
              <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto font-medium">
                {t('contact.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-12 md:py-20 -mt-10 relative z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-[2rem] border border-border shadow-xl shadow-secondary/5 hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-secondary mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground font-bold leading-relaxed whitespace-pre-line mb-4 h-12">
                    {item.details}
                  </p>
                  <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                    {item.action} <Send className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Support & Map Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16 items-start">

              {/* Form/Info Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-secondary p-8 rounded-[2.5rem] text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-primary">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-black">{t('contact.feedback')}</h4>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed font-bold">
                      {t('contact.feedback_desc')}
                    </p>
                    <button className="spiritual-button w-full h-12 text-xs uppercase tracking-widest">
                      {t('contact.actions.feedback')}
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[2.5rem] border border-border shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-secondary mb-1">{t('contact.other_info')}</h4>
                      <p className="text-[10px] text-muted-foreground leading-relaxed font-bold">
                        {t('contact.other_info_desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="lg:col-span-7 bg-white p-4 rounded-[2.5rem] border border-border shadow-2xl h-[450px] overflow-hidden group">
                <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                  {/* Google Map Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m11!1m3!1d15094.0621370213!2d72.8016462!3d18.9760375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce7464003291%3A0x6b7ce7464003291!2sMahalakshmi%20Temple!5e0!3m2!1sen!2sin!4v1714152000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale group-hover:grayscale-0 transition-all duration-700"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
