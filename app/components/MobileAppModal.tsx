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
            <div className="relative w-full max-w-xs mx-auto">
              <Image
                src={project.images[currentImageIndex].original}
                alt={project.images[currentImageIndex].description || `Screenshot ${currentImageIndex + 1}`}
                width={300}
                height={600}
                className="w-full h-auto rounded-lg shadow-lg object-contain"
                priority
              />
              
              {/* Navigation Arrows */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 transition-colors z-10"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 transition-colors z-10"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Image Counter */}
            <div className="text-sm text-text-secondary">
              {currentImageIndex + 1} of {project.images.length}
            </div>
            
            {/* Debug Info */}
            <div className="text-xs text-gray-500">
              Debug: Index {currentImageIndex}, Total {project.images.length}
            </div>

            {/* Image Description */}
            {project.images[currentImageIndex].description && (
              <div className="text-center text-sm text-text-secondary">
                {project.images[currentImageIndex].description}
              </div>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {project.images.length > 1 && (
            <div className="flex-shrink-0">
              <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToImage(index);
                    }}
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
                  </button>
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
