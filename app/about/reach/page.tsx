'use client';

import React from 'react';
import AboutLayout from '@/components/AboutLayout';
import { MapPin, Train, Bus, Plane, Map } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ReachPage() {
  const { t, language } = useLanguage();

  const content = {
    en: {
      modes: [
        {
          title: 'Railway Service',
          desc: 'From Chhatrapati Shivaji Maharaj Terminus (CSMT) or Churchgate, you can come by taxi or bus.',
          icon: Train,
          color: 'bg-blue-500'
        },
        {
          title: 'Bus Service',
          desc: 'Several BEST buses stop near the temple. Direct buses are available from Colaba and South Mumbai.',
          icon: Bus,
          color: 'bg-green-500'
        },
        {
          title: 'Air Service',
          desc: 'From Chhatrapati Shivaji Maharaj International Airport, it takes about 1 hour by taxi.',
          icon: Plane,
          color: 'bg-purple-500'
        }
      ],
      landmarks: [
        { name: 'Haji Ali Dargah (1 km)' },
        { name: 'Breach Candy Hospital (500 m)' },
        { name: 'Mahalakshmi Railway Station (1.5 km)' }
      ]
    },
    mr: {
      modes: [
        {
          title: 'रेल्वे सेवा',
          desc: 'छत्रपती शिवाजी महाराज टर्मिनस (CSMT) किंवा चर्चगेट येथून आपण टॅक्सी किंवा बसने येऊ शकता.',
          icon: Train,
          color: 'bg-blue-500'
        },
        {
          title: 'बस सेवा',
          desc: 'बेस्ट (BEST) च्या अनेक बसेस मंदिराच्या जवळ थांबतात. कुलाबा आणि दक्षिण मुंबईतून थेट बसेस उपलब्ध आहेत.',
          icon: Bus,
          color: 'bg-green-500'
        },
        {
          title: 'विमान सेवा',
          desc: 'छत्रपती शिवाजी महाराज आंतरराष्ट्रीय विमानतळावरून टॅक्सीने साधारण १ तासात पोहोचता येते.',
          icon: Plane,
          color: 'bg-purple-500'
        }
      ],
      landmarks: [
        { name: 'हाजी अली दर्गा (१ किमी)' },
        { name: 'ब्रीच कँडी रुग्णालय (५०० मी)' },
        { name: 'महालक्ष्मी रेल्वे स्टेशन (१.५ किमी)' }
      ]
    }
  }[language === 'mr' ? 'mr' : 'en'];

  return (
    <AboutLayout title={t('about.reach')}>
      <div className="space-y-10">
        <div className="rounded-3xl overflow-hidden h-80 border-4 border-white shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.812239327855!2d72.8028713!3d18.9749102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce093d58611b%3A0xe03a74659f1311b!2sMahalakshmi%20Temple!5e0!3m2!1sen!2sin!4v1714360000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.modes.map((mode, index) => (
            <div key={index} className="spiritual-card p-6 border-border/50 hover:border-primary/20 transition-all">
              <div className={`w-12 h-12 rounded-xl ${mode.color}/10 flex items-center justify-center mb-6`}>
                <mode.icon className={`w-6 h-6 text-white`} style={{ color: mode.color.replace('bg-', '') }} />
              </div>
              <h3 className="text-lg font-black text-secondary mb-3">{mode.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">{mode.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-muted p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-secondary">{t('about.landmarks')}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.landmarks.map((landmark, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-border flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm font-bold text-secondary">{landmark.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AboutLayout>
  );
}

