'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />
      
      <main className="flex-grow py-20 max-w-4xl mx-auto px-4 w-full">
        <h1 className="text-4xl font-black text-secondary mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none space-y-6 text-gray-600 font-medium leading-relaxed">
          <p>
            By using the website of Shri Kulaswamini Ekavira Devi Mandir Trust, you agree to comply with and be bound by the following terms and conditions.
          </p>
          
          <h2 className="text-2xl font-black text-secondary pt-4">1. Acceptance of Terms</h2>
          <p>
            Access to and use of this website are subject to these Terms of Service and all applicable laws. If you do not agree with any part of these terms, you must not use our website.
          </p>

          <h2 className="text-2xl font-black text-secondary pt-4">2. Donations</h2>
          <p>
            All donations made through this website are final and non-refundable. Please ensure that you provide accurate information for tax-exempt receipts (80G).
          </p>

          <h2 className="text-2xl font-black text-secondary pt-4">3. Intellectual Property</h2>
          <p>
            All content on this website, including text, images, logos, and design, is the property of Shri Kulaswamini Ekavira Devi Mandir Trust and is protected by copyright laws. Unauthorized use of any content is prohibited.
          </p>

          <h2 className="text-2xl font-black text-secondary pt-4">4. Code of Conduct</h2>
          <p>
            Users are expected to behave respectfully when interacting with the website and its services. Any misuse, such as hacking or spamming, will result in immediate termination of access.
          </p>

          <h2 className="text-2xl font-black text-secondary pt-4">5. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
