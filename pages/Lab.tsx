import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Workflow } from 'lucide-react';

export const Lab: React.FC = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 pt-32 pb-20">
       <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-20 text-center"
      >
        <div className="inline-flex items-center gap-2 mb-4">
           <span className="text-[#FF5F00] font-mono">[</span>
           <Cpu className="text-[#FF5F00]" size={20} />
           <span className="text-[#FF5F00] font-mono">]</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-white uppercase">R&D Division</h1>
        <p className="text-gray-500 font-mono mt-4">We don't rely on standard tools. We build our own.</p>
      </motion.div>

      {/* Blueprints Container */}
      <div className="space-y-24">
        
        {/* Tool 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-white/10 p-8 lg:p-12 bg-[#080808] relative overflow-hidden">
            {/* Background Grid for Card */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }}></div>

            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="relative z-10"
            >
                <div className="mb-6 inline-block bg-[#FF5F00]/10 border border-[#FF5F00] px-3 py-1 text-[#FF5F00] text-xs font-mono uppercase tracking-wider">Internal Tool V2.0</div>
                <h2 className="text-3xl md:text-4xl text-white font-['Space_Grotesk'] font-bold mb-4">Zeroed Analytics Hub V2</h2>
                <h3 className="text-white/70 text-xl font-bold mb-6">Cross-Platform Attribution</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
                    A custom-built application that connects Meta Ads Manager API with Google Analytics 4 raw data.
                </p>
                <div className="p-4 border border-white/10 bg-black/50 backdrop-blur-sm">
                    <p className="text-[#FF5F00] text-sm font-bold mb-1">Why it matters:</p>
                    <p className="text-gray-400 text-xs">It reveals the "Dark ROI" that standard pixels miss. Essential for Betting/Crypto apps.</p>
                </div>
            </motion.div>

            <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="relative z-10 h-[300px] border border-dashed border-gray-700 bg-black flex items-center justify-center p-4"
            >
                {/* Schematic Visual */}
                 <img src="https://picsum.photos/600/400?grayscale" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Schematic" />
                 <div className="relative z-20 flex items-center gap-4">
                    <div className="w-16 h-16 border-2 border-white flex items-center justify-center bg-black"><span className="text-white font-bold">META</span></div>
                    <div className="h-[2px] w-12 bg-[#FF5F00] animate-pulse"></div>
                    <div className="w-20 h-20 border-2 border-[#FF5F00] flex items-center justify-center bg-black rounded-full"><Workflow className="text-[#FF5F00]"/></div>
                    <div className="h-[2px] w-12 bg-[#FF5F00] animate-pulse"></div>
                    <div className="w-16 h-16 border-2 border-white flex items-center justify-center bg-black"><span className="text-white font-bold">GA4</span></div>
                 </div>
            </motion.div>
        </div>

        {/* Tool 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-white/10 p-8 lg:p-12 bg-[#080808]">
             <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="relative z-10 order-2 lg:order-1 h-[300px] bg-[#111] p-6 font-mono text-xs text-green-500 overflow-hidden border border-gray-800"
            >
                <div className="opacity-80">
                    <p>{'>'} Initializing Gemini API connection...</p>
                    <p>{'>'} Model: gemini-pro-1.5</p>
                    <p className="text-white mb-2">{'>'} Input: "Viral Finance Short"</p>
                    <p className="text-[#FF5F00] mb-2">{'>'} Analyzing Top 100 performing videos...</p>
                    <p>{'>'} Generating Structure:</p>
                    <div className="pl-4 border-l border-gray-700 mt-2 text-gray-400">
                        <p>1. Hook (0-3s): "Stop losing money on gas fees." (Visual: Wallet Burning)</p>
                        <p>2. Retention (3-15s): Explain Layer 2 solution comparison.</p>
                        <p>3. CT (End): "Link in bio for whitelist."</p>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 animate-pulse w-3 h-6 bg-green-500"></div>
            </motion.div>

            <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="relative z-10 order-1 lg:order-2"
            >
                <div className="mb-6 inline-block bg-[#FF5F00]/10 border border-[#FF5F00] px-3 py-1 text-[#FF5F00] text-xs font-mono uppercase tracking-wider">Alpha Build</div>
                <h2 className="text-3xl md:text-4xl text-white font-['Space_Grotesk'] font-bold mb-4">SEO Script Gen Alpha</h2>
                <h3 className="text-white/70 text-xl font-bold mb-6">Automated Content Structure</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
                    Powered by Google Gemini. This tool analyzes top-performing videos in a niche and generates optimized script structures, tags, and title variations in seconds.
                </p>
                <div className="p-4 border border-white/10 bg-black/50 backdrop-blur-sm">
                    <p className="text-[#FF5F00] text-sm font-bold mb-1">Why it matters:</p>
                    <p className="text-gray-400 text-xs">Speed. We iterate content 10x faster than manual agencies.</p>
                </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
};
