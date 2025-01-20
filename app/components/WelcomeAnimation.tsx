'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

export default function WelcomeAnimation() {
  const messages = [
    "Loading awesome developer...",
    "Hey, I'm Jourdan! 👋",
    "Your next developer? 😉",
    "Let's build something great! 🚀",
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [messageIndex, setMessageIndex] = useState(0);

  const updateMessageIndex = useCallback(() => {
    setMessageIndex((prev) => (prev + 1) % messages.length);
  }, [messages.length]);

  useEffect(() => {
    const interval = setInterval(updateMessageIndex, 800);
    return () => clearInterval(interval);
  }, [updateMessageIndex]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 3.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="relative">
        {/* Main text animation */}
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-3xl sm:text-5xl font-bold text-primary text-center"
        >
          {messages[messageIndex]}
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute -z-10 inset-0 blur-3xl bg-primary/20 rounded-full"
        />
        
        {/* Loading bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 3.5, ease: "linear" }}
          className="absolute -bottom-8 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute -bottom-16 left-0 right-0 text-center text-text-secondary"
        >
          Spoiler: You&apos;ll want to hire me 🚀
        </motion.p>
      </div>
    </motion.div>
  );
} 