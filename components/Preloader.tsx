import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const tacticalMessages = [
  "INITIALIZING CORE...",
  "ESTABLISHING SECURE CONNECTION...",
  "LOADING ASSETS...",
  "OPTIMIZING SIGNALS...",
  "TARGET ACQUIRED"
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Message cycler
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % tacticalMessages.length);
    }, 350);

    // Counter logic
    // We want it to take roughly 2-2.5 seconds
    const duration = 2200; 
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          clearInterval(messageInterval);
          onComplete(); // Notify parent to start exit
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col">
      {/* Top Curtain */}
      <motion.div 
        className="relative w-full h-1/2 bg-[#050505] border-b border-white/5"
        initial={{ y: 0 }}
        exit={{ 
            y: "-100%", 
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } // Custom easing for heavy/cinematic feel
        }}
      />

      {/* Bottom Curtain */}
      <motion.div 
        className="relative w-full h-1/2 bg-[#050505] border-t border-white/5"
        initial={{ y: 0 }}
        exit={{ 
            y: "100%", 
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
        }}
      />

      {/* Center Content - Fades out slightly faster than curtains open */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white pointer-events-none"
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
         <div className="w-full max-w-md px-6 flex flex-col">
            <div className="flex justify-between items-end mb-2">
                <span className="text-[#FF5F00] font-mono text-xs animate-pulse">SYSTEM_BOOT</span>
                <span className="font-['Space_Grotesk'] font-black text-8xl leading-none">
                    {Math.floor(count).toString().padStart(2, '0')}
                </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1 bg-zinc-900 mb-4 overflow-hidden">
                <motion.div 
                    className="h-full bg-[#FF5F00]"
                    style={{ width: `${count}%` }}
                />
            </div>

            <div className="flex justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                <span className="text-white">{tacticalMessages[messageIndex]}</span>
                <span>MEM: 64TB</span>
            </div>
         </div>

         {/* Background faint text decoration */}
         <div className="absolute bottom-12 w-full text-center opacity-10">
             <span className="font-['Space_Grotesk'] text-[15vw] leading-none text-zinc-800 select-none">
                LOADING
             </span>
         </div>
      </motion.div>
    </div>
  );
};