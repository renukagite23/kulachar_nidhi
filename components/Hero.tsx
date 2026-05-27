'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  Phone,
  Calendar,
  ArrowRight,
} from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  const infoItems = [
    {
      icon: Clock,
      label: t('hero.info.darshan'),
      value: t('hero.info.darshan_time'),
    },
    {
      icon: Calendar,
      label: t('hero.info.next_aarti'),
      value: t('hero.info.next_aarti_time'),
    },
    {
      icon: Phone,
      label: t('hero.info.contact'),
      value: t('hero.info.phone'),
    },
    {
      icon: MapPin,
      label: t('hero.info.location'),
      value: t('hero.info.place'),
    },
  ];

  return (
    <div className="relative md:h-[65vh] overflow-hidden bg-background pt-0">

      {/* DESKTOP IMAGE */}
      <div className="hidden md:block md:absolute md:inset-0 z-0 md:left-auto md:right-0 md:w-[60%] lg:w-[50%] md:h-full bg-white">

        <img
          src="/devi.png"
          alt="Ekavira Devi"
          className="w-full h-full object-cover object-center object-[80%_center] opacity-100"
        />

        {/* Desktop Left Fade */}
        <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-background via-background/70 to-transparent" />

        {/* Desktop Right Fade */}
        <div className="absolute right-0 top-0 h-full w-[10%] bg-gradient-to-l from-black/10 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-24 md:pt-0 pb-10 md:pb-0 text-center md:text-left flex flex-col items-center md:items-start justify-center min-h-[520px] md:min-h-[65vh]">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl flex flex-col items-center md:items-start"
        >

          {/* MANTRA */}
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3 w-full">
            <div className="h-px w-6 bg-primary" />

            <span className="text-primary font-bold tracking-[0.2em] text-[10px] md:text-[9px] uppercase">
              {t('hero.mantra')}
            </span>

            <div className="h-px w-6 bg-primary md:hidden" />
          </div>

          {/* HEADING */}
          <h1 className="text-[2rem] leading-[1.2] md:text-5xl font-black text-secondary tracking-tight md:leading-[1.1] mb-3 text-center md:text-left">
            {t('hero.title_1')}
            <br />

            <span className="text-primary">
              {t('hero.title_2')}
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="text-secondary/80 text-sm md:text-base font-medium mb-6 leading-relaxed max-w-[280px] md:max-w-lg mx-auto md:mx-0 text-center md:text-left">
            {t('hero.subtitle')}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto mt-2">

            <Link
              href="/donation"
              className="spiritual-button !px-6 !py-3 text-sm md:text-base w-full sm:w-auto shadow-lg shadow-primary/20 flex items-center justify-center"
            >
              {t('hero.cta_donate')}

              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <Link
              href="/about/schedule"
              className="spiritual-button-outline !px-6 !py-3 text-sm md:text-base w-full sm:w-auto hover:bg-white flex items-center justify-center"
            >
              {t('hero.cta_darshan')}
            </Link>

          </div>
        </motion.div>
      </div>

      {/* INFO BAR */}
      <div className="relative md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2 z-10 w-full max-w-4xl px-4 mt-4 md:mt-0 pb-6 md:pb-0 mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4"
        >

          {infoItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 ${
                index !== infoItems.length - 1
                  ? 'md:border-r border-border/50'
                  : ''
              } px-2`}
            >

              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                <item.icon className="w-4 h-4" />
              </div>

              <div className="flex flex-col min-w-0">

                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                  {item.label}
                </span>

                <span className="text-[13px] font-bold text-secondary truncate">
                  {item.value}
                </span>

              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* MOBILE DEVI IMAGE BELOW INFO BAR */}
      <div className="relative h-[38vh] min-h-[260px] w-full md:hidden mt-2">

        <img
          src="/devi.png"
          alt="Ekavira Devi"
          className="w-full h-full object-contain object-top scale-110 opacity-100"
        />

        {/* Mobile Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

    </div>
  );
}

// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { useLanguage } from '@/lib/LanguageContext';
// import { motion } from 'framer-motion';
// import { Clock, MapPin, Phone, Calendar, ArrowRight } from 'lucide-react';

// export default function Hero() {
//   const { t } = useLanguage();

//   const infoItems = [
//     {
//       icon: Clock,
//       label: t('hero.info.darshan'),
//       value: t('hero.info.darshan_time'),
//     },
//     {
//       icon: Calendar,
//       label: t('hero.info.next_aarti'),
//       value: t('hero.info.next_aarti_time'),
//     },
//     {
//       icon: Phone,
//       label: t('hero.info.contact'),
//       value: t('hero.info.phone'),
//     },
//     {
//       icon: MapPin,
//       label: t('hero.info.location'),
//       value: t('hero.info.place'),
//     },
//   ];

//   return (
//     <section className="relative overflow-hidden bg-background md:h-[65vh]">

//       {/* CONTENT */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-0 pb-10 md:pb-0 flex flex-col justify-center min-h-[650px] md:min-h-full">

//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-2xl flex flex-col items-center md:items-start text-center md:text-left"
//         >

//           {/* MANTRA */}
//           <div className="flex items-center justify-center md:justify-start gap-2 mb-3 w-full">
//             <div className="h-px w-6 bg-primary" />

//             <span className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase">
//               {t('hero.mantra')}
//             </span>

//             <div className="h-px w-6 bg-primary md:hidden" />
//           </div>

//           {/* HEADING */}
//           <h1 className="text-[2.2rem] sm:text-[2.5rem] leading-[1.3] md:text-5xl font-extrabold text-secondary mb-4">
//             {t('hero.title_1')}
//             <br />

//             <span className="text-primary">
//               {t('hero.title_2')}
//             </span>
//           </h1>

//           {/* SUBTITLE */}
//           <p className="text-secondary/80 text-sm md:text-base font-medium mb-6 leading-relaxed max-w-[320px] md:max-w-lg">
//             {t('hero.subtitle')}
//           </p>

//           {/* BUTTONS */}
//           <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto">

//             <Link
//               href="/donation"
//               className="spiritual-button !px-6 !py-3 text-sm md:text-base w-full sm:w-auto shadow-lg shadow-primary/20 flex items-center justify-center"
//             >
//               {t('hero.cta_donate')}

//               <ArrowRight className="w-4 h-4 ml-2" />
//             </Link>

//             <Link
//               href="/about/schedule"
//               className="spiritual-button-outline !px-6 !py-3 text-sm md:text-base w-full sm:w-auto hover:bg-white flex items-center justify-center"
//             >
//               {t('hero.cta_darshan')}
//             </Link>

//           </div>
//         </motion.div>
//       </div>

//       {/* INFO BAR */}
//       <div className="relative z-20 w-full max-w-4xl mx-auto px-4 pb-8 md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2">

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="bg-white/80 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4"
//         >

//           {infoItems.map((item, index) => (
//             <div
//               key={index}
//               className={`flex items-center gap-3 px-2 ${
//                 index !== infoItems.length - 1
//                   ? 'md:border-r border-border/50'
//                   : ''
//               }`}
//             >

//               <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
//                 <item.icon className="w-4 h-4" />
//               </div>

//               <div className="flex flex-col min-w-0">
//                 <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
//                   {item.label}
//                 </span>

//                 <span className="text-[13px] font-bold text-secondary truncate">
//                   {item.value}
//                 </span>
//               </div>

//             </div>
//           ))}
//         </motion.div>
//       </div>

//     </section>
//   );
// }
// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { useLanguage } from '@/lib/LanguageContext';
// import { motion } from 'framer-motion';
// import { Clock, MapPin, Phone, Calendar, ArrowRight } from 'lucide-react';

// export default function Hero() {
//   const { t } = useLanguage();

//   const infoItems = [
//     { icon: Clock, label: t('hero.info.darshan'), value: t('hero.info.darshan_time') },
//     { icon: Calendar, label: t('hero.info.next_aarti'), value: t('hero.info.next_aarti_time') },
//     { icon: Phone, label: t('hero.info.contact'), value: t('hero.info.phone') },
//     { icon: MapPin, label: t('hero.info.location'), value: t('hero.info.place') },
//   ];

//   return (
//     <div className="relative h-[620px] md:h-[65vh] flex flex-col md:justify-center bg-background pt-16 md:pt-0">

//       {/* Content */}
//       <div className="order-1 md:order-none relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full pb-6 md:py-0 text-center md:text-left flex flex-col items-center md:items-start shrink-0">
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full md:max-w-2xl flex flex-col items-center md:items-start"
//         >
//           {/* Mantra */}
//           <div className="flex items-center justify-center md:justify-start gap-2 mb-3 w-full">
//             <div className="h-px w-6 bg-primary" />
//             <span className="text-primary font-bold tracking-[0.2em] text-[10px] md:text-[9px] uppercase">
//               {t('hero.mantra')}
//             </span>
//             <div className="h-px w-6 bg-primary md:hidden" />
//           </div>

//           {/* Heading */}
//           <h1 className="text-[2.2rem] sm:text-[2.4rem] leading-[1.35] md:text-5xl font-extrabold text-secondary tracking-normal md:tracking-tight md:leading-[1.1] mb-5 text-center md:text-left px-2">
//             {t('hero.title_1')} <br />
//             <span className="text-primary">{t('hero.title_2')}</span>
//           </h1>

//           {/* Subtitle */}
//           <p className="text-secondary/80 text-sm md:text-base font-medium mb-6 leading-relaxed max-w-[280px] md:max-w-lg mx-auto md:mx-0 text-center md:text-left">
//             {t('hero.subtitle')}
//           </p>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto mt-2">
//             <Link
//               href="/donation"
//               className="spiritual-button !px-6 !py-3 text-sm md:text-base w-full sm:w-auto shadow-lg shadow-primary/20 flex items-center justify-center"
//             >
//               {t('hero.cta_donate')}
//               <ArrowRight className="w-4 h-4 ml-2" />
//             </Link>

//             <Link
//               href="/about/schedule"
//               className="spiritual-button-outline !px-6 !py-3 text-sm md:text-base w-full sm:w-auto hover:bg-white flex items-center justify-center"
//             >
//               {t('hero.cta_darshan')}
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       {/* Info Bar */}
//       <div className="order-2 md:order-none relative md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2 z-10 w-full max-w-4xl px-4 mx-auto md:mx-0 mb-6 md:mb-0">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="bg-white/80 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4"
//         >
//           {infoItems.map((item, index) => (
//             <div
//               key={index}
//               className={`flex items-center gap-3 ${index !== infoItems.length - 1 ? 'md:border-r border-border/50' : ''
//                 } px-2`}
//             >
//               <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
//                 <item.icon className="w-4 h-4" />
//               </div>

//               <div className="flex flex-col min-w-0">
//                 <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
//                   {item.label}
//                 </span>
//                 <span className="text-[13px] font-bold text-secondary truncate">
//                   {item.value}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Image Section */}
//       <div className="order-3 md:order-none relative h-[35vh] min-h-[220px] w-full md:absolute md:inset-0 z-0 md:left-auto md:right-0 md:w-[60%] lg:w-[50%] md:h-full bg-transparent md:bg-white shrink-0 mt-2 md:mt-0">
//         <img
//           src="/devi.png"
//           alt="Ekavira Devi"
//           className="w-full h-full object-contain object-bottom md:object-cover md:object-center md:object-[80%_center] opacity-100"
//         />

//         {/* Mobile Gradient */}
//         <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent md:hidden" />

//         {/* Desktop Left Fade */}
//         <div className="absolute inset-y-0 left-0 w-full md:w-[40%] bg-gradient-to-r from-background via-background/70 to-transparent hidden md:block" />

//         {/* Subtle cinematic right fade */}
//         <div className="absolute right-0 top-0 h-full w-[10%] bg-gradient-to-l from-black/10 to-transparent hidden md:block" />
//       </div>
//     </div>
//   );
// }
