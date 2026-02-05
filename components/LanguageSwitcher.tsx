import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    const currentLang = (i18n.language || 'en').split('-')[0]; // 'en-US' -> 'en'

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase font-mono text-xs tracking-wider"
            >
                <Globe size={14} />
                <span>{currentLang === 'es' ? 'ES' : 'EN'}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 bottom-full mb-2 bg-[#111] border border-white/10 p-2 min-w-[100px]"
                    >
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => toggleLanguage('en')}
                                className={`text-left text-xs font-mono uppercase tracking-wider hover:text-[#FF5F00] transition-colors ${currentLang === 'en' ? 'text-white' : 'text-zinc-500'}`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => toggleLanguage('es')}
                                className={`text-left text-xs font-mono uppercase tracking-wider hover:text-[#FF5F00] transition-colors ${currentLang === 'es' ? 'text-white' : 'text-zinc-500'}`}
                            >
                                Español
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
