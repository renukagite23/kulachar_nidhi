'use client';

import React from 'react';
import AboutLayout from '@/components/AboutLayout';
import { Heart, Sparkles, User, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function PoojaPage() {
  const { t, language } = useLanguage();

  const content = {
    en: {
      title: "Daily Pooja - Detailed Information",
      intro: "At 6:00 AM, the Panchamrut Abhishek is performed for the Goddess. During this ritual, honey, banana, sugar, lemon, and curd are applied, and the Goddess is bathed with sacred Gomukh water. Devotees may also perform 'Sinhasan Pooja' using milk, curd, Shrikhand, Aamras (mango pulp), or sugarcane juice according to their wishes. At noon, priests and devotees gather to sing the Goddess's Aarti, performed with incense and camphor.",
      note: "Note: Pooja timings are subject to change depending on the crowd and festival days.",
      featured: [
        { name: 'Oti Bharan', image: '/images/devi2about.png' },
        { name: 'Sinhasan Pooja', image: '/images/devi3.png' }
      ],
      schedules: [
        { name: 'Charan Teerth Kakada Aarti', time: '4:30 AM (Early Morning)' },
        { name: 'Abhishek Pooja', time: '6:00 AM to 10:00 AM' },
        { name: 'Vastralankar Pooja Aarti & Dhoop Aarti', time: '11:00 AM' },
        { name: 'Abhishek Pooja', time: '7:00 PM to 9:00 PM' },
        { name: 'Vastralankar Aarti & Night Prakshal Pooja', time: '9:30 PM' },
        { name: 'Charan Teerth', time: '1:00 AM (During heavy crowds, with Chairman\'s permission)' }
      ]
    },
    mr: {
      title: "दैनंदिन पुजा - सविस्तर माहिती",
      intro: "सकाळी ६ वाजता देवीस पंचामृत अभिषेक घालतात. या वेळी देवीस मध, केळी, साखर, लिंबू आणि दही लावतात. स्नानाकरिता गोमुखाचे पाणी वापरतात. या पूजेच्या वेळी भक्त आपल्या इच्छेनुसार दुध दही यांचे सिंहासन पूजा, श्रीखंड तसेच आमरस, उसाचा रस यांनी स्नान घालून सिंहासन भरतात म्हणून याला सिंहासन पूजा असे म्हटले जाते. दुपारी : दुपारी पूजारी व भक्त देवीची आरती म्हणतात. ऊद कापूर लावून हि आरती केली जाते.",
      note: "गर्दीच्या वेळी पूजेच्या वेळात गरजेनुसार बदल करण्यात येतात.",
      featured: [
        { name: 'ओटी भरण', image: '/images/devi2about.png' },
        { name: 'सिंहासन पूजा', image: '/images/devi3.png' }
      ],
      schedules: [
        { name: 'चरणतीर्थ काकडा आरती', time: 'प्रातःकाळी ०४.३० वाजता' },
        { name: 'अभिषेक पूजा', time: 'सकाळी ०६.०० ते १०.०० वाजता' },
        { name: 'वस्त्रालंकार पूजा आरती व धुपारती', time: 'सकाळी ११.०० वाजता' },
        { name: 'अभिषेक पूजा', time: 'सायंकाळी ०७.०० ते ०९.००' },
        { name: 'वस्त्रालंकार पूजा आरती व धुपारती रात्री प्रक्षाळ पूजा', time: 'रात्री ०९.३० वाजता' },
        { name: 'चरणतीर्थ', time: 'रात्री ०१ वाजता (मा. अध्यक्ष यांच्या परवानगीने)' }
      ]
    }
  }[language === 'mr' ? 'mr' : 'en'];

  return (
    <AboutLayout title={content.title} bannerImage="/images/bg2.png">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Left Column: Text & Schedule */}
        <div className="xl:col-span-8 space-y-10">
          <section className="bg-primary/5 p-8 rounded-3xl border-l-4 border-primary">
            <p className="text-secondary font-bold leading-relaxed text-sm md:text-base italic">
              {content.intro}
            </p>
          </section>

          <div className="space-y-6">
            {content.schedules.map((item, index) => (
              <div key={index} className="group">
                <h3 className="text-xl font-black text-primary mb-1 group-hover:translate-x-1 transition-transform">
                  {item.name}
                </h3>
                <p className="text-secondary font-bold text-sm mb-4 pb-4 border-b border-border/50">
                  {item.time}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-xl text-gray-500 italic text-sm">
            <span className="text-primary font-black text-xl">•</span>
            {content.note}
          </div>
        </div>

        {/* Right Column: Featured Images */}
        <div className="xl:col-span-4 space-y-8">
          <h2 className="text-lg font-black text-secondary uppercase tracking-widest border-b-2 border-primary pb-2 w-fit mb-6">
            {language === 'mr' ? 'विविध पुजा विधी' : 'Various Pooja Rituals'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
            {content.featured.map((item, index) => (
              <div key={index} className="space-y-3 group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-lg relative group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <p className="text-center font-black text-primary uppercase tracking-wider text-sm">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AboutLayout>
  );
}


