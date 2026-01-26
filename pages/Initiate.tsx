import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Initiate: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
    }, 2000);
  };

  if (status === 'sent') {
      return (
          <div className="container mx-auto px-6 pt-32 h-screen flex flex-col items-center justify-center text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="border border-[#FF5F00] p-12 bg-black/80 backdrop-blur-xl"
              >
                  <h2 className="text-3xl text-[#FF5F00] font-mono font-bold mb-4">TRANSMISSION COMPLETE</h2>
                  <p className="text-white font-mono text-sm">Our operatives will analyze your data packet.</p>
                  <p className="text-gray-500 font-mono text-xs mt-4">Stand by for encrypted response.</p>
                  <button onClick={() => setStatus('idle')} className="mt-8 text-white underline font-mono text-xs hover:text-[#FF5F00]" data-hover="true">New Transmission</button>
              </motion.div>
          </div>
      )
  }

  return (
    <div className="container mx-auto px-6 md:px-12 pt-32 pb-20 min-h-screen flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            <h1 className="text-5xl font-['Space_Grotesk'] font-bold text-white uppercase mb-2">Initiate Protocol</h1>
            <p className="text-gray-500 font-mono text-xs">Secure Line Established. 256-bit Encryption Active.</p>
        </motion.div>

        <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
             {/* Decorative Scan Line */}
             <div className="absolute top-0 left-0 w-full h-[2px] bg-[#FF5F00] opacity-20 animate-pulse"></div>

            <div className="space-y-8 font-mono">
                <div className="group">
                    <label className="block text-[#FF5F00] text-xs mb-2 tracking-widest">{'>'} ENTER IDENTIFICATION (NAME/BRAND)</label>
                    <input type="text" required className="w-full bg-transparent border-b border-gray-800 text-white p-2 focus:border-[#FF5F00] focus:outline-none transition-colors rounded-none" placeholder="Required" />
                </div>

                <div className="group">
                    <label className="block text-[#FF5F00] text-xs mb-2 tracking-widest">{'>'} TARGET URL</label>
                    <input type="url" className="w-full bg-transparent border-b border-gray-800 text-white p-2 focus:border-[#FF5F00] focus:outline-none transition-colors rounded-none" placeholder="https://" />
                </div>

                <div className="group">
                    <label className="block text-[#FF5F00] text-xs mb-4 tracking-widest">{'>'} SELECT PROTOCOL</label>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-3 cursor-pointer group-hover:text-white text-gray-400" data-hover="true">
                            <input type="checkbox" className="accent-[#FF5F00] w-4 h-4 rounded-none bg-transparent border-gray-600" />
                            <span>YouTube Ops</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group-hover:text-white text-gray-400" data-hover="true">
                            <input type="checkbox" className="accent-[#FF5F00] w-4 h-4 rounded-none bg-transparent border-gray-600" />
                            <span>Paid Scaling</span>
                        </label>
                         <label className="flex items-center gap-3 cursor-pointer group-hover:text-white text-gray-400" data-hover="true">
                            <input type="checkbox" className="accent-[#FF5F00] w-4 h-4 rounded-none bg-transparent border-gray-600" />
                            <span>Custom Dev</span>
                        </label>
                    </div>
                </div>

                <div className="group">
                    <label className="block text-[#FF5F00] text-xs mb-2 tracking-widest">{'>'} MISSION BRIEF</label>
                    <textarea rows={4} className="w-full bg-[#111] border border-gray-800 text-white p-4 focus:border-[#FF5F00] focus:outline-none transition-colors rounded-none text-sm resize-none" placeholder="Describe your current bottleneck..."></textarea>
                </div>

                <div className="pt-4">
                    <button 
                        disabled={status === 'sending'}
                        className="w-full bg-[#FF5F00] hover:bg-white text-black font-bold font-['Space_Grotesk'] py-4 uppercase tracking-widest transition-all hover:scale-[1.01] flex justify-center items-center gap-2"
                        data-hover="true"
                    >
                        {status === 'sending' ? (
                            <>
                                <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
                                UPLOADING...
                            </>
                        ) : '[ TRANSMIT DATA ]'}
                    </button>
                </div>
            </div>
        </motion.form>
      </div>
    </div>
  );
};
