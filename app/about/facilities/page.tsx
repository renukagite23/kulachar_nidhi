'use client';

import React from 'react';
import AboutLayout from '@/components/AboutLayout';
import { Coffee, Shield, Trash, Users, Zap, Heart } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function FacilitiesPage() {
  const { t, lang: language } = useLanguage();

  const content = {
    en: {
      desc: "The Shri Mahalakshmi Temple Trust provides several facilities for the convenience of devotees. Our aim is to ensure that every devotee's journey to the temple is comfortable.",
      help_title: "Special Assistance",
      help_desc: "Special entry and wheelchair facilities are available for the elderly and disabled. Please contact the volunteers at the main entrance for assistance.",
      facilities: [
        { title: 'Clean Drinking Water', icon: Coffee, desc: 'Free and pure drinking water is available for devotees in the temple.' },
        { title: 'Security System', icon: Shield, desc: '24-hour CCTV and security guards are deployed for the safety of devotees.' },
        { title: 'Bhakta Niwas', icon: Users, desc: 'Accommodation for devotees coming from far (registration required).' },
        { title: 'Washrooms', icon: Trash, desc: 'Separate clean washrooms for men and women are available in the temple premises.' },
        { title: 'Emergency Power', icon: Zap, desc: 'Generator facility is available immediately in case of power failure.' },
        { title: 'First Aid', icon: Heart, desc: 'First aid box and ambulance facility for immediate medical help.' },
      ]
    },
    mr: {
      desc: "श्री महालक्ष्मी मंदिर संस्थान भक्तांच्या सोयीसाठी अनेक सुविधा पुरविते. मंदिरात दर्शनासाठी येणाऱ्या प्रत्येक भक्ताचा प्रवास सुखकर व्हावा हा आमचा उद्देश आहे.",
      help_title: "विशेष सहाय्य",
      help_desc: "वृद्ध आणि अपंग व्यक्तींसाठी मंदिरात विशेष प्रवेश आणि व्हिलचेअरची सोय उपलब्ध आहे. कृपया मदतीसाठी मंदिराच्या मुख्य प्रवेशद्वारावरील स्वयंसेवकांशी संपर्क साधावा.",
      facilities: [
        { title: 'स्वच्छ पिण्याचे पाणी', icon: Coffee, desc: 'मंदिरात भक्तांसाठी मोफत आणि शुद्ध पिण्याच्या पाण्याची सोय आहे.' },
        { title: 'सुरक्षा व्यवस्था', icon: Shield, desc: '२४ तास सीसीटीव्ही आणि सुरक्षा रक्षक भक्तांच्या सुरक्षेसाठी तैनात आहेत.' },
        { title: 'भक्त निवास', icon: Users, desc: 'दूरून येणाऱ्या भक्तांसाठी राहण्याची सोय (नोंदणी आवश्यक).' },
        { title: 'स्वच्छता गृह', icon: Trash, desc: 'मंदिराच्या परिसरात महिला आणि पुरुषांसाठी स्वतंत्र स्वच्छता गृह आहेत.' },
        { title: 'आपत्कालीन वीज सोय', icon: Zap, desc: 'वीज गेल्यास तात्काळ जनरेटरची सोय उपलब्ध आहे.' },
        { title: 'प्रथम उपचार', icon: Heart, desc: 'तात्काळ वैद्यकीय मदतीसाठी प्रथम उपचार पेटी आणि रुग्णवाहिका सोय.' },
      ]
    }
  }[language === 'mr' ? 'mr' : 'en'];

  return (
    <AboutLayout title={t('about.facilities')}>
      <div className="space-y-10">
        <p className="text-gray-600 leading-relaxed font-medium">
          {content.desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {content.facilities.map((item, index) => (
            <div key={index} className="p-8 rounded-3xl bg-muted/50 border border-border hover:bg-white hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary/10 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-black text-secondary mb-3">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-secondary p-10 rounded-[40px] text-white relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-accent">{content.help_title}</h3>
              <p className="text-white/70 text-sm leading-relaxed italic">
                "{content.help_desc}"
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="w-20 h-20 rounded-full border-4 border-accent/30 flex items-center justify-center animate-pulse">
                <Heart className="w-10 h-10 text-accent" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </AboutLayout>
  );
}

