'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';

interface GalleryImage {
  _id: string;
  caption: string;
  imageUrl: string;
  size?: 'large' | 'tall' | 'square';
}

export default function GallerySection() {
  const { t } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch gallery');
        const data = await res.json();
        
        if (data.length === 0) {
           setImages([
             { _id: 'f1', imageUrl: '/devi.png', caption: t('gallery.main_sanctum'), size: 'large' },
             { _id: 'f2', imageUrl: '/devi.png', caption: t('gallery.entrance'), size: 'tall' },
             { _id: 'f3', imageUrl: '/devi.png', caption: t('gallery.deepotsav'), size: 'square' },
             { _id: 'f4', imageUrl: '/devi.png', caption: t('gallery.festival'), size: 'square' },
           ]);
        } else {
          // Transform data to fit our NEW Bento grid layout
          const transformedData = data.slice(0, 4).map((img: any, index: number) => ({
            ...img,
            size: index === 0 ? 'large' : index === 1 ? 'tall' : 'square'
          }));
          setImages(transformedData);
        }
      } catch (error) {
        console.error('Gallery fetch error:', error);
        setImages([
          { _id: 'f1', imageUrl: '/devi.png', caption: t('gallery.main_sanctum'), size: 'large' },
          { _id: 'f2', imageUrl: '/devi.png', caption: t('gallery.entrance'), size: 'tall' },
          { _id: 'f3', imageUrl: '/devi.png', caption: t('gallery.deepotsav'), size: 'square' },
          { _id: 'f4', imageUrl: '/devi.png', caption: t('gallery.festival'), size: 'square' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [t]);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em]">{t('gallery.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-secondary tracking-tight mb-6">{t('gallery.title')}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent mb-8" />
          
          <Link href="/gallery" className="group flex items-center gap-2 text-xs font-black text-muted-foreground hover:text-primary transition-all duration-300">
            {t('gallery.view_all')} 
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
               <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Dynamic Staggered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {loading ? (
             [1, 2, 3, 4].map((n) => (
                <div key={n} className={`bg-muted animate-pulse rounded-[2.5rem] 
                  ${n === 1 ? 'md:col-span-2 md:row-span-2' : ''}
                  ${n === 2 ? 'md:col-span-1 md:row-span-2' : ''}
                  ${n > 2 ? 'md:col-span-1 md:row-span-1' : ''}
                `} />
             ))
          ) : images.map((img, index) => (
            <motion.div
              key={img._id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-muted cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500
                ${img.size === 'large' ? 'md:col-span-2 md:row-span-2 row-span-2' : ''}
                ${img.size === 'tall' ? 'md:col-span-1 md:row-span-2 row-span-2' : ''}
                ${img.size === 'square' ? 'md:col-span-1 md:row-span-1' : ''}
              `}
            >
              <img
                src={img.imageUrl}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* High-End Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="space-y-3"
                >
                  <p className="text-white font-black text-sm md:text-lg tracking-tight leading-tight">{img.caption}</p>
                  <div className="flex items-center gap-3">
                    <div className="h-[2px] w-8 bg-primary" />
                    <span className="text-primary text-[10px] font-black uppercase tracking-widest">Sacred Vision</span>
                  </div>
                </motion.div>
                
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Subtle Corner Icon */}
              <div className="absolute bottom-6 right-6 text-white/20 group-hover:opacity-0 transition-opacity">
                <ImageIcon className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-12 md:hidden">
          <Link href="/gallery" className="w-full spiritual-button !py-5 text-sm flex justify-center items-center gap-2">
            {t('gallery.view_all')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
