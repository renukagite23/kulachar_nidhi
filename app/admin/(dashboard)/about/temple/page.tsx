'use client';

import React, { useState } from 'react';
import { History, MapPin } from 'lucide-react';
import HistoryForm from './HistoryForm';
import ReachForm from './ReachForm';

export default function AboutTemplePage() {
    const [activeSection, setActiveSection] = useState<'history' | 'reach'>('history');

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-secondary tracking-tight">ABOUT TEMPLE</h1>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">Global Information Management</p>
                </div>

                <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
                    <button
                        onClick={() => setActiveSection('history')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === 'history'
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-muted-foreground hover:bg-gray-50'
                            }`}
                    >
                        <History className="w-3 h-3" />
                        Temple History
                    </button>
                    <button
                        onClick={() => setActiveSection('reach')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === 'reach'
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-muted-foreground hover:bg-gray-50'
                            }`}
                    >
                        <MapPin className="w-3 h-3" />
                        How to Reach
                    </button>
                </div>
            </div>

            {/* Form Rendering */}
            {activeSection === 'history' ? <HistoryForm /> : <ReachForm />}
        </div>
    );
}
