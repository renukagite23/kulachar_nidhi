'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function TrusteesPage() {
  const { t, lang } = useLanguage();
  const [trustees, setTrustees] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchTrustees();
  }, []);

  const fetchTrustees = async () => {
    try {
      const res = await fetch('/api/about/trustees');
      const data = await res.json();
      if (Array.isArray(data)) {
        setTrustees(data);
      }
    } catch (error) {
      console.error('Error fetching trustees:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalized = (item: any) => {
    const langKey = lang === 'en' ? 'english' : 'marathi';
    return item[langKey] || item.english;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full" />
            <div className="h-4 w-32 bg-gray-100 rounded" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Row logic: 2, 3, 3, 1
  const row1 = trustees.slice(0, 2);
  const row2 = trustees.slice(2, 5);
  const row3 = trustees.slice(5, 8);
  const row4 = trustees.slice(8, 9);
  const remaining = trustees.slice(9);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />

      <main className="flex-grow py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-24">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-black text-[#A02020] mb-4 tracking-tight"
            >
              {lang === 'mr' ? 'अध्यक्ष व विश्वस्त मंडळ' : 'President & Board of Trustees'}
            </motion.h1>
            <div className="h-[3px] w-32 bg-[#A02020]/20 mx-auto rounded-full relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-12 bg-[#A02020]/40 rounded-full" />
            </div>
          </div>

          {trustees.length > 0 ? (
            <div className="space-y-16">

              {/* Row 1: 2 items (Large) */}
              {row1.length > 0 && (
                <div className="flex flex-wrap justify-center gap-16 md:gap-32">
                  {row1.map((trustee, idx) => (
                    <TrusteeCard
                      key={trustee._id}
                      data={getLocalized(trustee)}
                      image={trustee.image}
                      large
                      index={idx}
                    />
                  ))}
                </div>
              )}

              {/* Row 2: 3 items */}
              {row2.length > 0 && (
                <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                  {row2.map((trustee, idx) => (
                    <TrusteeCard
                      key={trustee._id}
                      data={getLocalized(trustee)}
                      image={trustee.image}
                      index={idx + 2}
                    />
                  ))}
                </div>
              )}

              {/* Row 3: 3 items */}
              {row3.length > 0 && (
                <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                  {row3.map((trustee, idx) => (
                    <TrusteeCard
                      key={trustee._id}
                      data={getLocalized(trustee)}
                      image={trustee.image}
                      index={idx + 5}
                    />
                  ))}
                </div>
              )}

              {/* Row 4: 1 item (Center) */}
              {row4.length > 0 && (
                <div className="flex justify-center">
                  {row4.map((trustee, idx) => (
                    <TrusteeCard
                      key={trustee._id}
                      data={getLocalized(trustee)}
                      image={trustee.image}
                      index={idx + 8}
                    />
                  ))}
                </div>
              )}

              {/* Remaining items in a grid */}
              {remaining.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 pt-16 border-t border-gray-100">
                  {remaining.map((trustee, idx) => (
                    <TrusteeCard
                      key={trustee._id}
                      data={getLocalized(trustee)}
                      image={trustee.image}
                      index={idx + 9}
                    />
                  ))}
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 font-medium italic">No trustee information available.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function TrusteeCard({ data, image, large = false, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center group"
    >
      <div className={`relative mx-auto mb-4 ${large ? 'w-40 h-40 md:w-52 md:h-52' : 'w-32 h-32 md:w-40 md:h-40'}`}>
        <div className="absolute inset-0 rounded-full border-[4px] border-white shadow-lg overflow-hidden ring-1 ring-gray-100 bg-muted">
          <img
            src={image || '/images/dummy1.png'}
            alt={data.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className={`font-bold text-gray-900 leading-tight ${large ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>
          {data.name}
        </h3>
        <p className={`text-gray-500 font-medium whitespace-pre-line max-w-[220px] mx-auto ${large ? 'text-sm md:text-base' : 'text-[10px] md:text-xs'}`}>
          {data.designation}
        </p>
      </div>
    </motion.div>
  );
}
