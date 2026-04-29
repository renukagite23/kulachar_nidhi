'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function DiyaFlame() {
  return (
    <div className="relative w-24 h-40 flex flex-col items-center justify-end group">
      {/* Flame Base (Oil reservoir top) */}
      <div className="absolute bottom-8 w-12 h-4 bg-[#D4AF37] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] z-10 border-b border-black/10" />
      
      {/* Flame Container */}
      <div className="relative bottom-10 w-8 h-12 flex items-center justify-center">
        {/* Outer Glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4, 0.5, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-12 h-16 bg-orange-500 rounded-full blur-xl"
        />

        {/* Main Flame */}
        <motion.div
          animate={{
            scaleY: [1, 1.2, 0.9, 1.1, 1],
            scaleX: [1, 0.9, 1.1, 0.95, 1],
            translateX: ["-1px", "1px", "-1.5px", "0.5px", "-1px"],
            skewY: ["0deg", "1deg", "-1deg", "0.5deg", "0deg"],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-4 h-10 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-full shadow-[0_0_20px_rgba(255,165,0,0.8)] filter blur-[1px]"
        >
          {/* Inner Flame Core */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-4 bg-white/80 rounded-full blur-[2px]" />
          
          {/* Blue Base of Flame */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-blue-600/40 rounded-full blur-[1px]" />
        </motion.div>

        {/* Flickering Light Particles */}
        <motion.div
          animate={{
            y: [-10, -40],
            x: [-5, 5],
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.2,
          }}
          className="absolute top-0 w-1 h-1 bg-yellow-200 rounded-full blur-[1px]"
        />
        <motion.div
          animate={{
            y: [-5, -30],
            x: [3, -3],
            opacity: [1, 0],
            scale: [0.8, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: 0.7,
          }}
          className="absolute top-2 w-1 h-1 bg-orange-300 rounded-full blur-[1px]"
        />
      </div>

      {/* Samai Stand (Top Part) */}
      <div className="w-16 h-8 bg-gradient-to-b from-[#FFD700] via-[#D4AF37] to-[#B8860B] rounded-t-full shadow-lg border-x border-t border-white/20" />
      <div className="w-4 h-20 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] shadow-inner" />
    </div>
  );
}