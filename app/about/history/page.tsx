'use client';

import React from 'react';
import AboutLayout from '@/components/AboutLayout';
import { motion } from 'framer-motion';

export default function HistoryPage() {
  return (
    <AboutLayout title="मंदिराचा इतिहास" bannerImage="/images/bg2.png">

      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12">

        {/* Intro Quote */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary"
        >
          <p className="text-secondary font-semibold italic leading-relaxed">
            “श्री कुलस्वामिनी एकवीरा देवी मंदिर हे जैतापूर (ता. बागलाण, जि. नाशिक) येथील डोंगरावर वसलेले प्राचीन आणि पवित्र मंदिर असून, याला ऐतिहासिक, धार्मिक आणि नैसर्गिक महत्त्व आहे.”
          </p>
        </motion.section>

        {/* Section 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-black text-secondary flex items-center gap-3">
            <span className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-xl text-lg font-bold">1</span>
            प्राचीन संदर्भ आणि पार्श्वभूमी
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            जैतापूर गावाच्या लगत असलेल्या डोंगरावर दोन प्राचीन मंदिरे आहेत –
            दक्षिणाभिमुख श्री एकवीरा देवी मंदिर आणि पूर्वाभिमुख प्राचीन शिव मंदिर.
            ही दोन्ही मंदिरे सुमारे २५० ते ३०० वर्षे जुनी असल्याचा अंदाज आहे.
          </p>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            या डोंगरासमोर महाराष्ट्रातील दुसऱ्या क्रमांकाचे उंच शिखर साल्हेर किल्ला आहे.
            तसेच जवळील मुल्हेर येथे श्री उद्धव महाराजांचे समाधीस्थान आहे, ज्यामुळे
            या परिसराला धार्मिक महत्त्व प्राप्त झाले आहे.
          </p>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            नैसर्गिक सौंदर्य, शांत वातावरण आणि धार्मिक परंपरा यामुळे हा परिसर
            अत्यंत पवित्र मानला जातो.
          </p>

          <img
            src="/devi.png"
            alt="Temple"
            className="w-full h-80 object-cover rounded-2xl shadow-md"
          />
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-black text-secondary flex items-center gap-3">
            <span className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-xl text-lg font-bold">2</span>
            मंदिराची स्थापना व विकास
          </h2>

          <ul className="space-y-3 text-gray-600 text-sm md:text-base">
            <li>• सन 1991 मध्ये एकवीरा देवी मंदिराचा प्राथमिक जीर्णोद्धार करण्यात आला.</li>
            <li>• मंदिर डोंगरावर असल्यामुळे दगडी पायऱ्यांची निर्मिती करण्यात आली.</li>
            <li>• सन 2011 मध्ये मंदिरासाठी २ हेक्टर (५ एकर) जागा शासनाकडून मंजूर झाली.</li>
            <li>• “श्री कुलस्वामिनी एकवीरा देवी भक्तगण मंडळ” विश्वस्त संस्था स्थापन करण्यात आली.</li>
          </ul>

          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'स्थापना कालावधी', value: '२५०–३०० वर्षे' },
              { title: 'जीर्णोद्धार', value: '1991 पासून' },
              { title: 'जमीन', value: '५ एकर' },
              { title: 'स्थान', value: 'जैतापूर, नाशिक' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-muted rounded-xl border text-center">
                <h4 className="text-xs font-bold text-primary mb-1">{item.title}</h4>
                <p className="text-sm font-semibold text-secondary">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Modern Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary text-white p-8 rounded-3xl relative overflow-hidden"
        >
          <div className="relative z-10 space-y-4">
            <h3 className="text-xl md:text-2xl font-black text-accent">
              आधुनिक स्वरूप
            </h3>

            <ul className="text-white/80 text-sm md:text-base space-y-2">
              <li>• प्राचीन शिव मंदिराचे नवीन दगडी बांधकाम सुरू (2026 पासून)</li>
              <li>• गर्भगृह, दर्शन मंडप, सभा मंडप आणि मुखमंडप यांचा समावेश असलेला नवीन आराखडा</li>
              <li>• मंदिर परिसर अधिक सुबक व भक्तांसाठी सोयीस्कर करण्याचे प्रयत्न</li>
            </ul>
          </div>

          <img
            src="/devi.png"
            alt="icon"
            className="absolute right-4 top-4 w-32 opacity-10 brightness-0 invert"
          />
        </motion.section>

      </div>
    </AboutLayout>
  );
}