'use client';
import { useTheme } from '../context/ThemeContext';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

export default function AnimatedBackground() {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdateTime > 50) {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      setLastUpdateTime(now);
    }
  }, [lastUpdateTime]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const smoothY = useSpring(yOffset, { damping: 15, stiffness: 30 });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Main Gradient Orb */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/20 via-accent/15 to-transparent blur-[100px]"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
          scale: [1, 1.05, 1],
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 2,
          scale: {
            repeat: Infinity,
            duration: 5,
          }
        }}
      />

      {/* Secondary Gradient Orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-accent/15 to-primary/15 blur-[80px]"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 300,
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 3,
          scale: {
            repeat: Infinity,
            duration: 4,
            delay: 1,
          }
        }}
      />

      {/* Enhanced Grid with Glow */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, ${theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'} 1px, transparent 1px),
            linear-gradient(to right, ${theme === 'dark' ? '#ffffff08' : '#00000005'} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme === 'dark' ? '#ffffff08' : '#00000005'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
          transform: `translateY(${smoothY.get()}px)`,
        }}
      />

      {/* Large Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`large-${i}`}
            className={`
              absolute w-1.5 h-1.5 rounded-full 
              ${theme === 'dark' ? 'bg-white/15' : 'bg-black/10'}
              animate-float-particle-large
            `}
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${Math.sin(i) * 100}%`,
              animationDelay: `${i * -0.7}s`,
              animationDuration: `${20 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Medium Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`medium-${i}`}
            className={`
              absolute w-1 h-1 rounded-full 
              ${theme === 'dark' ? 'bg-white/10' : 'bg-black/8'}
              animate-float-particle-medium
            `}
            style={{
              left: `${(i * 3.33) % 100}%`,
              top: `${Math.cos(i) * 100}%`,
              animationDelay: `${i * -0.4}s`,
              animationDuration: `${15 + i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Small Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`small-${i}`}
            className={`
              absolute w-0.5 h-0.5 rounded-full 
              ${theme === 'dark' ? 'bg-white/8' : 'bg-black/5'}
              animate-float-particle-small
            `}
            style={{
              left: `${(i * 2.5) % 100}%`,
              top: `${Math.tan(i) * 50 + 50}%`,
              animationDelay: `${i * -0.2}s`,
              animationDuration: `${10 + i}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
} 