import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page, CaseStudy } from '../types';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface LogsProps {
  setPage: (page: Page) => void;
}

const verifiedCases: CaseStudy[] = [
  {
    id: "LOG_01",
    client: "BETBITS CASINO",
    category: "iGaming / High-Friction Ad Acquisition",
    tag: "Paid Warfare & CAPI Attribution",
    result: "ROAS 3.5X // -40% FTD Cost",
    status: "SCALED",
    quarter: "Q1-Q3 2025",
    bottleneck: "Bloqueos recurrentes en Meta Ads, ceguera de atribución post-iOS 14.5 y costo por depósito inicial (FTD) superior a los $95 USD.",
    solution: "Arquitectura de contingencia multi-cuenta con calentamiento automatizado, puente de atribución server-side CAPI hacia BigQuery y creativos de alta curiosidad con cumplimiento regulatorio estricto.",
    metrics: [
      "Retorno sobre Gasto Publicitario (ROAS): 3.5X sostenido",
      "Reducción del Costo por Primer Depósito (FTD): -40%",
      "Tasa de conversión en página de registro: +68%",
      "Tiempo de vida de cuenta publicitaria: 12 meses sin interrupción"
    ]
  },
  {
    id: "LOG_02",
    client: "DELFI AUSED",
    category: "Creator Economy / High-Volume YouTube",
    tag: "YouTube Ops & Retention Engineering",
    result: "+45% Retención // 12.5% CTR",
    status: "AUDITED",
    quarter: "Q4 2024 - Q2 2025",
    bottleneck: "Estancamiento en 15,000 vistas promedio por video con una caída del 70% de la audiencia en los primeros 30 segundos y CTR inferior al 4%.",
    solution: "Reingeniería completa del empaquetado: estructura de gancho en los primeros 5 segundos sin introducciones lentas, edición basada en micro-recompensas de dopamina y miniaturas de alto contraste orientadas a caras.",
    metrics: [
      "Retención promedio de visualización: Aumentó del 28% al 52% (+45% neto)",
      "Tasa de clics en miniaturas (CTR): 12.5% sostenido en primeras 48hs",
      "Vistas orgánicas por video: Escalaron de 15k a 120k+ promedio",
      "Nuevos suscriptores mensuales: +18,500 orgánicos"
    ]
  },
  {
    id: "LOG_03",
    client: "COINARY LTD",
    category: "Web3 / Crypto Ecosystems",
    tag: "High-Ticket Funnels & Community Scale",
    result: "200k+ Comunidad // Token Sold Out",
    status: "SCALED",
    quarter: "Q2-Q4 2024",
    bottleneck: "Lanzamiento de activo digital en fase de mercado bajista con escepticismo de la comunidad y nula conversión en canales tradicionales.",
    solution: "Embudo táctico de contenido educativo de alta retención en YouTube, segmentación hiper-específica en Meta hacia usuarios de Web3 y canal privado de Telegram con onboarding automatizado.",
    metrics: [
      "Comunidad activa verificada: Más de 200,000 miembros en Telegram/Discord",
      "Fase de preventa de token: Sold Out completo en 48 horas",
      "Costo por usuario registrado en whitelist: < $1.20 USD",
      "Tasa de apertura en transmisiones en vivo de lanzamiento: 82%"
    ]
  },
  {
    id: "LOG_04",
    client: "MIX ON TV",
    category: "Live Media & Event Streaming",
    tag: "Live Infrastructure & Multi-Channel Distribution",
    result: "100k Concurrentes // 20M+ Impr.",
    status: "AUDITED",
    quarter: "Q1-Q4 2025",
    bottleneck: "Eventos en vivo masivos de streaming con alta tasa de latencia y fuga de retención hacia plataformas competidoras.",
    solution: "Campaña de expectativa militar en YouTube Shorts y TikTok, cluster de distribución multi-servidor y re-empaquetado de clips en tiempo real durante la transmisión en vivo.",
    metrics: [
      "Pico de espectadores concurrentes en vivo: 100,000 simultáneos",
      "Impresiones totales generadas en la campaña: 20,000,000+",
      "Crecimiento de canal en semana del evento: +45,000 suscriptores",
      "ROI generado en patrocinadores de evento: 4.2X"
    ]
  }
];

export const Logs: React.FC<LogsProps> = ({ setPage }) => {
  const { t } = useTranslation();
  const [activeDossier, setActiveDossier] = useState<string | null>("LOG_01");

  const toggleDossier = (id: string) => {
    setActiveDossier((prev) => (prev === id ? null : id));
  };

  return (
    <div className="container mx-auto px-6 md:px-12 pt-28 pb-24 min-h-[100dvh]">
      {/* Header */}
      <div className="max-w-4xl mb-16">
        <div className="text-sm font-bold text-[#FF5F00] uppercase mb-4">
          // AUDITORÍAS DE CAMPO // VERIFIED DOSSIERS
        </div>
        <h1 className="text-5xl sm:text-7xl font-['Space_Grotesk'] font-black text-white uppercase tracking-tight mb-6">
          {t('mission_logs')}
        </h1>
        <p className="text-zinc-400 font-['Inter'] text-lg sm:text-xl leading-relaxed max-w-3xl">
          {t('verified_results')}
        </p>
      </div>

      {/* Case Studies Dossier List */}
      <div className="space-y-4">
        {verifiedCases.map((item) => {
          const isOpen = activeDossier === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#0A0A0A] transition-colors"
            >
              {/* Row Header */}
              <div
                onClick={() => toggleDossier(item.id)}
                className="p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer hover:bg-[#111111]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <code className="text-[#FF5F00] text-xs font-bold">
                      {item.id}
                    </code>
                    <code className="text-zinc-600 text-xs">
                      {item.quarter}
                    </code>
                    <code className="px-2 py-0.5 text-[10px] uppercase bg-[#FF5F00]/15 text-[#FF5F00]">
                      {item.status}
                    </code>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-['Space_Grotesk'] font-bold text-white uppercase tracking-tight">
                    {item.client}
                  </h2>
                  <p className="text-zinc-400 font-['Inter'] text-sm mt-1">
                    {item.category} // {item.tag}
                  </p>
                </div>

                <div className="flex items-center gap-8 self-stretch md:self-auto justify-between md:justify-end">
                  <div className="text-left md:text-right">
                    <span className="text-xs text-zinc-500 block mb-1">
                      MÉTRICA VALIDADA
                    </span>
                    <span className="text-white font-['Space_Grotesk'] text-lg sm:text-xl font-bold">
                      {item.result}
                    </span>
                  </div>

                  <button
                    className="flex items-center gap-2 text-xs uppercase text-[#FF5F00] px-4 py-2.5 bg-black/40 hover:bg-[#FF5F00] hover:text-black transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{isOpen ? t('close_file') : t('access_file')}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expandable Dossier Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    data-ui="true"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden bg-[#050505]"
                  >
                    <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Bottleneck */}
                      <div className="lg:col-span-4 bg-[#0A0A0A] p-6">
                        <span className="text-xs text-red-400 font-bold block mb-2">
                          <code>[ CUELLO DE BOTELLA INICIAL ]</code>
                        </span>
                        <p className="text-zinc-300 font-['Inter'] text-sm leading-relaxed">
                          {item.bottleneck}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="lg:col-span-4 bg-[#0A0A0A] p-6">
                        <span className="text-xs text-[#FF5F00] font-bold block mb-2">
                          <code>[ ARQUITECTURA TÁCTICA ZEROED ]</code>
                        </span>
                        <p className="text-zinc-300 font-['Inter'] text-sm leading-relaxed">
                          {item.solution}
                        </p>
                      </div>

                      {/* Validated Metrics */}
                      <div className="lg:col-span-4 bg-[#0A0A0A] p-6">
                        <span className="text-xs text-emerald-400 font-bold block mb-3 flex items-center gap-2">
                          <ShieldCheck size={16} />
                          <code>[ MÉTRICAS AUDITADAS ]</code>
                        </span>
                        <ul className="space-y-2.5 font-['Inter'] text-xs sm:text-sm text-zinc-300">
                          {item.metrics.map((metric, mIdx) => (
                            <li key={mIdx} className="flex items-start gap-2">
                              <span className="text-[#FF5F00] shrink-0 font-bold">›</span>
                              <span>{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Action Banner */}
      <div className="mt-20 p-8 md:p-14 bg-[#0A0A0A] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-white uppercase mb-2">
            ¿Listo para auditar tu operación?
          </h3>
          <p className="text-zinc-400 font-['Inter'] text-sm max-w-xl">
            Auditamos tu tasa de retención o retorno de pauta publicitaria en un informe forense directo.
          </p>
        </div>
        <button
          onClick={() => setPage(Page.INITIATE)}
          className="bg-[#FF5F00] hover:bg-white text-black font-['Space_Grotesk'] font-bold text-sm px-8 py-4 uppercase transition-colors active:scale-95 cursor-pointer whitespace-nowrap"
        >
          {t('view_all_logs')}
        </button>
      </div>
    </div>
  );
};
