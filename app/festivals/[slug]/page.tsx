'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CalendarDays, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function FestivalDetail() {
    const params = useParams();
    const slug = params?.slug as string;

    const festivalDetails: Record<string, { title: string; subtitle: string; date: string; image: string; content: string }> = {
        navratri: {
            title: "शारदीय नवरात्र उत्सव",
            subtitle: "Nine days of devotion, music, and divine celebration",
            date: "September / October",
            image: "/images/devi3.png",
            content: `सप्तशृंग गडावर दरवर्षी अश्विन शुद्ध म्हणजेच सप्टेंबर / ऑक्टोबर महिन्यात शारदीय नवरात्र उत्सव साजरा केला जातो. नऊ दिवस चालणाऱ्या नवरात्र उत्सवाची सांगता नवमीच्या हवनाची पुर्णाहुती दुसऱ्या दिवशी दसऱ्याला देऊन होते. या दिवशी देवीच्या यथासांग पूजे बरोबर शस्त्र पूजाही केली जाते. नवरात्रातील सप्तमीस म्हणजेच सातव्या माळेला गडावर मोठ्या प्रमाणात भाविकांची गर्दी होते. सप्तमीला आई सप्तशृंगीचे दर्शन घेतल्याने आपल्या सगळ्या चिंता दूर होतात. या भावनेने भाविक गडावर दर्शन घेण्यासाठी येतात. सप्तमीला सप्तशृंगगडावर सप्तशृंगी आईचा वास असतो असेही म्हंटल जातं.`
        },
        chaitra: {
            title: "चैत्र नवरात्र उत्सव",
            subtitle: "Festival of lights seeking wealth and prosperity",
            date: "October / November",
            image: "/devi.png",
            content: `चैत्रोत्सवास चैत्र शुद्ध म्हणजेच मार्च / एप्रिल महिन्यात रामनवमी पासून गडावर चैत्र उत्सव प्रारंभ होतो. हा उत्सव साधारणतः दहा ते बारा दिवस सुरु राहतो. या उत्सवात आईचं माहेर म्हणवल्या जाणाऱ्या खान्देशातून लाखो संख्येने भाविक गडावर पायी येतात. अडीचशे किंवा त्याहून जास्त किलो मीटर पायी प्रवास करुन आईच्या दर्शनास येणाऱ्या या भाविकांची मिलन सोहळा पाहण्यासारखा असतो. या उत्सवात चौदस म्हणजेच चतुर्दशीच्या (खान्देशातील भाविक चतुर्दशीला चौदस असे म्हणतात) दिवशी खान्देशवासी मोठ्या संख्येने आईचं दर्शन घेतात व दुसऱ्या दिवशी असणाऱ्या पौर्णिमेस घराकडे परततात. सप्तशृंगगडावर चैत्र उत्सवास लाखोंच्या संख्येत भाविक दर्शनास येतात.`
        },
        dhanurmas: {
            title: "धनुर्मास उत्सव",
            subtitle: "Holy month for new beginnings and unending prosperity",
            date: "April / May",
            image: "/images/devi2about.png",
            content: `धनुर्मासात विशेष पूजा आणि धार्मिक कार्यक्रम होतात. या महिन्यात पहाटे उठून देवाची आराधना करणे अत्यंत शुभ मानले जाते. या काळात भाविक मोठ्या संख्येने मंदिरात येतात आणि विशेष पूजा अर्चना करतात.`
        }
    };

    const fest = festivalDetails[slug];

    if (!fest) {
        return (
            <div className="bg-[#FFFDF9] min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-secondary mb-4">Festival not found</h2>
                        <Link href="/festivals" className="spiritual-button inline-flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Events
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-[#FFFDF9] min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-10 pb-6 md:pt-12 md:pb-8 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <img src="/devi.png" alt="Decorative" className="w-full h-full object-cover" />
                </div>
                
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <Link href="/festivals" className="inline-flex items-center text-sm font-semibold text-primary mb-4 hover:opacity-80 transition-opacity">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
                    </Link>
                    
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-3 h-3 text-primary" />
                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                    Divine Event
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-4xl font-black text-secondary tracking-tight mb-3 leading-tight">
                                {fest.title}
                            </h1>
                            <p className="text-sm md:text-base text-muted-foreground mb-4">
                                {fest.subtitle}
                            </p>
                            
                            <div className="flex items-center gap-2 bg-white/50 border border-border/50 py-2 px-4 rounded-full inline-flex shadow-sm">
                                <CalendarDays className="w-4 h-4 text-primary" />
                                <span className="font-bold text-secondary text-xs">{fest.date}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative h-[180px] md:h-[250px] rounded-3xl overflow-hidden shadow-2xl border border-border/50"
                        >
                            <img
                                src={fest.image}
                                alt={fest.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 bg-white flex-1 mb-8">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-secondary mb-3">{fest.title}-</h2>
                        
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base text-justify">
                            {fest.content}
                        </p>
                        
                        {/* A thin divider line to match the second screenshot layout where festivals are separated by a line */}
                        <div className="h-px bg-border/50 w-full mt-12"></div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}