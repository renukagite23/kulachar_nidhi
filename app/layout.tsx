<<<<<<< Updated upstream
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import ReduxProvider from '@/redux/provider';
=======
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import ChatWidget from "@/components/ChatWidget";
>>>>>>> Stashed changes


export default function RootLayout({ children }: any) {
  return (
<<<<<<< Updated upstream
    <html lang="en">
      <body>
        <ReduxProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ReduxProvider>
=======
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
          <ChatWidget />
        </LanguageProvider>
>>>>>>> Stashed changes
      </body>
    </html>
  );
}