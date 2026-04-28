'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const festivals = [
    {
        title: 'Sharad Navratri',
        dates: 'September / October',
        description: 'The grandest festival at Mahalakshmi Temple. Nine nights of devotion, dance, and divine worship attract lakhs of devotees from across India.',
        image: '/images/sharad_navratri.png'
    },
    {
        title: 'Diwali Lakshmi Poojan',
        dates: 'October / November',
        description: 'The festival of lights holds special significance here as devotees worship Goddess Lakshmi for wealth and prosperity on Amavasya night.',
        image: '/images/diwali_lakshmi.png'
    },
    {
        title: 'Akshaya Tritiya',
        dates: 'April / May',
        description: 'An auspicious day for new beginnings and investments. Devotees flock to seek Goddess Lakshmi\'s blessings for unending prosperity.',
        image: '/images/akshaya_tritiya.png'
    }
];

export default function FestivalSpotlight() {
    return (
        <section className="py-16 md:py-24 bg-background-[#FDF9F1] relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary-[#4a1011] mb-3 tracking-tight">
                        Festival Spotlight
                    </h2>
                    <p className="text-muted-foreground-[#6b5c54] text-sm md:text-base font-medium">
                        The temple comes alive during these major celebrations
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                    {festivals.map((festival, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 transition-all duration-300 hover:shadow-md"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={festival.image}
                                    alt={festival.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-secondary-[#4a1011] mb-1">
                                    {festival.title}
                                </h3>
                                <p className="text-primary-[#6b5c54] text-xs font-semibold mb-4 tracking-wide">
                                    {festival.dates}
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {festival.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link href="/festivals">
                        <button className="inline-flex items-center justify-center px-6 py-3 rounded-md font-bold text-sm transition-all duration-200 gap-2 bg-primary text-white hover:bg-primary/90 shadow-md">
                            View Festival Calendar <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}


// 'use client';

// import { motion } from 'framer-motion';
// import { Sparkles, CalendarDays } from 'lucide-react';
// import { useLanguage } from '@/lib/LanguageContext';

// export default function FestivalSpotlight() {
//   const { t } = useLanguage();

//   const festivals = [
//     {
//       name: t('festival.navratri'),
//       date: "Oct 3 - Oct 11",
//       desc: t('festival.navratri_desc'),
//       image: "/festival1.jpg"
//     },
//     {
//       name: t('festival.diwali'),
//       date: "Nov 1",
//       desc: t('festival.diwali_desc'),
//       image: "/festival2.jpg"
//     },
//     {
//       name: t('festival.mahalaxmi'),
//       date: "Dec 5",
//       desc: t('festival.mahalaxmi_desc'),
//       image: "/festival3.jpg"
//     }
//   ];

//   return (
//     <section id="festivals" className="py-16 md:py-20 bg-background relative overflow-hidden">

//       {/* Background */}
//       <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
//         <img src="/devi.png" className="w-full h-full object-cover" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 relative z-10">

//         {/* Heading */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <Sparkles className="w-4 h-4 text-primary" />
//             <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
//               {t('festival.badge')}
//             </span>
//           </div>

//           <h2 className="text-3xl md:text-4xl font-black text-secondary">
//             {t('festival.title')}
//           </h2>

//           <p className="text-muted-foreground text-sm mt-2">
//             {t('festival.subtitle')}
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {festivals.map((fest, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.2 }}
//               viewport={{ once: true }}
//               className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition overflow-hidden"
//             >
//               <img src={fest.image} className="h-48 w-full object-cover" />

//               <div className="p-5">
//                 <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-2">
//                   <CalendarDays className="w-4 h-4" />
//                   {fest.date}
//                 </div>

//                 <h3 className="text-lg font-bold text-secondary">
//                   {fest.name}
//                 </h3>

//                 <p className="text-sm text-muted-foreground mt-2">
//                   {fest.desc}
//                 </p>

//                 <button className="mt-4 spiritual-button w-full text-xs">
//                   {t('festival.view')}
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }