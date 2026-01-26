import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const SniperCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  // Optimized for "Zero Latency" feel while maintaining smoothness
  // Low mass = less inertia/drag
  // High stiffness = instant response
  const springConfig = { damping: 30, stiffness: 700, mass: 0.1 };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = target.closest('button') || target.closest('a') || target.closest('input') || target.closest('[data-hover="true"]');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center will-change-transform mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        animate={{
            rotate: isHovering ? 90 : 0,
            scale: isHovering ? 0.8 : 1
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {/* Horizontal Line - Made slightly smaller for sharper feel */}
        <motion.line 
            x1="12" y1="20" x2="28" y2="20" 
            stroke={isHovering ? "#FF5F00" : "white"} 
            strokeWidth={isHovering ? "2" : "1"}
            strokeOpacity={isHovering ? 1 : 0.8}
        />
        {/* Vertical Line - Made slightly smaller for sharper feel */}
        <motion.line 
            x1="20" y1="12" x2="20" y2="28" 
            stroke={isHovering ? "#FF5F00" : "white"} 
            strokeWidth={isHovering ? "2" : "1"}
            strokeOpacity={isHovering ? 1 : 0.8}
        />
        
        {/* Outer Ring on Hover */}
        <motion.circle 
          cx="20" cy="20" r="16" 
          stroke="#FF5F00" 
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovering ? 1 : 0, opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.svg>
    </motion.div>
  );
};