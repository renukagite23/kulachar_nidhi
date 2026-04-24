'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GallerySection() {
  const images = [
    { src: '/devi.png', title: 'Main Garbhagriha' },
    { src: '/devi.png', title: 'Mandir Entrance' },
    { src: '/devi.png', title: 'Deepotsav' },
    { src: '/devi.png', title: 'Festivals' },
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#4a0404] mb-4 tracking-tight">मंदिर गॅलरी</h2>
          <p className="text-[#4a3728]/60 uppercase tracking-widest text-sm font-bold">दिव्य निवासस्थानाची झलक</p>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="text-white font-bold text-lg">{img.title}</p>
                <div className="w-12 h-1 bg-[#d4af37] mt-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
