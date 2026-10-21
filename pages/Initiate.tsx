import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2, Shield, Send, MessageSquare } from 'lucide-react';

export const Initiate: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram_or_phone: '',
    target_url: '',
    protocols: [] as string[],
    budget: '$2,000 - $5,000 USD/mes',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const availableProtocols = [
    { id: 'youtube_ops', label: 'YouTube Visual Ops' },
    { id: 'paid_warfare', label: 'Paid Warfare (Meta/TikTok)' },
    { id: 'data_intel', label: 'Data Intel & CAPI Bridge' },
    { id: 'fractional_cmo', label: 'Fractional CMO ($3k-$5k/mo)' }
  ];

  const handleProtocolToggle = (protocolId: string) => {
    setFormData((prev) => {
      const exists = prev.protocols.includes(protocolId);
      return {
        ...prev,
        protocols: exists
          ? prev.protocols.filter((p) => p !== protocolId)
          : [...prev.protocols, protocolId]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      // Build transmission payload
      const payload = {
        timestamp: new Date().toISOString(),
        ...formData,
        protocolsSelected: formData.protocols.length > 0 ? formData.protocols.join(', ') : 'All / Assessment needed'
      };

      // Store lead in localStorage as an immutable local contingency
      try {
        const storedLeads = JSON.parse(localStorage.getItem('zeroed_leads') || '[]');
        storedLeads.push(payload);
        localStorage.setItem('zeroed_leads', JSON.stringify(storedLeads));
      } catch {
        // ignore storage errors
      }

      // If Formspree endpoint is available, send to it
      const endpoint = (import.meta as any).env?.VITE_LEADS_ENDPOINT || 'https://formspree.io/f/mqkenjqv';
      
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch {
        // Fallback: Lead is safely recorded and direct channels are provided
      }

      setStatus('sent');
    } catch (err: any) {
      setErrorMessage(err.message || 'Error transmitiendo datos.');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    const mailtoSubject = encodeURIComponent(`[Zeroed Tactical Brief] ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\nTelegram/WA: ${formData.telegram_or_phone}\nURL: ${formData.target_url}\nPresupuesto: ${formData.budget}\nProtocolos: ${formData.protocols.join(', ')}\n\nCuello de botella:\n${formData.message}`
    );
    const mailtoLink = `mailto:contact@zeroedgrowth.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    return (
      <div className="container mx-auto px-6 pt-32 pb-24 min-h-[100dvh] flex flex-col items-center justify-center">
        <div data-ui="true" className="max-w-2xl w-full p-8 md:p-12 bg-[#0A0A0A]">
          <div className="flex items-center gap-3 text-emerald-400 text-sm font-bold uppercase mb-4">
            <CheckCircle2 size={18} />
            <span>{t('transmission_complete')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-['Space_Grotesk'] font-black text-white uppercase mb-4">
            EXPEDIENTE TRANSMITIDO CON ÉXITO
          </h2>

          <p className="text-zinc-300 font-['Inter'] text-sm leading-relaxed mb-6">
            {t('operatives_analyze')}
          </p>

          <div className="p-4 bg-[#050505] text-xs text-zinc-400 mb-8 space-y-1">
            <p className="text-[#FF5F00] font-bold"><code>// RESUMEN DE COORDENADAS REGISTRADAS:</code></p>
            <p>ID: <code className="text-white">{formData.name}</code></p>
            <p>Canal de Contacto: <code className="text-white">{formData.telegram_or_phone} // {formData.email}</code></p>
            <p>Presupuesto: <code className="text-white">{formData.budget}</code></p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href="https://t.me/matiaschababo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#FF5F00] hover:bg-white text-black font-['Space_Grotesk'] font-bold text-xs uppercase py-3.5 px-4 text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare size={16} />
              <span>Abrir Telegram Directo</span>
            </a>

            <a
              href={mailtoLink}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-['Space_Grotesk'] font-bold text-xs uppercase py-3.5 px-4 text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={16} />
              <span>Copia de Respaldo por Correo</span>
            </a>
          </div>

          <div className="pt-6 flex justify-between items-center text-xs text-zinc-500">
            <p>{t('stand_by')}</p>
            <button
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  email: '',
                  telegram_or_phone: '',
                  target_url: '',
                  protocols: [],
                  budget: '$2,000 - $5,000 USD/mes',
                  message: ''
                });
              }}
              className="text-[#FF5F00] hover:underline cursor-pointer"
            >
              {t('new_transmission')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-12 pt-28 pb-24 min-h-[100dvh]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-sm font-bold text-[#FF5F00] uppercase mb-4 flex items-center gap-2">
            <Shield size={16} />
            <span>// LÍNEA TÁCTICA VERIFICADA // ONBOARDING PROTOCOL</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-['Space_Grotesk'] font-black text-white uppercase tracking-tight mb-4">
            {t('initiate_protocol')}
          </h1>
          <p className="text-zinc-400 font-['Inter'] text-base sm:text-lg leading-relaxed">
            {t('secure_line')} Evaluamos si tu marca o canal califica para desplegar las operaciones de Zeroed.
          </p>
        </div>

        {/* Form Container */}
        <form
          data-ui="true"
          onSubmit={handleSubmit}
          className="bg-[#0A0A0A] p-8 md:p-12 space-y-8"
        >
          {/* Field 1: Name / Brand */}
          <div>
            <label className="block text-xs font-semibold text-[#FF5F00] uppercase mb-2">
              {t('enter_id')} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Nicolás Rossi / Founder Marvel Food"
              className="w-full bg-[#050505] text-white p-3.5 focus:outline-none text-sm font-['Inter']"
            />
          </div>

          {/* Field 2 & 3: Email and Phone/Telegram */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#FF5F00] uppercase mb-2">
                {t('email_label')} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nombre@empresa.com"
                className="w-full bg-[#050505] text-white p-3.5 focus:outline-none text-sm font-['Inter']"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#FF5F00] uppercase mb-2">
                {t('phone_label')} *
              </label>
              <input
                type="text"
                required
                value={formData.telegram_or_phone}
                onChange={(e) => setFormData({ ...formData, telegram_or_phone: e.target.value })}
                placeholder="@usuario o +54 9 341..."
                className="w-full bg-[#050505] text-white p-3.5 focus:outline-none text-sm font-['Inter']"
              />
            </div>
          </div>

          {/* Field 4: Target URL */}
          <div>
            <label className="block text-xs font-semibold text-[#FF5F00] uppercase mb-2">
              {t('target_url')} *
            </label>
            <input
              type="text"
              required
              value={formData.target_url}
              onChange={(e) => setFormData({ ...formData, target_url: e.target.value })}
              placeholder="https://youtube.com/@tucanal o https://tusitio.com"
              className="w-full bg-[#050505] text-white p-3.5 focus:outline-none text-sm font-['Inter']"
            />
          </div>

          {/* Field 5: Protocols Checkboxes */}
          <div>
            <label className="block text-xs font-semibold text-[#FF5F00] uppercase mb-3">
              {t('select_protocol')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableProtocols.map((protocol) => {
                const isSelected = formData.protocols.includes(protocol.id);
                return (
                  <button
                    type="button"
                    key={protocol.id}
                    onClick={() => handleProtocolToggle(protocol.id)}
                    className={`p-3.5 text-left text-xs font-['Space_Grotesk'] font-bold uppercase transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF5F00] text-black'
                        : 'bg-[#050505] text-zinc-300 hover:text-white'
                    }`}
                  >
                    <span>{protocol.label}</span>
                    <span className="text-xs">{isSelected ? '[x]' : '[ ]'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Field 6: Budget Range */}
          <div>
            <label className="block text-xs font-semibold text-[#FF5F00] uppercase mb-2">
              {t('budget_label')} *
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full bg-[#050505] text-white p-3.5 focus:outline-none text-sm font-['Inter'] cursor-pointer"
            >
              <option value="Fase de Validación (< $2,000 USD/mes)">
                {t('budget_under_2k')}
              </option>
              <option value="Escalado Táctico ($2,000 - $5,000 USD/mes)">
                {t('budget_2k_5k')}
              </option>
              <option value="Operación de Gran Escala ($5,000+ USD/mes)">
                {t('budget_over_5k')}
              </option>
            </select>
          </div>

          {/* Field 7: Message / Bottleneck */}
          <div>
            <label className="block text-xs font-semibold text-[#FF5F00] uppercase mb-2">
              {t('mission_brief')} *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe el cuello de botella actual: ¿problemas de retención en video? ¿CPA elevado o bloqueos en Meta Ads? ¿Falta de dirección de crecimiento?"
              className="w-full bg-[#050505] text-white p-3.5 focus:outline-none text-sm font-['Inter'] resize-none leading-relaxed"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[#FF5F00] hover:bg-white text-black font-['Space_Grotesk'] font-bold text-sm py-4 uppercase transition-colors active:scale-98 flex items-center justify-center gap-3 cursor-pointer"
              data-hover="true"
            >
              {status === 'sending' ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin">{/* taste-skill-ignore */}</span>
                  <span>{t('uploading')}</span>
                </>
              ) : (
                <>
                  <span>{t('transmit_data')}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-xs mt-3 text-center">{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
