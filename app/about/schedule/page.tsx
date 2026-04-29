'use client';

import React from 'react';
import AboutLayout from '@/components/AboutLayout';
import { Clock, Sun, Moon, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function SchedulePage() {
  const { t, language } = useLanguage();

  const content = {
    en: {
      desc: "The daily temple schedule is vital for the worship of the Goddess. Devotees should take advantage of darshan according to these timings.",
      special_title: "Special Note",
      special_1: "Timings may change on festival days.",
      special_2: "The temple remains open 24 hours during Navratri.",
      schedules: [
        { time: '6:00 AM', event: 'Temple Opening & Abhishek', icon: Sun },
        { time: '8:30 AM', event: 'Morning Maha Aarti', icon: Sparkles },
        { time: '12:30 PM', event: 'Midday Naivedya & Aarti', icon: Sun },
        { time: '7:00 PM', event: 'Evening Dhoop Aarti', icon: Moon },
        { time: '9:30 PM', event: 'Shej Aarti & Temple Closing', icon: Moon },
      ]
    },
    mr: {
      desc: "मंदिरातील दैनंदिन कार्यक्रम देवीच्या उपासनेसाठी अत्यंत महत्त्वाचे आहेत. भक्तांनी या वेळेनुसार दर्शनाचा लाभ घ्यावा.",
      special_title: "विशेष सूचना",
      special_1: "सण आणि उत्सवाच्या दिवशी वेळेत बदल होऊ शकतो.",
      special_2: "नवरात्रीच्या काळात मंदिर २४ तास उघडे राहते.",
      schedules: [
        { time: 'सकाळी ६:००', event: 'मंदिर उघडणे आणि अभिषेक', icon: Sun },
        { time: 'सकाळी ८:३०', event: 'सकाळची महाआरती', icon: Sparkles },
        { time: 'दुपारी १२:३०', event: 'मध्यान्ह नैवेद्य आणि आरती', icon: Sun },
        { time: 'संध्याकाळी ७:००', event: 'सायंकाळची धूप आरती', icon: Moon },
        { time: 'रात्री ९:३०', event: 'शेजारती आणि मंदिर बंद', icon: Moon },
      ]
    }
  }[language === 'mr' ? 'mr' : 'en'];

  return (
    <AboutLayout title={t('about.schedule')}>
      <div className="space-y-8">
        <p className="text-gray-600 leading-relaxed font-medium">
          {content.desc}
        </p>

        <div className="space-y-4">
          {content.schedules.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-6 p-5 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-grow">
                <p className="text-accent font-black text-xs uppercase tracking-wider mb-1">{item.time}</p>
                <p className="text-secondary font-bold text-lg">{item.event}</p>
              </div>
              <Clock className="w-5 h-5 text-muted-foreground opacity-20" />
            </div>
          ))}
        </div>

        <section className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
          <h3 className="text-lg font-black text-secondary mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {content.special_title}
          </h3>
          <ul className="space-y-3">
            <li className="text-sm text-gray-600 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              {content.special_1}
            </li>
            <li className="text-sm text-gray-600 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              {content.special_2}
            </li>
          </ul>
        </section>
      </div>
    </AboutLayout>
  );
}

