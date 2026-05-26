'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function AartiSchedule() {
  const { t } = useLanguage();

  const schedule = [
    {
      name: t('aarti.morning'),
      time: '6:45 AM',
      desc: t('aarti.morning'),
    },
    {
      name: t('aarti.naivedya'),
      time: '11:45 AM',
      desc: t('aarti.naivedya'),
    },
    {
      name: t('aarti.dhoop'),
      time: '6:15 PM',
      desc: t('aarti.dhoop'),
    },
    {
      name: t('aarti.shej'),
      time: '7:20 PM',
      desc: t('aarti.shej'),
    },
  ];

  return (
    <section className="relative overflow-hidden">

      {/* Background */}
      <div
        className="
          absolute inset-0
          bg-no-repeat
          bg-cover
          bg-[position:35%_center]
          md:bg-center
        "
        style={{
          backgroundImage: "url('/images/aarti_background.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Main Content */}
      <div className="relative z-10 h-[440px] sm:h-[500px] md:min-h-[650px]">

        {/* Horizontal Layout */}
        <div className="flex flex-row h-full items-center">

          {/* Left Space For Samai */}
          <div className="w-[45%] md:w-1/2" />

          {/* Right Content */}
          <div
            className="
              w-[55%]
              md:w-1/2
              flex
              items-center
              pr-2
              md:pr-8
            "
          >

            <div className="w-full max-w-[520px]">

              {/* Header */}
              <div className="mb-3 md:mb-8">

                <div className="flex items-center gap-2 mb-2">

                  <div className="w-2 h-2 rounded-full bg-orange-300" />

                  <span
                    className="
                      text-orange-200
                      text-[8px]
                      sm:text-[9px]
                      md:text-xs
                      font-semibold
                      tracking-[0.25em]
                      uppercase
                    "
                  >
                    {t('aarti.badge')}
                  </span>

                </div>

                <h2
                  className="
                    text-white
                    text-lg
                    sm:text-2xl
                    md:text-5xl
                    font-black
                    leading-tight
                  "
                >
                  {t('aarti.title')}
                </h2>

              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-2.5">

                {schedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >

                    <div
                      className="
                        bg-white/95
                        backdrop-blur-md
                        rounded-xl
                        md:rounded-2xl
                        p-2.5
                        md:p-5
                        border border-orange-100
                        shadow-xl
                        h-full
                      "
                    >

                      <div className="flex flex-col justify-between h-full">

                        {/* Text */}
                        <div>

                          <h3
                            className="
                              text-gray-800
                              font-bold
                              text-[11px]
                              sm:text-sm
                              md:text-xl
                              leading-tight
                            "
                          >
                            {item.name}
                          </h3>

                          <p
                            className="
                              text-gray-500
                              text-[9px]
                              sm:text-[10px]
                              md:text-sm
                              mt-1
                            "
                          >
                            {item.desc}
                          </p>

                        </div>

                        {/* Time */}
                        <span
                          className="
                            text-orange-600
                            font-bold
                            text-[11px]
                            sm:text-sm
                            md:text-lg
                            mt-3
                          "
                        >
                          {item.time}
                        </span>

                      </div>

                    </div>

                  </motion.div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}