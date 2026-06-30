"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size * 0.9 }}>
      <svg
        width={size}
        height={size * 0.9}
        viewBox="0 0 220 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* Brain shadow */}
        <ellipse 
          cx="110" cy="115" rx="68" ry="38" 
          fill="#000000" 
          opacity="0.3" 
        />

        {/* Main brain body - squishy cartoon style */}
        <motion.g
          animate={isFrazzled ? {
            rotate: [0, -3, 3, -2, 2, 0],
            x: [0, -2, 2, -1, 1, 0],
          } : {
            rotate: [0, 1, -1, 0],
            y: [0, -1, 0],
          }}
          transition={{
            duration: isFrazzled ? 0.6 : 2.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {/* Core brain shape */}
          <path 
            d="M45 85 Q55 55 95 62 Q110 40 140 58 Q175 52 180 88 Q200 95 195 130 Q185 165 110 168 Q55 165 45 130 Q38 100 45 85" 
            fill="#E8E0FF" 
            stroke="#A5B4FC" 
            strokeWidth="3"
          />
          
          {/* Brain folds / wrinkles */}
          <path d="M62 78 Q78 72 88 82" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round" opacity="0.7"/>
          <path d="M95 68 Q108 65 118 75" stroke="#C4B5FD" strokeWidth="7" strokeLinecap="round" opacity="0.65"/>
          <path d="M130 72 Q145 68 158 78" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round" opacity="0.7"/>
          <path d="M72 105 Q90 98 100 110" stroke="#C4B5FD" strokeWidth="5.5" strokeLinecap="round" opacity="0.6"/>
          <path d="M115 100 Q135 95 148 108" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round" opacity="0.65"/>
          <path d="M58 125 Q78 120 95 130" stroke="#C4B5FD" strokeWidth="5" strokeLinecap="round" opacity="0.55"/>
          <path d="M110 130 Q135 125 155 135" stroke="#C4B5FD" strokeWidth="5.5" strokeLinecap="round" opacity="0.6"/>

          {/* Left lobe highlight */}
          <path d="M55 90 Q70 80 85 95" fill="none" stroke="#F5F3FF" strokeWidth="8" strokeOpacity="0.4" strokeLinecap="round"/>
          {/* Right lobe highlight */}
          <path d="M135 85 Q155 80 168 100" fill="none" stroke="#F5F3FF" strokeWidth="7" strokeOpacity="0.35" strokeLinecap="round"/>
        </motion.g>

        {/* Eyes area */}
        <g>
          {/* Left eye white */}
          <ellipse cx="78" cy="95" rx="15" ry="12" fill="#0B0B0F"/>
          {/* Right eye white */}
          <ellipse cx="138" cy="95" rx="15" ry="12" fill="#0B0B0F"/>

          {/* Pupils / expression */}
          {isFrazzled ? (
            <>
              {/* Frazzled wide crazy pupils */}
              <motion.circle 
                cx="80" cy="96" r="6" 
                fill="#C6FF3A"
                animate={{ cx: [80, 82, 78, 80], cy: [96, 94, 98, 96] }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
              <motion.circle 
                cx="140" cy="96" r="6" 
                fill="#C6FF3A"
                animate={{ cx: [140, 138, 142, 140], cy: [96, 98, 94, 96] }}
                transition={{ duration: 0.45, repeat: Infinity }}
              />
              {/* Sweat drops */}
              <motion.circle 
                cx="62" cy="78" r="3.5" fill="#67E8F9" opacity="0.9"
                animate={{ y: [0, 6, 0], opacity: [0.9, 0.4, 0.9] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: 0.1 }}
              />
              <motion.circle 
                cx="155" cy="74" r="2.8" fill="#67E8F9" opacity="0.85"
                animate={{ y: [0, 7, 0], opacity: [0.85, 0.3, 0.85] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: 0.35 }}
              />
              <motion.circle 
                cx="70" cy="72" r="2.2" fill="#67E8F9" opacity="0.7"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: 0.5 }}
              />
            </>
          ) : (
            <>
              {/* Calm relaxed eyes with sunglasses vibe */}
              <ellipse cx="78" cy="95" rx="9" ry="7" fill="#111113"/>
              <ellipse cx="138" cy="95" rx="9" ry="7" fill="#111113"/>
              {/* Tiny relaxed highlights */}
              <circle cx="82" cy="92" r="2.5" fill="#C6FF3A" opacity="0.9"/>
              <circle cx="142" cy="92" r="2.5" fill="#C6FF3A" opacity="0.9"/>
              {/* Cool sunglasses bar */}
              <rect x="70" y="90" width="80" height="4" rx="2" fill="#111113"/>
              <rect x="64" y="87" width="18" height="10" rx="3" fill="#111113"/>
              <rect x="138" y="87" width="18" height="10" rx="3" fill="#111113"/>
            </>
          )}
        </g>

        {/* Mouth / expression */}
        {isFrazzled ? (
          <motion.path 
            d="M95 125 Q110 132 125 124" 
            stroke="#0B0B0F" 
            strokeWidth="4.5" 
            strokeLinecap="round"
            animate={{ d: ["M95 125 Q110 132 125 124", "M95 128 Q110 125 125 128", "M95 125 Q110 132 125 124"] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        ) : (
          /* Calm slight smile */
          <path d="M98 122 Q110 130 122 122" stroke="#0B0B0F" strokeWidth="4" strokeLinecap="round"/>
        )}

        {/* Optional glow ring when calm */}
        {!isFrazzled && (
          <motion.circle 
            cx="110" cy="108" r="72" 
            stroke="#C6FF3A" 
            strokeWidth="2" 
            strokeOpacity="0.15"
            fill="none"
            animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.05, 0.15] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </svg>

      {/* Tiny label under mascot for personality */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[2px] text-[var(--text-muted)] opacity-60 select-none">
        {isFrazzled ? "OVERWHELMED" : "HANDLED"}
      </div>
    </div>
  );
}
