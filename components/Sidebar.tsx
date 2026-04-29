import React from 'react';
import { Monitor, Newspaper, Video, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Sidebar() {
  const { t } = useLanguage();

  const services = [
    { name: t('common.online_darshan'), icon: Monitor, href: '/online-darshan' },
    { name: t('common.news'), icon: Newspaper, href: '/news' },
    { name: t('common.videos'), icon: Video, href: '/videos' },
  ];

  return (
    <aside className="space-y-8">
      {/* Quick Services */}
      <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
        <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-6 pb-2 border-b-2 border-primary w-fit">
          {t('about.sidebar_title')}
        </h3>
        <div className="space-y-3">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-muted transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-secondary text-sm">{service.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Temple Image Card */}
      <div className="rounded-2xl overflow-hidden shadow-md border border-border group">
        <div className="relative h-48">
          <img
            src="/images/devi3.png"
            alt="Temple"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest text-accent">Temple View</p>
            <p className="font-bold">श्री महालक्ष्मी मंदिर</p>
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
            <p className="text-xs text-white/80 font-bold">contact@mahalakshmitemple.in</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

