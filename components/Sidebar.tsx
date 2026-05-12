import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Sidebar() {
  const { t } = useLanguage();

  return (
    <aside className="space-y-8">
      {/* Temple Image Card */}
      <div className="rounded-2xl overflow-hidden shadow-md border border-border group">
        <div className="relative aspect-[3/4]">
          <img
            src="/devi.png"
            alt="Shri Ekavira Devi"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest text-accent">Temple View</p>
            <p className="font-bold">Shri Kulaswamini
              Ekavira Devi Mandir Trust</p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-secondary text-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-sm font-black uppercase tracking-wider mb-6 pb-2 border-b border-white/10 w-fit text-accent">
          {t('about.contact_info')}
        </h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-accent shrink-0" />
            <p className="text-xs text-white/80 leading-relaxed font-medium">
              {t('common.mumbai_address')}
            </p>
          </div>
          <div className="flex gap-3">
            <Phone className="w-5 h-5 text-accent shrink-0" />
            <p className="text-xs text-white/80 font-bold">{t('hero.info.phone')}</p>
          </div>
          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-accent shrink-0" />
            <p className="text-xs text-white/80 font-bold">info@kuldaivattrust.org</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
