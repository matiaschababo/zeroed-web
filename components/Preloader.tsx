import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const tacticalMessages = [
  "INITIALIZING TACTICAL CORE...",
  "VERIFYING ENCRYPTED CHANNELS...",
  "CALIBRATING SIGNAL ATTRIBUTION...",
  "ZEROED TARGET ACQUIRED"
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Fast message cycling
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % tacticalMessages.length);
    }, 180);

    // Fast 650ms tactical boot
    const duration = 650;
    const intervalTime = 16;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          clearInterval(messageInterval);
          if (typeof window !== 'undefined') {
            try {
              sessionStorage.setItem('zeroed_booted', '1');
            } catch {
              // ignore storage errors
            }
          }
          onComplete();
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
    <div className="fixed inset-0 z-[9999] flex flex-col pointer-events-none">
      {/* Top Half */}
      <motion.div
        className="relative w-full h-1/2 bg-[#050505] border-b border-white/5"
        initial={{ y: 0 }}
        exit={{
          y: "-100%",
          transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] }
        }}
      />

      {/* Bottom Half */}
      <motion.div
        className="relative w-full h-1/2 bg-[#050505] border-t border-white/5"
        initial={{ y: 0 }}
        exit={{
          y: "100%",
          transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] }
        }}
      />

      {/* Center Tactical Metric */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white"
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <div className="w-full max-w-sm px-6 flex flex-col">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[#FF5F00] font-mono text-xs font-bold tracking-widest">
              SYSTEM_BOOT
            </span>
            <span className="font-['Space_Grotesk'] font-black text-6xl leading-none">
              {Math.floor(count).toString().padStart(2, '0')}
            </span>
          </div>

          <div className="w-full h-1 bg-zinc-900 mb-3 overflow-hidden">
            <div
              className="h-full bg-[#FF5F00]"
              style={{ width: `${count}%` }}
            />
          </div>

          <div className="flex justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            <span className="text-white">{tacticalMessages[messageIndex]}</span>
            <span>PRECISION</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
