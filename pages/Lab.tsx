import React, { useState } from 'react';
import { Page } from '../types';
import { useTranslation } from 'react-i18next';

interface LabProps {
  setPage: (page: Page) => void;
}

export const Lab: React.FC<LabProps> = ({ setPage }) => {
  const { t } = useTranslation();

  // Interactive Hook Simulator State
  const [selectedHookType, setSelectedHookType] = useState<'paradox' | 'pattern' | 'data'>('paradox');

  const hookData = {
    paradox: {
      label: "The High-Stakes Paradox",
      formula: "Afirmación contraintuitiva + prueba de autoridad en los primeros 3 segundos.",
      example: "\"Gastar $10,000 en Meta Ads hoy te está haciendo perder dinero exactamente donde crees que ganas.\"",
      retentionScore: "84% a los 15s",
      dropoffAvoidance: "-48% abandono temprano"
    },
    pattern: {
      label: "Visual Pattern Interrupt",
      formula: "Corte seco sin introducción + movimiento físico en pantalla + sonido no rítmico.",
      example: "\"El 90% de los creadores en esta vertical comete este error antes del minuto 1.\"",
      retentionScore: "78% a los 15s",
      dropoffAvoidance: "-38% abandono temprano"
    },
    data: {
      label: "Raw Metric Shock",
      formula: "Dato auditado contundente en primer plano que destruye una creencia común.",
      example: "\"Este solo cambio en la miniatura recuperó $14,000 de FTDs perdidos en 48 horas.\"",
      retentionScore: "88% a los 15s",
      dropoffAvoidance: "-54% abandono temprano"
    }
  };

  return (
    <div className="container mx-auto px-6 md:px-12 pt-28 pb-24 min-h-[100dvh]">
      {/* Header */}
      <div className="max-w-4xl mb-16">
        <div className="text-sm font-bold text-[#FF5F00] uppercase mb-4 flex items-center gap-2">
          <span>//</span>
          <span>DIVISIÓN DE I+D // PROPRIETARY TECH</span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-['Space_Grotesk'] font-black text-white uppercase tracking-tight mb-6">
          {t('rd_division')}
        </h1>
        <p className="text-zinc-400 font-['Inter'] text-lg sm:text-xl leading-relaxed max-w-3xl">
          {t('rd_desc')}
        </p>
      </div>

      {/* R&D Tool 1: Attribution Bridge */}
      <div data-ui="true" className="bg-[#0A0A0A] p-8 md:p-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8">
          <div>
            <span className="text-[#FF5F00] text-xs font-bold block mb-1">
              <code>INTERNAL TOOL // VERSION 2.4</code>
            </span>
            <h2 className="text-2xl sm:text-4xl font-['Space_Grotesk'] font-bold text-white uppercase">
              {t('zeroed_analytics_hub')}
            </h2>
          </div>
          <span className="px-3 py-1 bg-white/5 text-xs text-emerald-400 self-start md:self-auto">
            <code>STATUS: ACTIVE PRODUCTION</code>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold text-zinc-200 uppercase">
              {t('cross_platform_attribution')}
            </h3>
            <p className="text-zinc-400 font-['Inter'] text-sm sm:text-base leading-relaxed">
              {t('hub_desc')}
            </p>

            <div className="p-5 bg-[#050505]">
              <span className="text-[#FF5F00] text-xs font-bold uppercase block mb-2">
                {t('why_it_matters')}
              </span>
              <p className="text-zinc-300 font-['Inter'] text-xs sm:text-sm leading-relaxed">
                {t('hub_why')}
              </p>
            </div>
          </div>

          {/* Interactive Pipeline Architecture Diagram */}
          <div className="lg:col-span-6 bg-[#050505] p-6 md:p-8">
            <div className="text-xs text-zinc-500 mb-6">
              <code>SERVER PIPELINE // LOW LATENCY ROUTING</code>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-[#0A0A0A] text-xs">
                <span className="text-zinc-400">1. Raw Client Event (Ad Click / Deposit)</span>
                <span className="text-emerald-400 font-bold">ENCRYPTED</span>
              </div>
              <div className="flex justify-center text-[#FF5F00] text-xs">
                <code>↓ Cloudflare Worker Edge (0ms Cookie Loss)</code>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-[#0E0A05] text-xs">
                <span className="text-white font-bold">2. Zeroed Attribution Bridge (Server-Side)</span>
                <span className="text-[#FF5F00] font-bold">SHA-256 HASH</span>
              </div>
              <div className="flex justify-center text-[#FF5F00] text-xs">
                <code>↓ Parallel Dispatch (Meta CAPI + GA4 BigQuery)</code>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-center">
                <div className="p-3.5 bg-[#0A0A0A] text-zinc-300">
                  Meta CAPI (Match 9.4/10)
                </div>
                <div className="p-3.5 bg-[#0A0A0A] text-zinc-300">
                  BigQuery LTV Cohort
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* R&D Tool 2: Retention Hook Engine */}
      <div data-ui="true" className="bg-[#0A0A0A] p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8">
          <div>
            <span className="text-[#FF5F00] text-xs font-bold block mb-1">
              <code>ALGORITHMIC LAB // RETENTION FRAMEWORK</code>
            </span>
            <h2 className="text-2xl sm:text-4xl font-['Space_Grotesk'] font-bold text-white uppercase">
              {t('hook_engine')}
            </h2>
          </div>
          <span className="px-3 py-1 bg-[#FF5F00]/10 text-xs text-[#FF5F00] self-start md:self-auto">
            <code>ALPHA TESTING SUITE</code>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-['Space_Grotesk'] font-bold text-zinc-200 uppercase">
              {t('hook_engine_subtitle')}
            </h3>
            <p className="text-zinc-400 font-['Inter'] text-sm sm:text-base leading-relaxed">
              {t('hook_engine_desc')}
            </p>
            <div className="p-5 bg-[#050505]">
              <span className="text-[#FF5F00] text-xs font-bold uppercase block mb-2">
                Impacto Cuantitativo:
              </span>
              <p className="text-zinc-300 font-['Inter'] text-xs sm:text-sm leading-relaxed">
                {t('hook_engine_why')}
              </p>
            </div>
          </div>

          {/* Interactive Hook Tester */}
          <div className="lg:col-span-7 bg-[#050505] p-6 md:p-8">
            <span className="text-xs text-zinc-500 block mb-4">
              SELECCIONA ARQUETIPO DE GANCHO:
            </span>

            {/* Arquetipo selector */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {(['paradox', 'pattern', 'data'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedHookType(key)}
                  className={`py-3 px-2 text-xs font-bold uppercase text-center cursor-pointer transition-colors ${
                    selectedHookType === key
                      ? 'bg-[#FF5F00] text-black'
                      : 'bg-[#0A0A0A] text-zinc-400 hover:text-white'
                  }`}
                >
                  {key === 'paradox' ? 'Paradoxa' : key === 'pattern' ? 'Patrón' : 'Data Shock'}
                </button>
              ))}
            </div>

            {/* Hook inspector output */}
            <div className="p-6 bg-[#0A0A0A] space-y-4">
              <div>
                <span className="text-xs text-[#FF5F00] uppercase block mb-1">
                  <code>[ ESTRUCTURA DEL GANCHO ]</code>
                </span>
                <p className="text-white font-['Space_Grotesk'] text-lg font-bold">
                  {hookData[selectedHookType].label}
                </p>
                <p className="text-zinc-400 font-['Inter'] text-xs mt-1">
                  {hookData[selectedHookType].formula}
                </p>
              </div>

              <div className="p-4 bg-[#050505] text-xs text-zinc-300 leading-relaxed">
                <span className="text-zinc-500 block mb-1">
                  <code>// EJEMPLO APLICADO:</code>
                </span>
                {hookData[selectedHookType].example}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-white/5 text-center">
                  <span className="text-[11px] text-zinc-500 uppercase block">Retención Benchmark</span>
                  <code className="text-white font-bold text-sm">{hookData[selectedHookType].retentionScore}</code>
                </div>
                <div className="p-3 bg-white/5 text-center">
                  <span className="text-[11px] text-zinc-500 uppercase block">Caída Neutralizada</span>
                  <code className="text-emerald-400 font-bold text-sm">{hookData[selectedHookType].dropoffAvoidance}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="mt-20 p-8 md:p-14 bg-[#0A0A0A] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-white uppercase mb-2">
            Implementa esta tecnología en tu infraestructura
          </h3>
          <p className="text-zinc-400 font-['Inter'] text-sm max-w-xl">
            Desplegamos el Attribution Bridge y el Retention Framework como parte de nuestros contratos de consultoría.
          </p>
        </div>
        <button
          onClick={() => setPage(Page.INITIATE)}
          className="bg-[#FF5F00] hover:bg-white text-black font-['Space_Grotesk'] font-bold text-sm px-8 py-4 uppercase transition-colors active:scale-95 cursor-pointer whitespace-nowrap"
        >
          {t('nav.initiate')}
        </button>
      </div>
    </div>
  );
};
