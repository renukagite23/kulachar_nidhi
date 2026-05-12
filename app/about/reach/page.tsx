'use client';

import React from 'react';
import AboutLayout from '@/components/AboutLayout';
import { MapPin, Train, Bus, Plane, Map } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ReachPage() {
  const { t, lang: language } = useLanguage();

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
        { name: 'Jaitapur Bus Stop (500 m)' },
        { name: 'Baglan Taluka Area' },
        { name: 'Nashik District Highway Road' },
        { name: 'Nearby Village Market Area' }
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
        { name: 'जैतापूर बस स्टॉप (५०० मी)' },
        { name: 'बागलाण तालुका परिसर' },
        { name: 'नाशिक जिल्हा महामार्ग मार्ग' },
        { name: 'जवळील गाव बाजार परिसर' }
      ]
    }
  }[language === 'mr' ? 'mr' : 'en'];

  return (
    <AboutLayout title={t('about.reach')}>
      <div className="space-y-10">
        <div className="rounded-3xl overflow-hidden h-80 border-4 border-white shadow-xl">
          <iframe
            src="https://www.google.com/maps?q=Shri%20Kulaswamini%20Ekavira%20Devi%20Mandir%20Trust,%20Jaitapur,%20Taluka%20Baglan,%20District%20Nashik,%20Maharashtra%20423301&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.modes.map((mode, index) => (
            <div key={index} className="spiritual-card p-6 border-border/50 hover:border-primary/20 transition-all">
              <div className={`w-12 h-12 rounded-xl ${mode.color}/10 flex items-center justify-center mb-6`}>
                <mode.icon className={`w-6 h-6 text-white`} style={{ color: mode.color.replace('bg-', '') }} />
              </div>
              <h3 className="text-lg font-black text-secondary mb-3">{mode.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">{mode.desc}</p>
            </div>
          ))}
        </div> */}

        <section className="bg-muted p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-secondary">
              {t('common.landmarks')}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.landmarks.map((landmark, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl border border-border flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />

                <div>
                  <h4 className="text-sm font-black text-secondary">
                    {t('common.landmarks')}
                  </h4>

                  <p className="text-xs text-gray-600">
                    {landmark.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AboutLayout>
  );
}

