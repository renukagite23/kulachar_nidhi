'use client';

import React from 'react';
import AboutLayout from '@/components/AboutLayout';
import { IndianRupee, Tag, Info, Heart } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ChargesPage() {
  const { t, language } = useLanguage();

  const content = {
    en: {
      quote: "The fees charged by the institute are used for temple maintenance and religious work. Official receipts for all fees are available from the institute's office or online.",
      table_title: "Pooja Price List",
      online_title: "Online Payment",
      online_desc: "You can pay all types of religious fees online from the official website. QR code, UPI, and net banking are available for payment.",
      notice_title: "Important Notice",
      notice_text: "Pooja materials fee is not included in the above fee. Devotees should bring materials themselves or buy from authorized shops outside the temple.",
      thanks: "Thank You - Shri Mahalakshmi Temple Trust",
      charges: [
        { name: 'Abhishek (Group)', price: '₹ 251' },
        { name: 'Abhishek (Individual)', price: '₹ 501' },
        { name: 'Maharudra Abhishek', price: '₹ 2,100' },
        { name: 'Laghurudra Abhishek', price: '₹ 1,100' },
        { name: 'Kumkum Archan', price: '₹ 101' },
        { name: 'Special Pooja (Navratri)', price: '₹ 5,001' },
        { name: 'Vehicle Pooja (2-wheeler)', price: '₹ 101' },
        { name: 'Vehicle Pooja (4-wheeler)', price: '₹ 501' },
      ]
    },
    mr: {
      quote: "संस्थानद्वारे आकारले जाणारे शुल्क हे मंदिराच्या देखभालीसाठी आणि धार्मिक कार्यासाठी वापरले जाते. सर्व शुल्काच्या अधिकृत पावत्या संस्थानच्या कार्यालयातून किंवा ऑनलाइन मिळतात.",
      table_title: "पूजेचे दरपत्रक",
      online_title: "ऑनलाइन भरणा",
      online_desc: "सर्व प्रकारचे धार्मिक शुल्क आपण अधिकृत वेबसाइटवरून ऑनलाइन भरू शकता. पेमेंटसाठी क्यूआर कोड, यूपीआय आणि नेट बँकिंग उपलब्ध आहे.",
      notice_title: "महत्त्वाची सूचना",
      notice_text: "पूजा साहित्याचे शुल्क वर दिलेल्या शुल्कामध्ये समाविष्ट नाही. भक्तांनी स्वतः साहित्य आणावे किंवा मंदिराबाहेरील अधिकृत दुकानातून विकत घ्यावे.",
      thanks: "धन्यवाद - श्री महालक्ष्मी मंदिर ट्रस्ट",
      charges: [
        { name: 'अभिषेक (सामूहिक)', price: '₹ २५१' },
        { name: 'अभिषेक (वैयक्तिक)', price: '₹ ५०१' },
        { name: 'महारुद्र अभिषेक', price: '₹ २,१००' },
        { name: 'लघुरुद्र अभिषेक', price: '₹ १,१००' },
        { name: 'कुमकुम अर्चन', price: '₹ १०१' },
        { name: 'विशेष पूजा (नवरात्री)', price: '₹ ५,००१' },
        { name: 'वाहन पूजा (दुचाकी)', price: '₹ १०१' },
        { name: 'वाहन पूजा (चारचाकी)', price: '₹ ५०१' },
      ]
    }
  }[language === 'mr' ? 'mr' : 'en'];

  return (
    <AboutLayout title={t('about.charges')}>
      <div className="space-y-10">
        <section className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary">
          <p className="text-secondary font-bold leading-relaxed italic">
            "{content.quote}"
          </p>
        </section>

        <div className="spiritual-card overflow-hidden border-border/50">
          <div className="bg-muted px-6 py-4 border-b border-border flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-black text-secondary uppercase tracking-wider">{content.table_title}</h3>
          </div>
          <div className="divide-y divide-border">
            {content.charges.map((item, index) => (
              <div key={index} className="flex justify-between items-center px-6 py-4 hover:bg-muted/30 transition-colors">
                <span className="text-sm font-bold text-secondary">{item.name}</span>
                <span className="text-sm font-black text-primary flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {item.price.replace('₹ ', '')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-secondary p-8 rounded-3xl text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-black text-accent mb-4">{content.online_title}</h3>
              <p className="text-white/70 text-xs leading-relaxed mb-6 font-medium">
                {content.online_desc}
              </p>
              <button className="bg-accent text-secondary font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                Pay Online
              </button>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <IndianRupee className="w-32 h-32" />
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-border flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Info className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-lg font-black text-secondary">{content.notice_title}</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              {content.notice_text}
            </p>
          </section>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <Heart className="w-3 h-3 text-accent" /> {content.thanks}
          </p>
        </div>
      </div>
    </AboutLayout>
  );
}

