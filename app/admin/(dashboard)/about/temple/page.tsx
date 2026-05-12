'use client';

import React from 'react';
import { Construction, Info } from 'lucide-react';

export default function AboutTemplePage() {
    return (
        <div className="p-8 max-w-7xl mx-auto h-full flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6 animate-pulse">
                <Construction className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black text-secondary tracking-tight">About Temple Module</h1>
            <p className="text-muted-foreground text-sm mt-2 font-medium max-w-md">
                This module is under development and will allow you to manage the temple's history, architecture, and religious significance.
            </p>
        </div>
    );
}
