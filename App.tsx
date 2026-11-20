import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Page } from './types';
import { GridBackground } from './components/GridBackground';
import { SniperCursor } from './components/SniperCursor';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Ops } from './pages/Ops';
import { Logs } from './pages/Logs';
import { Lab } from './pages/Lab';
import { Initiate } from './pages/Initiate';
import { Preloader } from './components/Preloader';
import { SEO } from './components/SEO';
import { useTranslation } from 'react-i18next';

export const App: React.FC = () => {
  const { t } = useTranslation();

  // Helper to resolve route from pathname
  const getPageFromPath = (): Page => {
    if (typeof window === 'undefined') return Page.HOME;
    const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
    switch (path) {
      case 'ops':
        return Page.OPS;
      case 'logs':
        return Page.LOGS;
      case 'lab':
        return Page.LAB;
      case 'initiate':
        return Page.INITIATE;
      default:
        return Page.HOME;
    }
  };

  const [page, setPage] = useState<Page>(getPageFromPath());
  const [loading, setLoading] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Client-side initialization: preloader and popstate URL listener
  useEffect(() => {
    // Only show preloader on first session visit in browser
    if (typeof window !== 'undefined') {
      try {
        const booted = sessionStorage.getItem('zeroed_booted');
        if (!booted) {
          setLoading(true);
        }
      } catch {
        // storage disabled or unavailable
      }

      const handlePopState = () => {
        setPage(getPageFromPath());
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, []);

  // Synchronized page navigation
  const navigateTo = (newPage: Page) => {
    setPage(newPage);
    if (typeof window !== 'undefined') {
      const targetPath = newPage === Page.HOME ? '/' : `/${newPage.toLowerCase()}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page: newPage }, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const renderPage = () => {
    switch (page) {
      case Page.HOME:
        return (
          <>
            <SEO />
            <Home setPage={navigateTo} />
          </>
        );
      case Page.OPS:
        return (
          <>
            <SEO
              title="Conocimientos y experiencia"
              description="Marketing, sistemas con IA, medios, producción y negocios desde la experiencia de Matías Chababo."
              url="https://zeroedgrowth.com/ops"
            />
            <Ops setPage={navigateTo} />
          </>
        );
      case Page.LOGS:
        return (
          <>
            <SEO
              title="Proyectos y aprendizajes"
              description="Experiencias, proyectos y decisiones de Matías Chababo. Participación y cifras documentadas caso por caso."
              url="https://zeroedgrowth.com/logs"
            />
            <Logs setPage={navigateTo} />
          </>
        );
      case Page.LAB:
        return (
          <>
            <SEO
              title="Sistemas y experimentos"
              description="Arquitecturas y experimentos con datos, marketing, medios y automatización con IA."
              url="https://zeroedgrowth.com/lab"
            />
            <Lab setPage={navigateTo} />
          </>
        );
      case Page.INITIATE:
        return (
          <>
            <SEO
              title="Contacto"
              description="Contacto con Matías Chababo para conversaciones, proyectos y colaboraciones."
              url="https://zeroedgrowth.com/initiate"
            />
            <Initiate />
          </>
        );
      default:
        return (
          <>
            <SEO />
            <Home setPage={navigateTo} />
          </>
        );
    }
  };

  return (
    <>
      {/* Cinematic Fast Preloader for first visit */}
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-[100dvh] text-white font-sans selection:bg-[#FF5F00] selection:text-black bg-[#050505] flex flex-col relative">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#FF5F00] origin-left z-50 pointer-events-none"
          style={{ scaleX }}
        />

        {/* Tactical UI Layers */}
        <GridBackground />
        <SniperCursor />
        <Header activePage={page} setPage={navigateTo} />

        {/* Main Content Area */}
        <main className="relative z-10 flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex-grow flex flex-col"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Industrial Brutalist Brand Footer */}
        <footer className="relative z-10 w-full bg-[#050505] pt-20 pb-12">
          <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div className="text-zinc-500 text-xs max-w-sm space-y-2">
                <p className="text-white font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF5F00]"></span>
                  <span>{t('system_status')}</span>
                </p>
                <p>{t('deploying_solutions')}</p>
              </div>
              <div className="text-left sm:text-right text-xs text-zinc-600">
                <p>{t('copyright')}</p>
                <p>{t('location')}</p>
              </div>
            </div>

            {/* Giant Monolithic Wordmark */}
            <div className="w-full select-none leading-none overflow-hidden py-4">
              <h2 className="text-[18vw] font-black font-['Space_Grotesk'] text-[#111111] text-center tracking-tighter leading-none hover:text-[#181818] transition-colors duration-300">
                ZEROED
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-zinc-600">
              <p>ZEROED · MATÍAS CHABABO · TODOS LOS DERECHOS RESERVADOS</p>
              <div className="flex gap-6">
                <button onClick={() => navigateTo(Page.OPS)} className="hover:text-white transition-colors cursor-pointer">
                  OPS
                </button>
                <button onClick={() => navigateTo(Page.LOGS)} className="hover:text-white transition-colors cursor-pointer">
                  DOSSIERS
                </button>
                <button onClick={() => navigateTo(Page.LAB)} className="hover:text-white transition-colors cursor-pointer">
                  R&D LAB
                </button>
                <button onClick={() => navigateTo(Page.INITIATE)} className="hover:text-[#FF5F00] transition-colors cursor-pointer">
                  INITIATE
                </button>
              </div>
            </div>

            {/* Visuals Attribution Credits */}
            <p className="text-[11px] text-zinc-700 text-center sm:text-left pt-2">
              Créditos visuales: NASA (CC0, vía Rawpixel) y Wikimedia Commons (dominio público).
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
