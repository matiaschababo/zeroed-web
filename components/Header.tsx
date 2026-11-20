import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page, NavItem } from '../types';
import { useTranslation } from 'react-i18next';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  activePage: Page;
  setPage: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, setPage }) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: Page.OPS, label: t('nav.ops'), path: '/ops' },
    { id: Page.LOGS, label: t('nav.logs'), path: '/logs' },
    { id: Page.LAB, label: t('nav.lab'), path: '/lab' },
  ];

  const handleNavClick = (pageId: Page) => {
    setPage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 bg-[#050505]/95 backdrop-blur-md h-16"
        style={{
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="w-full max-w-6xl mx-auto h-full flex items-center justify-between px-6 sm:px-10 lg:px-12">
          {/* Wordmark */}
          <button
            onClick={() => handleNavClick(Page.HOME)}
            className="flex items-center gap-2 group text-left cursor-pointer"
            data-hover="true"
            aria-label="Ir al inicio de Zeroed"
          >
            <span className="font-['Space_Grotesk'] font-bold text-2xl tracking-tighter text-white group-hover:text-[#FF5F00] transition-colors duration-150">
              ZEROED<span className="text-[#FF5F00]">.</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-['Space_Grotesk'] font-bold uppercase tracking-normal transition-colors duration-150 cursor-pointer ${
                    isActive ? 'text-[#FF5F00]' : 'text-zinc-400 hover:text-white'
                  }`}
                  data-hover="true"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA & Language Switcher */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={() => handleNavClick(Page.INITIATE)}
              className="bg-[#FF5F00] hover:bg-white text-black font-['Space_Grotesk'] font-bold text-xs px-5 py-2.5 uppercase transition-colors duration-150 active:scale-95 cursor-pointer"
              data-hover="true"
            >
              {t('nav.initiate')}
            </button>
          </div>

          {/* Mobile Hamburger & Language */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center text-white bg-white/5 active:scale-95 transition-transform cursor-pointer"
              aria-label={mobileMenuOpen ? "Cerrar navegación" : "Abrir navegación"}
              data-hover="true"
            >
              {mobileMenuOpen ? <X size={20} className="text-[#FF5F00]" /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 pb-12 flex flex-col justify-between md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-zinc-600 text-xs uppercase">
                {t('system_status')}
              </span>

              <button
                onClick={() => handleNavClick(Page.HOME)}
                className={`text-3xl font-['Space_Grotesk'] font-bold text-left tracking-tight flex items-center justify-between ${
                  activePage === Page.HOME ? 'text-[#FF5F00]' : 'text-white'
                }`}
              >
                <span>{t('nav.home')}</span>
                <ArrowRight size={20} className="opacity-40" />
              </button>

              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-3xl font-['Space_Grotesk'] font-bold text-left tracking-tight flex items-center justify-between ${
                      isActive ? 'text-[#FF5F00]' : 'text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={20} className={isActive ? 'text-[#FF5F00]' : 'opacity-40'} />
                  </button>
                );
              })}
            </div>

            <div className="pt-8 flex flex-col gap-4">
              <button
                onClick={() => handleNavClick(Page.INITIATE)}
                className="w-full bg-[#FF5F00] text-black font-['Space_Grotesk'] font-bold py-4 uppercase text-sm active:scale-98 transition-transform"
              >
                {t('nav.initiate')}
              </button>
              <p className="text-zinc-600 text-xs text-center">
                ZEROED // PRECISION OVER NOISE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
