import React from 'react';
import { Page } from '../types';
import { Eye, Target, Database, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface OpsProps {
  setPage: (page: Page) => void;
}

export const Ops: React.FC<OpsProps> = ({ setPage }) => {
  const { t } = useTranslation();

  const units = [
    {
      id: "UNIT_01",
      badge: "CONTENT & ATTENTION",
      icon: <Eye size={28} className="text-[#FF5F00]" />,
      title: t('ops_page.unit_01_title'),
      desc: t('ops_page.unit_01_desc'),
      cta: t('ops_page.deploy_unit_01'),
      protocols: [
        "First-5-Seconds Retention Engineering: Visual pacing and hook calibration.",
        "Thumbnail CTR Maximization: High-contrast facial and object framing with 10%+ CTR targets.",
        "Algorithmic SEO & Search Intent Injection for long-tail organic discovery.",
        "End-Screen & Playlist Architecture to trigger YouTube Session Time loops."
      ]
    },
    {
      id: "UNIT_02",
      badge: "ACQUISITION & SCALE",
      icon: <Target size={28} className="text-[#FF5F00]" />,
      title: t('ops_page.unit_02_title'),
      desc: t('ops_page.unit_02_desc'),
      cta: t('ops_page.deploy_unit_02'),
      protocols: [
        "Multi-Account Contingency Structures for High-Friction and iGaming Verticals.",
        "Rapid Creative Iteration: Testing 20+ hook variations per sprint.",
        "Direct-to-Telegram and Private Funnel Infrastructure for Crypto and Betting.",
        "Net-Profit Bidding Strategies to prioritize FTD (First Time Deposit) ROAS over vanity clicks."
      ]
    },
    {
      id: "UNIT_03",
      badge: "INFRASTRUCTURE & DATA",
      icon: <Database size={28} className="text-[#FF5F00]" />,
      title: t('ops_page.unit_03_title'),
      desc: t('ops_page.unit_03_desc'),
      cta: t('ops_page.deploy_unit_03'),
      protocols: [
        "Server-Side Meta CAPI and Google Tag Manager Server Container Deployment.",
        "Cross-Platform Cohort Correlation between Ad Platforms and CRM or Backend.",
        "Zero-Loss Attribution Bridge overcoming iOS 14.5+ and aggressive ad-blockers.",
        "Custom Automated Intelligence Dashboards in Google BigQuery and Looker."
      ]
    },
    {
      id: "UNIT_04",
      badge: "EXECUTIVE PARTNERSHIP ($3K-$5K/MO)",
      icon: <Cpu size={28} className="text-[#FF5F00]" />,
      title: t('ops_page.unit_04_title'),
      desc: t('ops_page.unit_04_desc'),
      cta: t('ops_page.deploy_unit_04'),
      protocols: [
        "End-to-End Growth Architecture: Unifying content, acquisition, and retention.",
        "Leadership & Quality Control over internal media buyers, editors, and copywriters.",
        "Weekly Strategy Sprints and Direct Executive Reporting to Founder or CEO.",
        "High-Ticket Funnel Optimization and LTV/CAC Expansion Protocols."
      ]
    }
  ];

  return (
    <div className="container mx-auto px-6 md:px-12 pt-28 pb-24 min-h-[100dvh]">
      {/* Header */}
      <div className="max-w-4xl mb-16">
        <div className="text-sm font-bold text-[#FF5F00] uppercase mb-4">
          // CAPACIDADES OPERATIVAS // SYSTEM UNITS
        </div>
        <h1 className="text-5xl sm:text-7xl font-['Space_Grotesk'] font-black text-white uppercase tracking-tight mb-6">
          {t('ops_page.title')}
        </h1>
        <p className="text-zinc-400 font-['Inter'] text-lg sm:text-xl leading-relaxed max-w-3xl">
          {t('ops_page.subtitle')}
        </p>
      </div>

      {/* Units Grid */}
      <div className="space-y-12">
        {units.map((unit, idx) => (
          <div
            key={unit.id}
            className={`p-8 md:p-12 ${
              idx === 3 ? 'bg-[#0E0A05]' : 'bg-[#0A0A0A]'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5">
                  {unit.icon}
                </div>
                <div>
                  <span className="text-[#FF5F00] text-xs font-bold block">
                    {unit.badge}
                  </span>
                  <span className="text-zinc-500 text-xs">
                    <code>PROTOCOL // {unit.id}</code>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPage(Page.INITIATE)}
                className="self-start md:self-auto bg-[#FF5F00] hover:bg-white text-black text-xs font-bold font-['Space_Grotesk'] px-6 py-3 uppercase transition-colors active:scale-95 flex items-center gap-2 cursor-pointer"
                data-hover="true"
              >
                <span>{unit.cta}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6">
                <h2 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-white uppercase tracking-tight mb-4">
                  {unit.title}
                </h2>
                <p className="text-zinc-400 font-['Inter'] text-base leading-relaxed">
                  {unit.desc}
                </p>
              </div>

              <div className="lg:col-span-6 bg-[#050505] p-6">
                <span className="text-xs text-zinc-500 block mb-4">
                  <code>SOP // PROTOCOLOS DESPLEGADOS:</code>
                </span>
                <ul className="space-y-3 font-['Inter'] text-sm text-zinc-300">
                  {unit.protocols.map((protocol, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#FF5F00] shrink-0 mt-0.5" />
                      <span>{protocol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 p-8 md:p-14 bg-[#0A0A0A] text-center flex flex-col items-center">
        <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white uppercase mb-4">
          ¿No estás seguro de qué unidad necesitas?
        </h3>
        <p className="text-zinc-400 font-['Inter'] text-base max-w-xl mb-8">
          Inicia un diagnóstico técnico. Evaluamos tu canal o embudo de adquisición y te entregamos la ruta exacta sin compromiso.
        </p>
        <button
          onClick={() => setPage(Page.INITIATE)}
          className="bg-[#FF5F00] hover:bg-white text-black font-['Space_Grotesk'] font-bold text-sm px-8 py-4 uppercase transition-colors active:scale-95 cursor-pointer"
          data-hover="true"
        >
          {t('nav.initiate')}
        </button>
      </div>
    </div>
  );
};
