import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const currentLang = (i18n.language || 'en').split('-')[0]; // 'en-US' -> 'en'

    const handleToggle = () => {
        const newLang = currentLang === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={handleToggle}
            className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-[#FF5F00] transition-all uppercase font-mono text-xs tracking-wider group bg-white/5 backdrop-blur-sm"
        >
            <Globe size={14} className="group-hover:text-[#FF5F00] transition-colors" />
            <span>{currentLang === 'es' ? 'ES' : 'EN'}</span>
        </button>
    );
};
