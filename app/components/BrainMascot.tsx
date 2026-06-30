"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BrainMascotProps {
  state?: "frazzled" | "calm";
  size?: number;
  className?: string;
}

export default function BrainMascot({ 
  state = "frazzled", 
  size = 220,
  className = "" 
}: BrainMascotProps) {
  const isFrazzled = state === "frazzled";
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size * 0.9 }}>
      <svg
        width={size}
        height={size * 0.92}
        viewBox="0 0 220 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle shadow */}
        <ellipse 
          cx="110" cy="118" rx="62" ry="34" 
          fill="#000000" 
          opacity="0.25" 
        />

        {/* Refined brain form - minimalist and elegant */}
        <motion.g
          animate={reducedMotion ? undefined : (isFrazzled ? {
            rotate: [0, -1.5, 1.5, 0],
            x: [0, -1, 1, 0],
          } : {
            y: [0, -0.5, 0],
          })}
          transition={reducedMotion ? undefined : {
            duration: isFrazzled ? 0.8 : 3.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {/* Main form - cleaner, more abstract */}
          <path 
            d="M52 90 Q58 58 100 64 Q112 46 145 60 Q178 54 182 90 Q198 96 192 128 Q182 158 110 160 Q48 158 46 128 Q40 100 52 90" 
            fill="#F2EDFF" 
            stroke="#C9BDF0" 
            strokeWidth="1.5"
          />
          
          {/* Subtle internal structure - very light */}
          <path d="M65 82 Q82 74 94 84" stroke="#D8D0F0" strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
          <path d="M100 72 Q118 68 130 78" stroke="#D8D0F0" strokeWidth="4.5" strokeLinecap="round" opacity="0.35"/>
          <path d="M135 76 Q152 72 164 82" stroke="#D8D0F0" strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
          <path d="M72 108 Q92 100 102 112" stroke="#D8D0F0" strokeWidth="3.5" strokeLinecap="round" opacity="0.3"/>
          <path d="M120 104 Q140 98 152 110" stroke="#D8D0F0" strokeWidth="4" strokeLinecap="round" opacity="0.35"/>
        </motion.g>

        {/* Eyes - refined and minimal */}
        <g>
          {/* Eye sockets */}
          <ellipse cx="80" cy="97" rx="13" ry="10" fill="#0A0A0C"/>
          <ellipse cx="140" cy="97" rx="13" ry="10" fill="#0A0A0C"/>

          {isFrazzled ? (
            <>
              {/* Subtle overwhelmed expression */}
              <circle cx="81" cy="97" r="5" fill="#C6FF3A" opacity="0.9"/>
              <circle cx="139" cy="97" r="5" fill="#C6FF3A" opacity="0.9"/>
            </>
          ) : (
            <>
              {/* Calm, confident eyes */}
              <ellipse cx="80" cy="97" rx="7.5" ry="5.5" fill="#0A0A0C"/>
              <ellipse cx="140" cy="97" rx="7.5" ry="5.5" fill="#0A0A0C"/>
              {/* Small calm highlights */}
              <circle cx="83" cy="95" r="1.8" fill="#C6FF3A" opacity="0.85"/>
              <circle cx="143" cy="95" r="1.8" fill="#C6FF3A" opacity="0.85"/>
            </>
          )}
        </g>

        {/* Mouth - very subtle */}
        {isFrazzled ? (
          <path d="M96 127 Q110 130 124 127" stroke="#0A0A0C" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        ) : (
          <path d="M98 126 Q110 129 122 126" stroke="#0A0A0C" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
        )}
      </svg>

      {/* Tiny label under mascot for personality */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[2px] text-[var(--text-muted)] opacity-60 select-none">
        {isFrazzled ? "OVERWHELMED" : "HANDLED"}
      </div>
    </div>
  );
}
