import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Page } from '../types';
import { ArrowRight, Activity, Target, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HomeProps {
  setPage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ setPage }) => {
  const { t } = useTranslation();

  // The Live Thing: Tactical Signal Loss Simulator
  const [adSpend, setAdSpend] = useState<number>(8000);
  const [views, setViews] = useState<number>(120000);

  // Calculated metrics
  const estimatedPixelLoss = Math.round(adSpend * 0.32);
  const estimatedRetentionLeak = Math.round((views * 0.42) * 0.08);
  const totalMonthlyLeak = estimatedPixelLoss + estimatedRetentionLeak;
  const projectedRecovery = Math.round(totalMonthlyLeak * 2.4);

  return (
    <div className="w-full min-h-[100dvh] pt-24 pb-24 flex flex-col relative overflow-hidden">

      {/* 1. HERO SECTION: Massive Scale, High Contrast, Centered Grid */}
      <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-12 pb-20 relative z-10">
        
        {/* 2-line Headline, Massive Space Grotesk */}
        <h1 className="text-5xl sm:text-7xl lg:text-[7.5vw] font-['Space_Grotesk'] font-black tracking-tighter leading-[0.9] text-white uppercase mb-6">
          PRECISION<br />OVER NOISE
        </h1>

        {/* Plain words directly under the headline (answers what it is, for whom) */}
        <p className="text-xl sm:text-2xl text-white font-['Inter'] leading-relaxed max-w-[55ch] mb-8 font-normal">
          Consultoría y operaciones de crecimiento táctico para creadores de alto volumen y marcas en verticales de alta fricción.
        </p>

        {/* Primary Action Button prominently visible in the first viewport */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <button
            onClick={() => setPage(Page.INITIATE)}
            className="h-12 min-h-[48px] bg-[#FF5F00] hover:bg-white text-black text-sm px-8 font-bold font-['Space_Grotesk'] uppercase transition-colors duration-150 active:scale-95 cursor-pointer flex items-center gap-3"
            data-hover="true"
          >
            <span>{t('get_zeroed')}</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => setPage(Page.OPS)}
            className="h-12 min-h-[48px] bg-[#0A0A0A] hover:bg-[#161616] text-white text-sm px-8 font-bold font-['Space_Grotesk'] uppercase transition-colors duration-150 active:scale-95 cursor-pointer border border-white/10"
            data-hover="true"
          >
            <span>Ver Protocolos</span>
          </button>
        </div>

        {/* Hero Media: Official Brand Banner (Image 1) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-[2.4/1] bg-[#0A0A0A] overflow-hidden relative"
        >
          <img
            src="/brand/banner-cover-v2.png"
            alt="Zeroed Tactical Command Crosshairs"
            className="w-full h-full object-cover max-w-full"
            decoding="async"
          />
        </motion.div>
      </section>


      {/* 2. THE BOTTLENECK AUDIT (Tone Step: #0A0A0A, Clear Claims) */}
      <section className="w-full py-24 bg-[#0A0A0A] relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex items-center gap-3 text-[#FF5F00] text-sm font-semibold mb-8">
            <ShieldAlert size={18} />
            <span>{t('critical_error')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-8 bg-[#050505]"
            >
              <h3 className="font-['Space_Grotesk'] text-white text-xl font-bold uppercase mb-3">
                Creative Fatigue
              </h3>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed max-w-[50ch]">
                {t('analysis_content')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-8 bg-[#050505]"
            >
              <h3 className="font-['Space_Grotesk'] text-white text-xl font-bold uppercase mb-3">
                Blind Pixel Tracking
              </h3>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed max-w-[50ch]">
                {t('analysis_ads')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-8 bg-[#0E0A05]"
            >
              <h3 className="font-['Space_Grotesk'] text-[#FF5F00] text-xl font-bold uppercase mb-3">
                The Zeroed Protocol
              </h3>
              <p className="text-zinc-300 font-['Inter'] text-sm leading-relaxed max-w-[50ch]">
                {t('fixing_signal')} Re-engineering retention and deploying server-side attribution.
              </p>
            </motion.div>
          </div>

          {/* Image 2: Telemetry Operations Center */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#050505] p-6 sm:p-8 overflow-hidden">
            <div className="lg:col-span-6 overflow-hidden aspect-[16/10] bg-[#0A0A0A]">
              <img
                src="/assets/photos-of-the-launch-vehicle-data-center.webp"
                alt="Telemetry and Flight Operations Data Center"
                className="w-full h-full object-cover max-w-full grayscale hover:grayscale-0 transition-[filter] duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[#FF5F00] text-xs font-bold uppercase block">
                Control Room Telemetry // Cero Ruido
              </span>
              <p className="text-white font-['Space_Grotesk'] text-xl sm:text-2xl font-bold uppercase tracking-tight">
                {t('market_ignores_noise')}
              </p>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed max-w-[55ch]">
                Las marcas de alto riesgo y los creadores masivos operan en entornos donde el costo de la desatención es letal. Reemplazamos la improvisación de agencias genéricas con un centro de control cuantitativo de audiencia y capital.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 3. THE LIVE THING: TACTICAL SIGNAL LOSS SIMULATOR (data-ui) */}
      <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-24 relative z-10 overflow-hidden">
        <motion.div
          data-ui="true"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-[#0A0A0A] p-8 md:p-14"
        >
          <div className="pb-6 mb-8 flex justify-between items-start">
            <div>
              <span className="text-[#FF5F00] text-xs font-semibold block mb-2">
                LIVE DIAGNOSTIC TOOL
              </span>
              <h2 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-white uppercase">
                {t('calculator.title')}
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-xs">
              <span className="w-2 h-2 bg-[#FF5F00]"></span>
              <code>CALCULATOR_V2</code>
            </div>
          </div>

          <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed mb-8 max-w-[65ch]">
            {t('calculator.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Slider 1: Ad Spend */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs text-zinc-300">
                  {t('calculator.ad_spend')}
                </label>
                <code className="text-white font-bold text-sm bg-white/5 px-2 py-1">
                  ${adSpend.toLocaleString()} USD
                </code>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full accent-[#FF5F00] cursor-pointer bg-zinc-800 h-2"
                aria-label={t('calculator.ad_spend')}
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>$1,000</span>
                <span>$50,000+</span>
              </div>
            </div>

            {/* Slider 2: Views */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs text-zinc-300">
                  {t('calculator.views')}
                </label>
                <code className="text-white font-bold text-sm bg-white/5 px-2 py-1">
                  {views.toLocaleString()} views
                </code>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={views}
                onChange={(e) => setViews(Number(e.target.value))}
                className="w-full accent-[#FF5F00] cursor-pointer bg-zinc-800 h-2"
                aria-label={t('calculator.views')}
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>10K</span>
                <span>1M+</span>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-[#050505] mb-8">
            <div>
              <span className="text-zinc-500 text-xs block mb-1">
                {t('calculator.leak_detected')}
              </span>
              <span className="text-red-400 font-['Space_Grotesk'] text-3xl font-bold">
                -${totalMonthlyLeak.toLocaleString()} USD
              </span>
            </div>
            <div>
              <span className="text-[#FF5F00] text-xs block mb-1">
                {t('calculator.projected_gain')}
              </span>
              <span className="text-white font-['Space_Grotesk'] text-3xl font-bold">
                +${projectedRecovery.toLocaleString()} USD
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-zinc-500 text-xs font-['Inter'] max-w-[55ch]">
              {t('calculator.explanation')}
            </p>
            <button
              onClick={() => setPage(Page.INITIATE)}
              className="w-full sm:w-auto bg-[#FF5F00] hover:bg-white text-black px-6 py-3.5 font-['Space_Grotesk'] font-bold text-xs uppercase tracking-normal whitespace-nowrap active:scale-95 transition-colors cursor-pointer"
            >
              {t('calculator.cta')}
            </button>
          </div>
        </motion.div>
      </section>


      {/* 4. OPERATIONAL ARCHITECTURE (Schematic + Units) */}
      <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-20 relative z-10 overflow-hidden">
        <div className="pb-6 mb-12 flex justify-between items-end">
          <h2 className="text-3xl sm:text-5xl font-['Space_Grotesk'] font-black text-white uppercase tracking-tight">
            {t('operational_capabilities')}
          </h2>
          <button
            onClick={() => setPage(Page.OPS)}
            className="text-sm font-['Space_Grotesk'] font-bold text-[#FF5F00] hover:text-white uppercase flex items-center gap-2 cursor-pointer"
          >
            <span>{t('nav.ops')}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Image 3 & 4: Tactical Concept & Satellite Telemetry Schematics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#0A0A0A] p-6 space-y-4">
            <span className="text-[#FF5F00] text-xs font-bold uppercase block">
              // CONCEPTUAL ARCHITECTURE
            </span>
            <div className="aspect-[16/9] overflow-hidden bg-[#050505]">
              <img
                src="/brand/agency-concept.png"
                alt="Zeroed Tactical System Architecture"
                className="w-full h-full object-cover max-w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-zinc-400 font-['Inter'] text-xs leading-relaxed max-w-[55ch]">
              Articulación del trinomio táctico: Adquisición de Medios Pagados, Retención en YouTube y Atribución Server-Side.
            </p>
          </div>

          <div className="bg-[#0A0A0A] p-6 space-y-4">
            <span className="text-[#FF5F00] text-xs font-bold uppercase block">
              // TELEMETRY SCHEMATICS
            </span>
            <div className="aspect-[16/9] overflow-hidden bg-[#050505]">
              <img
                src="/assets/infrared-astronomical-satellite-configuration.png"
                alt="Satellite Telemetry and Sensor Systems Schematic"
                className="w-full h-full object-cover max-w-full grayscale hover:grayscale-0 transition-[filter] duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-zinc-400 font-['Inter'] text-xs leading-relaxed max-w-[55ch]">
              Ingeniería de datos de alta precisión. Mapeo estructural de sensores y captura de eventos sin puntos ciegos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            onClick={() => setPage(Page.OPS)}
            className="p-8 bg-[#0A0A0A] hover:bg-[#111111] transition-colors duration-150 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="text-[#FF5F00] mb-6">
                <Activity size={28} />
              </div>
              <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-white uppercase mb-3 group-hover:text-[#FF5F00] transition-colors">
                {t('youtube_ops')}
              </h3>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed max-w-[45ch]">
                {t('youtube_ops_desc')}
              </p>
            </div>
            <div className="mt-8 pt-4 flex items-center justify-between text-xs text-zinc-500">
              <code>UNIDAD 01</code>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            onClick={() => setPage(Page.OPS)}
            className="p-8 bg-[#0A0A0A] hover:bg-[#111111] transition-colors duration-150 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="text-[#FF5F00] mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-white uppercase mb-3 group-hover:text-[#FF5F00] transition-colors">
                {t('paid_warfare')}
              </h3>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed max-w-[45ch]">
                {t('paid_warfare_desc')}
              </p>
            </div>
            <div className="mt-8 pt-4 flex items-center justify-between text-xs text-zinc-500">
              <code>UNIDAD 02</code>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            onClick={() => setPage(Page.OPS)}
            className="p-8 bg-[#0A0A0A] hover:bg-[#111111] transition-colors duration-150 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="text-[#FF5F00] mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-white uppercase mb-3 group-hover:text-[#FF5F00] transition-colors">
                {t('data_intel')}
              </h3>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed max-w-[45ch]">
                {t('data_intel_desc')}
              </p>
            </div>
            <div className="mt-8 pt-4 flex items-center justify-between text-xs text-zinc-500">
              <code>UNIDAD 03</code>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 4: Fractional CMO */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.24 }}
            onClick={() => setPage(Page.OPS)}
            className="p-8 bg-[#0E0A05] hover:bg-[#160F07] transition-colors duration-150 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="text-[#FF5F00] mb-6">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-white uppercase mb-3 group-hover:text-[#FF5F00] transition-colors">
                {t('fractional_cmo')}
              </h3>
              <p className="text-zinc-400 font-['Inter'] text-sm leading-relaxed max-w-[45ch]">
                {t('fractional_cmo_desc')}
              </p>
            </div>
            <div className="mt-8 pt-4 flex items-center justify-between text-xs text-[#FF5F00]">
              <code>UNIDAD 04 // EXECUTIVE</code>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. VALIDATED RESULTS CTA */}
      <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-20 relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-8 md:p-14 bg-[#0A0A0A] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <span className="text-[#FF5F00] text-xs font-semibold block mb-2">
              {t('validated_results')}
            </span>
            <h3 className="text-3xl sm:text-5xl font-['Space_Grotesk'] font-black text-white uppercase tracking-tight">
              {t('view_mission_logs')}
            </h3>
            <p className="text-zinc-400 font-['Inter'] text-sm mt-2 max-w-[55ch]">
              {t('verified_results')}
            </p>
          </div>
          <button
            onClick={() => setPage(Page.LOGS)}
            className="bg-[#FF5F00] hover:bg-white text-black font-['Space_Grotesk'] font-bold text-sm px-8 py-4 uppercase tracking-normal transition-colors active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {t('nav.logs')}
          </button>
        </motion.div>
      </section>

    </div>
  );
};
