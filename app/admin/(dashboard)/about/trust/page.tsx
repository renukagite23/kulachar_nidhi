'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, ChevronRight, ArrowLeft, MessageSquare, Shield } from 'lucide-react';
import PresidentMessageForm from '@/app/admin/(dashboard)/about/trust/PresidentMessageForm';
import TrusteeManagement from '@/app/admin/(dashboard)/about/trust/TrusteeManagement';

type Section = 'none' | 'president' | 'trustees';

export default function AboutTrustPage() {
    const [activeSection, setActiveSection] = useState<Section>('none');

    const sections = [
        {
            id: 'president',
            title: 'President Message',
            description: 'Manage the official message and profile of the Trust President.',
            icon: MessageSquare,
            color: 'bg-orange-500',
            textColor: 'text-orange-500',
            bgLight: 'bg-orange-50'
        },
        {
            id: 'trustees',
            title: 'Board of Trustees',
            description: 'Manage the list of trustees, their designations, and profiles.',
            icon: Shield,
            color: 'bg-blue-500',
            textColor: 'text-blue-500',
            bgLight: 'bg-blue-50'
        }
    ];

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
                {activeSection === 'none' ? (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-3xl font-black text-secondary tracking-tight">About Trust</h1>
                            <p className="text-muted-foreground text-sm mt-1 font-medium italic">Manage the trust's leadership and official communications.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id as Section)}
                                    className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all text-left overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 ${section.bgLight} rounded-bl-[5rem] -mr-8 -mt-8 transition-transform group-hover:scale-110`} />

                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 ${section.bgLight} ${section.textColor} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                                            <section.icon className="w-7 h-7" />
                                        </div>

                                        <h3 className="text-2xl font-black text-secondary mb-2 group-hover:text-primary transition-colors">
                                            {section.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[280px]">
                                            {section.description}
                                        </p>

                                        <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                            Manage Section <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <button
                            onClick={() => setActiveSection('none')}
                            className="flex items-center gap-2 text-sm font-black text-secondary/60 hover:text-primary transition-colors mb-4 group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to About Trust
                        </button>

                        {activeSection === 'president' && <PresidentMessageForm />}
                        {activeSection === 'trustees' && <TrusteeManagement />}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
