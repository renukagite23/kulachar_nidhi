import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import ReduxProvider from "@/redux/provider";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Shri Mahalakshmi Temple Trust",
  description: "Official portal for Shri Mahalakshmi Temple Trust",
};
export default function RootLayout({ children }: any) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <LanguageProvider>
            {children}
            <ChatWidget />
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}