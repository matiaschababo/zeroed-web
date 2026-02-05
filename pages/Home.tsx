import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Page } from '../types';
import { Activity, Target, Zap, ArrowRight, Terminal } from 'lucide-react';

interface HomeProps {
  setPage: (page: Page) => void;
}

// Internal component for Spotlight Effect + 3D Tilt
const HomeSpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = "", onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // 3D Tilt Configuration
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // RotateX: Top/Bottom tilt (Mouse Y)
  // RotateY: Left/Right tilt (Mouse X)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();

    // Update Spotlight Position
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    // Update Tilt Values
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={`relative overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-[#FF5F00]/50 transition-colors duration-500 cursor-pointer group ${className}`}
      data-hover="true"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 95, 0, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full p-8" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const ZDivider: React.FC = () => (
  <div className="w-full flex items-center justify-center py-24 opacity-50">
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-zinc-700"></div>
    <div className="mx-6 font-['Space_Grotesk'] font-bold text-2xl text-white">
      Z<span className="text-[#FF5F00]">.</span>
    </div>
    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-zinc-700"></div>
  </div>
);

import { useTranslation } from 'react-i18next';

// ... (previous imports)

// ... (HomeSpotlightCard and ZDivider remain the same)

export const Home: React.FC<HomeProps> = ({ setPage }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen pt-20 pb-12 flex flex-col relative overflow-hidden">

      {/* 1. HERO SECTION (High End Upgrade) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 md:px-12 mb-32 z-10 mt-12 md:mt-24 flex flex-col items-center text-center relative"
      >
        {/* LIGHTING SPOTLIGHT */}
        <div className="absolute top-[-150px] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-white opacity-[0.03] blur-[120px] rounded-full pointer-events-none -z-10"></div>

        {/* BACKGROUND TYPOGRAPHY - OUTLINED ZEROED */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen flex items-center justify-center pointer-events-none select-none -z-10 overflow-hidden">
          <span
            className="text-[25vw] font-black font-['Space_Grotesk'] leading-none tracking-tighter text-center whitespace-nowrap"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
              color: 'transparent'
            }}
          >
            ZEROED
          </span>
        </div>

        <div className="inline-flex items-center gap-3 border border-white/10 rounded-full px-4 py-1.5 mb-8 bg-white/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF5F00] animate-pulse"></span>
          <p className="text-zinc-400 font-['Inter'] text-xs tracking-widest uppercase font-medium">{t('protocol_online')}</p>
        </div>

        <h1 className="text-7xl md:text-9xl font-['Space_Grotesk'] font-black tracking-tighter leading-[0.9] mb-8 select-none relative z-10">
          <div className="text-white whitespace-pre-line">{t('precision_over_noise').split('\n')[0]}</div>
          <div className="relative inline-block group cursor-default bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            {t('precision_over_noise').split('\n')[1]}
            <span className="absolute left-0 bottom-2 w-full h-[5px] bg-[#FF5F00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
        </h1>

        <p className="text-zinc-400 max-w-2xl text-lg font-['Inter'] mb-12 leading-relaxed font-light relative z-10">
          {t('data_driven_growth')}
        </p>

        {/* SOLID ORANGE BUTTON */}
        <button
          onClick={() => setPage(Page.INITIATE)}
          className="relative z-10 bg-[#FF5F00] hover:bg-white text-black text-lg px-10 py-4 font-bold font-['Space_Grotesk'] uppercase tracking-wide transition-all duration-300 hover:scale-105"
          data-hover="true"
        >
          {t('get_zeroed')}
        </button>
      </motion.div>


      {/* 2. THE PROBLEM (Terminal Window - Fixed Colors) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full py-24 relative z-10"
      >
        <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">

          <div className="w-full max-w-4xl border border-[#FF5F00]/30 bg-[#050505] shadow-[0_0_50px_rgba(255,95,0,0.1)]">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#FF5F00]/20 bg-[#FF5F00]/5">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#FF5F00]" />
                <span className="font-mono text-[10px] text-[#FF5F00] uppercase tracking-widest">System_Alert.log</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#FF5F00]/50"></div>
                <div className="w-2 h-2 rounded-full bg-[#FF5F00]/20"></div>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-8 font-mono text-sm md:text-base space-y-4">
              <p className="text-[#FF5F00] font-bold mb-4">{t('critical_error')}</p>
              <div className="space-y-2 text-zinc-400">
                <p className="flex gap-3">
                  <span className="text-zinc-600">001</span>
                  <span>Parsing content engine performance...</span>
                </p>
                <p className="flex gap-3">
                  <span className="text-zinc-600">002</span>
                  <span>{t('analysis_content')}</span>
                </p>
                <p className="flex gap-3">
                  <span className="text-zinc-600">003</span>
                  <span>{t('analysis_ads')}</span>
                </p>
                <p className="flex gap-3 mt-4 text-[#FF5F00]">
                  <span className="text-zinc-600">004</span>
                  <span>{t('fixing_signal')} <span className="inline-block w-2 h-4 bg-[#FF5F00] animate-blink align-middle ml-1"></span></span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white font-['Space_Grotesk'] text-xl md:text-2xl font-bold">{t('market_ignores_noise')}</p>
          </div>
        </div>
      </motion.div>


      {/* 3. SERVICES (Bento Grid with Spotlight) */}
      <div className="container mx-auto px-6 md:px-12 mt-12 pb-12 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] bg-white/10 flex-grow"></div>
          <span className="text-zinc-500 font-['Inter'] text-xs uppercase tracking-widest font-semibold">{t('operational_capabilities')}</span>
          <div className="h-[1px] bg-white/10 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {/* Card 1: Spans 2 cols */}
          <HomeSpotlightCard className="md:col-span-2 flex flex-col justify-between" onClick={() => setPage(Page.OPS)}>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/5 rounded-none border border-white/10 text-[#FF5F00]">
                <Activity size={24} />
              </div>
              <ArrowRight className="text-zinc-600 group-hover:text-[#FF5F00] transition-colors" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white mb-3 uppercase">{t('youtube_ops')}</h3>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed max-w-md">{t('youtube_ops_desc')}</p>
            </div>
          </HomeSpotlightCard>

          {/* Card 2 */}
          <HomeSpotlightCard className="flex flex-col justify-between" onClick={() => setPage(Page.OPS)}>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/5 rounded-none border border-white/10 text-[#FF5F00]">
                <Target size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white mb-3 uppercase">{t('paid_warfare')}</h3>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed">{t('paid_warfare_desc')}</p>
            </div>
          </HomeSpotlightCard>

          {/* Card 3 */}
          <HomeSpotlightCard className="flex flex-col justify-between" onClick={() => setPage(Page.OPS)}>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/5 rounded-none border border-white/10 text-[#FF5F00]">
                <Zap size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white mb-3 uppercase">{t('data_intel')}</h3>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed">{t('data_intel_desc')}</p>
            </div>
          </HomeSpotlightCard>

          {/* Card 4 (CTA) */}
          <HomeSpotlightCard className="md:col-span-2 flex items-center justify-center bg-[#111]" onClick={() => setPage(Page.LOGS)}>
            <div className="text-center group-hover:scale-105 transition-transform duration-300">
              <p className="text-[#FF5F00] font-['Inter'] text-xs mb-3 font-semibold tracking-wider">{t('validated_results')}</p>
              <h3 className="text-3xl md:text-4xl font-black font-['Space_Grotesk'] text-white uppercase">
                {t('view_mission_logs')} <ArrowRight className="inline ml-2" />
              </h3>
            </div>
          </HomeSpotlightCard>
        </div>
      </div>

      <ZDivider />

    </div>
  );
};