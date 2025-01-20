'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
  achievements: string[];
  logo: string;
  gpa?: string;
}

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-secondary/10 backdrop-blur-sm border border-secondary/30 p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {/* Header section with logo and basic info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
          <motion.div 
            className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/90 p-2 shadow-lg z-20"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={education.logo}
              alt={education.school}
              fill
              className="object-contain p-2"
            />
          </motion.div>
          
          <div className="flex-grow space-y-2">
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ transformOrigin: 'left' }}
            >
              {education.degree}
            </motion.h3>
            <p className="text-lg font-medium text-primary">{education.school}</p>
            <div className="flex items-center gap-3">
              <span className="text-text-secondary">{education.period}</span>
              {education.gpa && (
                <>
                  <span className="text-text-secondary">•</span>
                  <motion.span 
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    whileHover={{ scale: 1.1 }}
                  >
                    GPA: {education.gpa}
                  </motion.span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.p 
          className="text-text-secondary mb-6"
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        >
          {education.description}
        </motion.p>

        {/* Achievements */}
        <motion.div
          className="space-y-3"
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-semibold text-text-primary mb-3">Key Achievements</h4>
          {education.achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform" />
              <p className="text-text-secondary group-hover:text-text-primary transition-colors">
                {achievement}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
} 