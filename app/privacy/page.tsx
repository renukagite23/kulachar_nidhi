'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useLanguage } from '../../lib/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />

      <main className="flex-grow py-20 max-w-4xl mx-auto px-4 w-full">
        <h1 className="text-4xl font-black text-secondary mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none space-y-6 text-gray-600 font-medium leading-relaxed">
          <p>
            Shri Mahalakshmi Temple Trust ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information.
          </p>

          <h2 className="text-2xl font-blaccondary pt-4">1. Information Collection</h2>
          <p>
            We collect information you provide directly to us, such as when you make a donation, register for a pooja, or contact us. This may include your name, email address, phone number, and pan card details for 80G tax exemptions.
          </p>

          <h2 className="text-2xl font-black text-secondary pt-4">2. Use of Information</h2>
          <p>
            We use the information we collect to process donations, send receipts, manage pooja registrations, and communicate with you about our activities and events.
          </p>

          <h2 className="text-2xl font-black text-secondary pt-4">3. Data Protection</h2>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no data transmission over the internet can be guaranteed as 100% secure.
          </p>

          <h2 className="text-2xl font-black text-secondary pt-4">4. Third-Party Sharing</h2>
          <p>
            We do not sell your personal information. We may share information with trusted third-party service providers who assist us in our operations (e.g., payment gateways), subject to confidentiality agreements.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
