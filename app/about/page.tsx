'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Award, Building2, Users2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const [presidentData, setPresidentData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchPresidentData();
  }, []);

  const fetchPresidentData = async () => {
    try {
      const res = await fetch('/api/about/president-message');
      const data = await res.json();
      if (!data.error) {
        setPresidentData(data);
      }
    } catch (error) {
      console.error('Error fetching president message:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get localized content with fallback
  const langKey = lang === 'en' ? 'english' : 'marathi';
  const content = presidentData ? presidentData[langKey] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-secondary text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover scale-110" />
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
            >
              {content?.heroTitle || t('about.title')}
            </motion.h1>
            <p className="text-accent font-bold uppercase tracking-[0.3em] text-sm">
              {content?.heroSubtitle || t('about.subtitle')}
            </p>
          </div>
        </section>

        {/* President's Message Section */}
        <section id="presidential-message" className="py-16 md:py-24 max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-12 items-start">

            {/* Text Content */}
            <div className="md:col-span-8 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-secondary mb-2 flex items-center gap-3">
                  {content?.title || t('about.president_msg')}-
                  <div className="h-1 w-20 bg-primary/20 rounded-full" />
                </h2>
                <div className="w-full h-px bg-border mt-4" />
              </div>

              <div className="space-y-6 text-secondary/80 leading-relaxed text-base italic font-medium whitespace-pre-line">
                {content?.description ? (
                  <p>{content.description}</p>
                ) : (
                  <>
                    <p>{t('about.msg_para1')}</p>
                    <p>{t('about.msg_para2')}</p>
                    <p>{t('about.msg_para3')}</p>
                  </>
                )}
              </div>

              {/* Dynamic sections from PresidentMessage model */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-primary mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" /> {content?.majorWorksTitle || t('about.major_works')}-
                  </h3>
                  <p className="text-secondary/70 leading-relaxed whitespace-pre-line">
                    {content?.majorWorks || t('about.works_desc')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-black text-primary mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5" /> {content?.staffQuartersTitle || t('about.staff_quarters')}-
                  </h3>
                  <p className="text-secondary/70 leading-relaxed whitespace-pre-line">
                    {content?.staffQuarters || t('about.staff_desc')}
                  </p>
                </div>
              </div>

              <div className="bg-muted p-8 rounded-3xl border border-border italic text-secondary/60 text-sm whitespace-pre-line">
                "{content?.donorRemembrance || t('about.donor_remembrance')}"
              </div>

              <div className="text-right pt-8">
                <p className="text-xl font-black text-secondary">{content?.name || t('about.president_name')}</p>
                <p className="text-sm font-bold text-primary italic">{content?.designation || t('about.president_role')}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{t('about.trust_name')}</p>
              </div>
            </div>

            {/* President Image */}
            <div className="md:col-span-4 sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform translate-x-4 translate-y-4 -z-10" />
                <div className="overflow-hidden rounded-[3.5rem] shadow-2xl border-4 border-white aspect-[3/4] bg-muted">
                  <img
                    src={presidentData?.image || "/images/trysty.png"}
                    alt="Trust President"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Caption/Badge */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-2xl shadow-xl border border-border w-[90%] text-center">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{t('about.badges.legacy')}</p>
                  <p className="text-xs font-bold text-secondary italic">{content?.legacyText || t('about.badges.mandate')}</p>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Quick Stats / Info Row */}
        <section className="bg-muted py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {(content?.stats?.length === 4 ? content.stats : [
                { label: t('about.stats.devotees'), value: t('about.stats.devotees_val') },
                { label: t('about.stats.established'), value: t('about.stats.established_val') },
                { label: t('about.stats.staff'), value: t('about.stats.staff_val') },
                { label: t('about.stats.prasadalaya'), value: t('about.stats.free') },
              ]).map((item: any, idx: number) => {
                const icons = [Users2, Building2, Users2, Award];
                const Icon = icons[idx] || Award;
                return (
                  <div key={idx} className="text-center group">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4 text-primary group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-2xl font-black text-secondary">{item.value}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
