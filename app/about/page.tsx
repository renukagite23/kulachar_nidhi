'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Quote, Award, Building2, Users2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-secondary text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover scale-110" />
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
            >
              आमच्याबद्दल
            </motion.h1>
            <p className="text-accent font-bold uppercase tracking-[0.3em] text-sm">About the Trust</p>
          </div>
        </section>

        {/* President's Message Section */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            
            {/* Text Content */}
            <div className="md:col-span-8 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-secondary mb-2 flex items-center gap-3">
                  अध्यक्षांचे मनोगत-
                  <div className="h-1 w-20 bg-primary/20 rounded-full" />
                </h2>
                <div className="w-full h-px bg-border mt-4" />
              </div>

              <div className="space-y-6 text-secondary/80 leading-relaxed text-base italic font-medium">
                <p>
                  श्री महालक्ष्मी देवी मातेच्या कृपा - आशीर्वाद, भक्तजनांनी केलेला उदोकार, सद् विचार, सद् क्रिया अशा सत्शील – सत्त्वशील भावस्थितीचा हा गौरव... 
                </p>
                <p>
                  दिनांक २२ सप्टेंबर, १९७६ रोजी श्री महालक्ष्मी देवी ट्रस्टच्या विश्वस्त संस्थेचे प्रथम विश्वस्त मंडळ कार्यरत होऊन भव्यदिव्य असा प्रवास सुरु झाला. भाविकांची भक्ती, श्री महालक्ष्मी मातेचे चिरंतन अस्तित्व, आणि निसर्गरम्य आनंदक्षेत्र असा हा प्रवास आहे. 
                </p>
                <p>
                  जगभरातून दरवर्षी ४५ ते ५० लाख भाविक भक्त येतात. तीर्थक्षेत्र आणि पर्यटनक्षेत्र यांचा पवित्र संगम. भाविकांची उत्तम सोय व्हावी, ही सदिच्छा असते. सोयी - सुविधा वाढाव्यात, क्षेत्राचे पवित्र आणि महात्म्य टिकावे ही विश्वस्त संस्थेची धारणा आहे.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-primary mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" /> काही महत्त्वपूर्ण निर्मिती-
                  </h3>
                  <p className="text-secondary/70 leading-relaxed">
                    श्री महालक्ष्मी मंदिर जीर्णोद्धार, पाय-या बांधकाम, भव्य प्रवेशद्वार, भाविकांसाठी चिंतन सभागृह, भक्तांगण, भक्तनिवास, प्रसाहालय अन्नपूर्णा, धर्मार्थ दवाखाना, शिवालय तलाव जिर्णोद्धार, मंदिर क्षेत्रापर्यंत पेयजल, गडावरील अंतर्गत रस्त्यांचे कॉक्रीटीकरण, विद्युत पुरवठ्यासाठी तीन जनरेटरची सोय.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-black text-primary mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5" /> कर्मचारी निवासस्थाने-
                  </h3>
                  <p className="text-secondary/70 leading-relaxed">
                    भक्तनिवास विस्तारासाठी जमीन मिळवण्याचे प्रयत्न. यवनाल्याकडे प्रस्ताव, सकारात्मक कृती. आध्यात्मिक आनंद साधण्यासाठी मंदिर सुशोभीकरण, शैक्षणिक संस्था निर्मिती, क्षेत्र शांतता, उदात्तता आणि पवित्रता यांच्यानिर्मितीचे विविध कृतिकार्यक्रम आणि विस्तार कार्य.
                  </p>
                </div>
              </div>

              <div className="bg-muted p-8 rounded-3xl border border-border italic text-secondary/60 text-sm">
                "विश्वस्त संस्थेचे विविध भाविक देणगीदार यांच्या दातृत्वाचे स्मरण आहेच. देणगीदारांची नावे म्हणजे त्यांच्या दातृत्वाचा आदर – प्रकटीकरण होय. शासकीय सहकार्य, शासकीय निर्णय आणि शासकीय यंत्रणांची साथ, संगत - सोबत उल्लेखनीय आहे. विश्वस्त संस्थेचेदैनंदिन कामकाज सुरळीत ठेवण्यासाठी प्रयत्न अधिकारी वर्ग तत्परतेने करीत आहेत."
              </div>

              <div className="text-right pt-8">
                <p className="text-xl font-black text-secondary">मा. श्री बी.डी.चव्हाण</p>
                <p className="text-sm font-bold text-primary italic">अध्यक्ष,</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">श्री महालक्ष्मी देवी ट्रस्ट, मुंबई</p>
              </div>
            </div>

            {/* President Image */}
            <div className="md:col-span-4 sticky top-24">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform translate-x-4 translate-y-4 -z-10" />
                <div className="overflow-hidden rounded-[3.5rem] shadow-2xl border-4 border-white aspect-[3/4]">
                  <img 
                    src="/temple_trustee_portrait_1777380351934.png" 
                    alt="Trust President" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image Caption/Badge */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-2xl shadow-xl border border-border w-[90%] text-center">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Preserving Legacy</p>
                  <p className="text-xs font-bold text-secondary italic">Trustees Mandate since 1976</p>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Quick Stats / Info Row */}
        <section className="bg-muted py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'वार्षिक भाविक', value: '५० लाख+', icon: Users2 },
                { label: 'स्थापना वर्ष', value: '१९७६', icon: Building2 },
                { label: 'कर्मचारी', value: '२५०+', icon: Users2 },
                { label: 'अन्नपूर्णा प्रसालय', value: 'मोफत', icon: Award },
              ].map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4 text-primary group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <p className="text-2xl font-black text-secondary">{item.value}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
