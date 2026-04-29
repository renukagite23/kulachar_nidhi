'use client';

import React from 'react';
import AboutLayout from '@/components/AboutLayout';
import { FileText, Download, Info, Gavel } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function RTIPage() {
  const { t, language } = useLanguage();

  const content = {
    en: {
      title: "Right to Information",
      desc: "Under the Right to Information Act, 2005, all information of Shri Mahalakshmi Temple Trust, Mumbai is made available to devotees and citizens transparently.",
      pio: "Public Information Officer",
      pio_name: "Mr. R. K. Patil",
      pio_title: "Chief Manager, Temple Trust",
      faa: "First Appellate Authority",
      faa_name: "Mr. S. V. Gaikwad",
      faa_title: "Chairman, Temple Trust Board",
      docs_title: "Important Documents (Download)",
      note: "Note: To apply for RTI, submit the application in the prescribed format with the required fee at the Trust office. You can also apply online through the RTI portal.",
      documents: [
        { title: 'RTI Act 2005 - Guide', size: '1.2 MB' },
        { title: 'Public Information of the Trust - Part 1', size: '5.4 MB' },
        { title: 'Public Information of the Trust - Part 2', size: '3.8 MB' },
        { title: 'List of Appellate and Public Information Officers', size: '450 KB' },
      ]
    },
    mr: {
      title: "माहितीचा अधिकार",
      desc: "माहिती अधिकार अधिनियम, २००५ अंतर्गत श्री महालक्ष्मी मंदिर संस्थान, मुंबई यांची सर्व माहिती पारदर्शकपणे भक्तांना आणि नागरिकांना उपलब्ध करून देण्यात येते.",
      pio: "जन माहिती अधिकारी",
      pio_name: "श्री. आर. के. पाटील",
      pio_title: "मुख्य व्यवस्थापक, मंदिर संस्थान",
      faa: "प्रथम अपिल अधिकारी",
      faa_name: "श्री. एस. व्ही. गायकवाड",
      faa_title: "अध्यक्ष, मंदिर विश्वस्त मंडळ",
      docs_title: "महत्त्वाचे दस्तऐवज (Download)",
      note: "टीप: माहिती अधिकार अर्ज करण्यासाठी विहित नमुन्यात अर्ज आणि आवश्यक फी संस्थानच्या कार्यालयात जमा करावी. आपण ऑनलाइन अर्ज देखील माहिती अधिकार पोर्टलवरून करू शकता.",
      documents: [
        { title: 'माहिती अधिकार कायदा २००५ - मार्गदर्शिका', size: '१.२ MB' },
        { title: 'संस्थानची सार्वजनिक माहिती - भाग १', size: '५.४ MB' },
        { title: 'संस्थानची सार्वजनिक माहिती - भाग २', size: '३.८ MB' },
        { title: 'अपिल अधिकारी आणि जन माहिती अधिकारी यादी', size: '४५० KB' },
      ]
    }
  }[language === 'mr' ? 'mr' : 'en'];

  return (
    <AboutLayout title={t('about.rti')}>
      <div className="space-y-10">
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gavel className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-black text-secondary">{content.title}</h2>
          </div>
          <p className="text-gray-600 leading-relaxed font-medium">
            {content.desc}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="spiritual-card p-6 border-border/50">
            <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-primary w-fit">{content.pio}</h3>
            <div className="space-y-2">
              <p className="text-sm font-bold text-secondary">{content.pio_name}</p>
              <p className="text-xs text-muted-foreground font-bold">{content.pio_title}</p>
              <p className="text-xs text-primary font-bold mt-4">+९१ २२ २३५१ ४७३२</p>
            </div>
          </div>
          <div className="spiritual-card p-6 border-border/50">
            <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-primary w-fit">{content.faa}</h3>
            <div className="space-y-2">
              <p className="text-sm font-bold text-secondary">{content.faa_name}</p>
              <p className="text-xs text-muted-foreground font-bold">{content.faa_title}</p>
              <p className="text-xs text-primary font-bold mt-4">+९१ २२ २३५१ ४७३३</p>
            </div>
          </div>
        </div>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-secondary flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            {content.docs_title}
          </h3>
          <div className="space-y-3">
            {content.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-secondary">{doc.title}</p>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{doc.size}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-primary/5 p-6 rounded-2xl flex items-start gap-4">
          <Info className="w-6 h-6 text-primary shrink-0" />
          <p className="text-xs text-gray-600 leading-relaxed italic">
            {content.note}
          </p>
        </div>
      </div>
    </AboutLayout>
  );
}

