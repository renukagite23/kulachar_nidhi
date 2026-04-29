'use client';

import React from 'react';
import AboutLayout from '@/components/AboutLayout';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function HistoryPage() {
  const { t, language } = useLanguage();

  const content = {
    en: {
      quote: "Shri Mahalakshmi Temple is one of the oldest and most famous temples in Mumbai. Dating back to the 18th century, it holds immense historical and religious significance.",
      sec1_title: "Ancient References and Legends",
      sec1_text: "According to Shri Skanda Purana, the story of this Goddess's incarnation is found as follows. After the death of Sage Kardama in the Krita Yuga, his wife Anubhuti decided to perform Sahagamana (sati) with her husband. However, as she had a minor son, other sages convinced her to postpone her plan for the sake of the child. She then began performing penance on the banks of the Mandakini river.",
      sec2_title: "Temple Establishment",
      sec2_text: "At that time, a demon named Kukar tried to disturb her penance and violate her chastity. In her moment of distress, Anubhuti called out to Shri Bhagwati. The Goddess incarnated, killed the evil demon, and at Anubhuti's request, made her permanent abode on the Yamunachal (Bala Ghat) mountains.",
      modern_title: "Modern Form",
      modern_text: "Today, this temple is the center of Mumbai's spiritual life. Millions of devotees visit for darshan every year, especially during Navratri. The Temple Trust conducts several social and educational initiatives.",
      year: "Approx. 18th Century",
      arch: "Maratha and Hindu Architecture"
    },
    mr: {
      quote: "श्री महालक्ष्मी मंदिर हे मुंबईतील सर्वात जुन्या आणि प्रसिद्ध मंदिरांपैकी एक आहे. हे मंदिर १८ व्या शतकातील असून याचे ऐतिहासिक आणि धार्मिक महत्त्व अनन्यसाधारण आहे.",
      sec1_title: "प्राचीन संदर्भ आणि आख्यायिका",
      sec1_text: "श्री स्कंद पुराणात या देवीची अवतार कथा खालीलप्रमाणे दिलेली आढळते. कृत युगात कर्दूम ऋषींच्या मृत्यू नंतर त्यांची पत्नी अनुभूती हिने पती बरोबर सहगमन करण्याचे ठरविले. परंतु तिला अल्पवयी मुलगा असल्याने इतर ऋषीमुनींनी तिची समजूत घातल्याने अल्पवयी मुलासाठी तिने तो बेत रहित केला व मंदाकिनी नदीवर तटावर ती तपश्चर्या करू लागली.",
      sec2_title: "मंदिराची स्थापना",
      sec2_text: "त्या वेळी कुकर नाम दैत्याने तिचे तापाचा व पतिव्रत्याचा भंग करण्याचा प्रयत्न केला. अनुभूतीने संकट समयी श्री भगवतीचा धावा केला व श्री भगवतीने अवतार धारण करून त्या दुष्ट दैत्याचा वध केला व अनुभूतीचे विनंतीवरून यमुनाचल (बाला घाट) पर्वतावर अखंड वास्तव्य केले.",
      modern_title: "आधुनिक स्वरूप",
      modern_text: "आज हे मंदिर मुंबईच्या आध्यात्मिक जीवनाचा केंद्रबिंदू आहे. दरवर्षी नवरात्रीच्या काळात येथे लाखो भक्त दर्शनासाठी येतात. मंदिराच्या ट्रस्टद्वारे अनेक सामाजिक आणि शैक्षणिक उपक्रम राबविले जातात.",
      year: "अंदाजे १८ वे शतक",
      arch: "मराठा आणि हिंदू स्थापत्यशास्त्र"
    }
  }[language === 'mr' ? 'mr' : 'en'];

  return (
    <AboutLayout title={t('about.history')} bannerImage="/images/bg2.png">
      <div className="space-y-8">
        <section className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary">
          <p className="text-secondary font-bold leading-relaxed italic">
            "{content.quote}"
          </p>
        </section>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-secondary flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg">1</span>
            {content.sec1_title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {content.sec1_text}
          </p>
          <img
            src="/images/devi2about.png"
            alt="Historical Image"
            className="w-full h-80 object-cover rounded-2xl shadow-sm border border-border"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-secondary flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg">2</span>
            {content.sec2_title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {content.sec2_text}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-xl border border-border">
              <h4 className="font-bold text-primary mb-1">{language === 'mr' ? 'स्थापना वर्ष' : 'Year of Establishment'}</h4>
              <p className="text-sm text-secondary font-medium">{content.year}</p>
            </div>
            <div className="p-4 bg-muted rounded-xl border border-border">
              <h4 className="font-bold text-primary mb-1">{language === 'mr' ? 'वास्तुकला' : 'Architecture'}</h4>
              <p className="text-sm text-secondary font-medium">{content.arch}</p>
            </div>
          </div>
        </div>

        <section className="bg-secondary p-8 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-4 text-accent">{content.modern_title}</h3>
            <p className="text-white/80 leading-relaxed text-sm">
              {content.modern_text}
            </p>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <img src="/devi.png" alt="Icon" className="w-32 h-32 brightness-0 invert" />
          </div>
        </section>
      </div>
    </AboutLayout>
  );
}

