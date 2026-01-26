import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
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

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.HOME);
  const [loading, setLoading] = useState(true); // Default to true for boot sequence
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Optional: Prevent native scroll while loading (standard CSS, no external lib)
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  const renderPage = () => {
    switch (page) {
      case Page.HOME:
        return (
          <>
            <SEO />
            <Home setPage={setPage} />
          </>
        );
      case Page.OPS:
        return (
          <>
            <SEO title="Operations" description="Our tactical operations and service offerings." url="https://zeroedgrowth.com/ops" />
            <Ops />
          </>
        );
      case Page.LOGS:
        return (
          <>
            <SEO title="Logs" description="Mission logs and case studies of deployed strategies." url="https://zeroedgrowth.com/logs" />
            <Logs />
          </>
        );
      case Page.LAB:
        return (
          <>
            <SEO title="The Lab" description="Experimental R&D division. Testing grounds for next-gen growth vectors." url="https://zeroedgrowth.com/lab" />
            <Lab />
          </>
        );
      case Page.INITIATE:
        return (
          <>
            <SEO title="Initiate Procedure" description="Begin the onboarding protocol. Contact Zeroed Systems." url="https://zeroedgrowth.com/initiate" />
            <Initiate />
          </>
        );
      default:
        return (
          <>
            <SEO />
            <Home setPage={setPage} />
          </>
        );
    }
  };

  return (
    <HelmetProvider>
      {/* Cinematic Preloader */}
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen text-white font-sans selection:bg-[#FF5F00] selection:text-black bg-[#050505] flex flex-col">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#FF5F00] origin-left z-50"
          style={{ scaleX }}
        />

        {/* Persistent Elements */}
        <GridBackground />
        <SniperCursor />
        <Header activePage={page} setPage={setPage} />

        {/* Page Content with Transition */}
        <main className="relative z-10 flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-grow"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Massive Brand Footer */}
        <footer className="relative z-10 w-full bg-[#050505] pt-20 pb-6 overflow-hidden border-t border-white/5">
          <div className="container mx-auto px-6 md:px-12 flex flex-col gap-12">
            <div className="flex justify-between items-end">
              <div className="text-zinc-500 font-mono text-xs max-w-xs">
                <p className="mb-4 text-white">SYSTEM STATUS: <span className="text-[#FF5F00]">OPERATIONAL</span></p>
                <p>Deploying tactical growth solutions for high-risk verticals since 2024.</p>
              </div>
              <div className="text-right text-[10px] text-zinc-600 font-mono uppercase tracking-widest hidden md:block">
                <p>Zeroed Systems &copy; 2025</p>
                <p>Loc: AR / GLOBAL</p>
              </div>
            </div>

            {/* Giant Footer Logo */}
            <div className="w-full select-none leading-none">
              <h1 className="text-[18vw] font-black font-['Space_Grotesk'] text-[#111] text-center tracking-tighter leading-none mix-blend-difference">
                ZEROED
              </h1>
            </div>

            {/* Mobile Footer Info */}
            <div className="md:hidden text-center text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
              Zeroed Systems &copy; 2025
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
};

export default App;