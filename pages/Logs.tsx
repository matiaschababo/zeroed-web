import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudy } from '../types';
import { useTranslation } from 'react-i18next';

const cases: CaseStudy[] = [
  { id: "01", client: "DELFI AUSED", tag: "YouTube Management", result: "Audience Retention", image: "https://picsum.photos/800/400?grayscale&random=1" },
  { id: "02", client: "COINARY LTD", tag: "Growth at Scale", result: "Subscriber Growth", image: "https://picsum.photos/800/400?grayscale&random=2" },
  { id: "03", client: "BETBITS CASINO", tag: "Ads Performance", result: "ROI Maximization", image: "https://picsum.photos/800/400?grayscale&random=3" },
  { id: "04", client: "MIX ON TV", tag: "Streaming Infra", result: "Live Event Production", image: "https://picsum.photos/800/400?grayscale&random=4" },
];

export const Logs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-6 md:px-12 pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-white uppercase mb-2">{t('mission_logs')}</h1>
        <p className="text-gray-500 font-mono text-sm">{t('verified_results')}</p>
      </motion.div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 gap-0 border-t border-white/10">
        {cases.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative border-b border-white/10 bg-[#050505] hover:bg-[#0a0a0a] transition-colors p-8 md:p-12 cursor-pointer overflow-hidden"
            data-hover="true"
          >
            <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 relative z-10">

              {/* Left Info */}
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-['Space_Grotesk'] font-bold text-white group-hover:text-[#FF5F00] transition-colors uppercase">
                  {item.client}
                </h3>
                <p className="text-[#FF5F00] font-mono text-sm mt-1">{item.tag}</p>
              </div>

              {/* Middle Metric */}
              <div className="flex-1 md:text-center">
                <span className="text-xs text-gray-500 font-mono block mb-1">{t('objective')}</span>
                <span className="text-white font-bold text-lg">{item.result}</span>
              </div>

              {/* Right Status */}
              <div className="flex-1 md:text-right">
                <span className="text-xs text-gray-500 font-mono block mb-1">{t('status')}</span>
                <span className={`inline-block px-2 py-1 text-xs font-bold text-black ${index === 2 ? 'bg-[#FF5F00]' : 'bg-[#10B981]'}`}>
                  {index === 2 ? 'Ongoing' : 'Success'}
                </span>
              </div>
            </div>

            {/* Hover Image Reveal */}
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none mix-blend-screen">
              <img src={item.image} alt={item.client} className="h-full w-full object-cover grayscale" />
            </div>

            <div className="absolute top-1/2 right-12 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-10 group-hover:translate-x-0">
              <span className="font-mono text-white text-xs border border-white/20 px-4 py-2">{t('access_file')}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24">
        <h3 className="text-white text-3xl font-['Space_Grotesk'] font-bold text-center mb-12 uppercase">{t('recent_deployments')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="aspect-square bg-[#111] relative group overflow-hidden border border-white/5">
              <img src={`https://picsum.photos/400/400?grayscale&random=${n + 10}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" alt="Gallery" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold font-['Space_Grotesk'] uppercase text-lg">{cases[n - 1]?.client || "CONFIDENTIAL"}</p>
                <p className="text-gray-500 text-xs font-mono">Status: {n === 4 ? 'Live' : n === 3 ? 'Secured' : n === 2 ? 'Scaled' : 'Viral'}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="bg-[#FF5F00] text-black font-bold px-12 py-4 uppercase tracking-widest hover:bg-white transition-colors" data-hover="true">
            {t('view_all_logs')}
          </button>
        </div>
      </div>
    </div>
  );
};
