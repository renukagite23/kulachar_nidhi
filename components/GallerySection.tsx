'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function GallerySection() {
  const { t } = useLanguage();
  const images = [
    { src: '/devi.png', title: t('gallery.main_sanctum'), size: 'large' },
    { src: '/devi.png', title: t('gallery.entrance'), size: 'small' },
    { src: '/devi.png', title: t('gallery.deepotsav'), size: 'small' },
    { src: '/devi.png', title: t('gallery.festival'), size: 'medium' },
  ];

  return (
    <section id="gallery" className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em]">{t('nav.darshan')}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">{t('gallery.title')}</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors">
            {t('gallery.view_all')} <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* Bento Grid - Unique & Compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:auto-rows-[180px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-2xl overflow-hidden bg-white border border-border shadow-sm cursor-pointer
                ${img.size === 'large' ? 'col-span-2 row-span-2' : ''}
                ${img.size === 'medium' ? 'col-span-2 row-span-1' : ''}
              `}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Overlay - Compact Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-xs tracking-wide mb-1">{img.title}</p>
                    <div className="w-6 h-0.5 bg-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Placeholder Icon for small sizes when not hovered */}
              <div className="absolute top-3 right-3 text-white/40 group-hover:opacity-0 transition-opacity">
                <ImageIcon className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <button className="w-full spiritual-button-outline !py-3 text-xs">
            {t('gallery.view_all')}
          </button>
        </div>
      </div>
    </section>
  );
}
