'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, History, Heart, Shield } from 'lucide-react';

export default function WelcomeSection() {
  const features = [
    { icon: History, title: 'प्राचीन वारसा', desc: '1831 पासून मुंबईच्या आध्यात्मिक जीवनाचा आधारस्तंभ.' },
    { icon: Heart, title: 'भक्ती मार्ग', desc: 'देवी महालक्ष्मीच्या आशीर्वादाने जीवनात समृद्धी.' },
    { icon: Shield, title: 'ट्रस्ट उपक्रम', desc: 'भक्तांच्या सुविधेसाठी व धर्मादाय कार्यासाठी कार्यरत.' },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">देवी महालक्ष्मीच्या निवासस्थानात आपले स्वागत आहे</h2>
          <p className="section-subtitle">मुंबईच्या हृदयातील एक पवित्र तीर्थस्थान</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-border">
              <img src="/devi.png" alt="Temple Interior" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-border hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary">दिव्य कृपा</p>
                  <p className="text-[10px] text-muted-foreground">अनेक वर्षांपासून अखंडित</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-secondary leading-tight">दिव्य कृपेचे मंदिर व <br /> समृद्ध आध्यात्मिक परंपरा</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                श्री महालक्ष्मी मंदिर मुंबईतील महालक्ष्मी येथे भुलाभाई देसाई रोडवर भव्यतेने विराजमान आहे. हे आदरणीय मंदिर देवी महालक्ष्मी यांना समर्पित आहे, ज्या देवी महाकाली व देवी महासरस्वती यांच्यासह मुख्य देवता म्हणून विराजमान आहेत.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-secondary">{f.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button className="spiritual-button-secondary !px-8 !py-4 shadow-lg shadow-secondary/10">
                संपूर्ण इतिहास वाचा <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
