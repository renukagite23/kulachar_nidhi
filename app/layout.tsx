import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import ReduxProvider from "@/redux/provider";

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
  title: "Shri Kulaswamini Ekavira Devi Mandir Trust",
  description: "Official portal for Shri Kulaswamini Ekavira Devi Mandir Trust, Jaitapur",
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
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}