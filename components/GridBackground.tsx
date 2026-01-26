import React from 'react';
import { motion } from 'framer-motion';

export const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {/* Noise Grain Overlay */}
      <div className="absolute inset-0 z-20 opacity-[0.05] pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
             backgroundSize: '150px 150px'
           }}
      />

      {/* Moving Grid */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 50 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px),
                            linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Radial Mask for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] z-10" />
    </div>
  );
};