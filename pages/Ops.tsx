import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Database, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SpotlightCard: React.FC<{
  title: string;
  subtitle: string;
  description: string;
  id: string;
  icon: React.ReactNode;
  delay: number;
}> = ({ title, subtitle, description, id, icon, delay }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="relative h-full overflow-hidden border border-white/10 bg-[#0A0A0A] p-8 md:p-12 group"
      data-hover="true"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 95, 0, 0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-8">
            <span className="text-[#FF5F00] font-mono text-xs">{id}</span>
            <div className="text-gray-500 group-hover:text-[#FF5F00] transition-colors">
              {icon}
            </div>
          </div>

          <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-2 uppercase leading-none">
            {title}
          </h3>
          <p className="text-lg text-gray-400 mb-6 font-['Space_Grotesk']">
            {subtitle}
          </p>

          <div className="w-12 h-[1px] bg-[#FF5F00] mb-6"></div>

          <p className="text-gray-500 font-mono text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <ArrowRight className="text-white/20 group-hover:text-[#FF5F00] transition-colors" />
        </div>
      </div>
    </motion.div>
  );
};

export const Ops: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-6 md:px-12 pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-white mb-4 uppercase">
          {t('ops_page.title')}
        </h1>
        <p className="text-gray-500 font-mono text-sm">{t('ops_page.subtitle')}</p>
        <div className="flex justify-center mt-6">
          <Target className="text-[#333] w-12 h-12 stroke-[1]" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[minmax(300px,auto)]">
        <div className="md:col-span-2">
          <SpotlightCard
            id="Service ID: 01"
            title={t('ops_page.service_01.title')}
            subtitle={t('ops_page.service_01.subtitle')}
            description={t('ops_page.service_01.desc')}
            icon={<Eye size={32} />}
            delay={0.1}
          />
        </div>
        <SpotlightCard
          id="Service ID: 02"
          title={t('ops_page.service_02.title')}
          subtitle={t('ops_page.service_02.subtitle')}
          description={t('ops_page.service_02.desc')}
          icon={<Target size={32} />}
          delay={0.2}
        />
        <SpotlightCard
          id="Service ID: 03"
          title={t('ops_page.service_03.title')}
          subtitle={t('ops_page.service_03.subtitle')}
          description={t('ops_page.service_03.desc')}
          icon={<Database size={32} />}
          delay={0.3}
        />
      </div>

      {/* Detail List */}
      <div className="mt-20 border-t border-white/10 pt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="text-white">
          <h4 className="font-['Space_Grotesk'] text-[#FF5F00] mb-2">{t('ops_page.unit_01')}</h4>
          <h2 className="text-3xl font-bold mb-4">{t('ops_page.unit_01_title')}</h2>
          <p className="text-gray-500 font-mono text-sm leading-relaxed">
            {t('ops_page.unit_01_desc')}
          </p>
          <ul className="mt-6 space-y-4 font-mono text-sm text-gray-400">
            <li className="flex items-center gap-2"><span className="text-[#FF5F00]">{'>'}</span> Thumbnail CTR Maximization: High-contrast visual composition.</li>
            <li className="flex items-center gap-2"><span className="text-[#FF5F00]">{'>'}</span> Title SEO Injection: Keyword dominance for search rank.</li>
            <li className="flex items-center gap-2"><span className="text-[#FF5F00]">{'>'}</span> Retention Analysis: Drop-off point identification.</li>
            <li className="flex items-center gap-2"><span className="text-[#FF5F00]">{'>'}</span> Channel Strategy: Content pillars & scheduling.</li>
          </ul>
          <button className="mt-8 bg-[#FF5F00] text-black font-bold px-8 py-3 uppercase text-sm hover:bg-white transition-colors" data-hover="true">{t('ops_page.deploy_unit_01')}</button>
        </div>

        <div className="text-white">
          <h4 className="font-['Space_Grotesk'] text-[#FF5F00] mb-2">{t('ops_page.unit_02')}</h4>
          <h2 className="text-3xl font-bold mb-4">{t('ops_page.unit_02_title')}</h2>
          <p className="text-gray-500 font-mono text-sm leading-relaxed">
            {t('ops_page.unit_02_desc')}
          </p>
          <ul className="mt-6 space-y-4 font-mono text-sm text-gray-400">
            <li className="flex items-center gap-2"><span className="text-[#FF5F00]">{'>'}</span> Meta Ads Scaling: Aggressive testing structures.</li>
            <li className="flex items-center gap-2"><span className="text-[#FF5F00]">{'>'}</span> AI Creative Generation: Rapid iteration using Midjourney/Gemini.</li>
            <li className="flex items-center gap-2"><span className="text-[#FF5F00]">{'>'}</span> Attribution Bridge: Custom App linking Meta to GA4.</li>
            <li className="flex items-center gap-2"><span className="text-[#FF5F00]">{'>'}</span> ROAS Optimization: Profit-first bidding strategies.</li>
          </ul>
          <button className="mt-8 bg-[#FF5F00] text-black font-bold px-8 py-3 uppercase text-sm hover:bg-white transition-colors" data-hover="true">{t('ops_page.deploy_unit_02')}</button>
        </div>
      </div>
    </div>
  );
};
