'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface MobileAppImage {
  original: string;
  thumbnail: string;
  description?: string;
}

interface MobileAppProject {
  title: string;
  description: string;
  images: MobileAppImage[];
  tags: string[];
  link: string;
  type: 'fullstack' | 'frontend';
}

interface MobileAppModalProps {
  project: MobileAppProject;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileAppModal({ project, isOpen, onClose }: MobileAppModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const nextImage = () => {
    console.log('Next image clicked, current:', currentImageIndex, 'total:', project.images.length);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    console.log('Prev image clicked, current:', currentImageIndex, 'total:', project.images.length);
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const goToImage = (index: number) => {
    console.log('Go to image:', index);
    setCurrentImageIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full bg-secondary p-6 rounded-2xl shadow-xl max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-4 h-full flex flex-col">
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
            <p className="text-text-secondary text-sm">{project.description}</p>
          </div>

          {/* Main Image Display */}
          <div className="flex-1 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              {/* Previous Button */}
              {project.images.length > 1 && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-primary hover:bg-accent transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              )}
              
              {/* Image Container */}
              <div className="relative w-full max-w-xs mx-auto overflow-hidden">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full"
                >
                  <Image
                    src={project.images[currentImageIndex].original}
                    alt={project.images[currentImageIndex].description || `Screenshot ${currentImageIndex + 1}`}
                    width={300}
                    height={600}
                    className="w-full h-auto rounded-lg shadow-lg object-contain"
                    priority
                  />
                </motion.div>
              </div>
              
              {/* Next Button */}
              {project.images.length > 1 && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-primary hover:bg-accent transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              )}
            </div>

            {/* Image Counter */}
            <motion.div 
              key={`counter-${currentImageIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-sm text-text-secondary"
            >
              {currentImageIndex + 1} of {project.images.length}
            </motion.div>
            
            {/* Debug Info */}
            <div className="text-xs text-gray-500">
              Debug: Index {currentImageIndex}, Total {project.images.length}
            </div>

            {/* Image Description */}
            {project.images[currentImageIndex].description && (
              <motion.div 
                key={`description-${currentImageIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.15 }}
                className="text-center text-sm text-text-secondary"
              >
                {project.images[currentImageIndex].description}
              </motion.div>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {project.images.length > 1 && (
            <div className="flex-shrink-0">
              <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                {project.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToImage(index);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 w-16 h-32 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                      index === currentImageIndex 
                        ? 'border-primary ring-2 ring-primary/30' 
                        : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={image.thumbnail}
                      alt={image.description || `Thumbnail ${index + 1}`}
                      width={64}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex-shrink-0">
            <div className="flex flex-wrap gap-2 justify-center">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
