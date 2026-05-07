'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageToggle() {
    const { lang, setLang } = useLanguage();

    return (
        <div className="flex gap-2">
            <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-lg text-sm font-bold ${lang === 'en'
                        ? 'bg-primary text-white'
                        : 'bg-muted text-secondary'
                    }`}
            >
                English
            </button>

            <button
                onClick={() => setLang('mr')}
                className={`px-3 py-1 rounded-lg text-sm font-bold ${lang === 'mr'
                        ? 'bg-primary text-white'
                        : 'bg-muted text-secondary'
                    }`}
            >
                मराठी
            </button>
        </div>
    );
}