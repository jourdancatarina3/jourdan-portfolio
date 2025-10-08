'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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

  // Reset to first image when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Debug logging
  console.log('MobileAppModal rendered:', {
    currentImageIndex,
    totalImages: project.images.length,
    currentImageSrc: project.images[currentImageIndex]?.original,
    isFirstImage: currentImageIndex === 0
  });

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % project.images.length;
    console.log('Next image clicked:', {
      from: currentImageIndex,
      to: newIndex,
      total: project.images.length,
      isFirstImage: newIndex === 0
    });
    setCurrentImageIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
    console.log('Prev image clicked:', {
      from: currentImageIndex,
      to: newIndex,
      total: project.images.length,
      isFirstImage: newIndex === 0
    });
    setCurrentImageIndex(newIndex);
  };

  const goToImage = (index: number) => {
    console.log('Go to image:', {
      from: currentImageIndex,
      to: index,
      total: project.images.length,
      isFirstImage: index === 0
    });
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
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-text-secondary text-sm">{project.description}</p>
          </div>

          {/* Main Image Display */}
          <div className="flex-1 flex items-start space-x-6">
            {/* Left Side - Navigation and Main Image */}
            <div className="flex-1 flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4">
                {/* Previous Button */}
                {project.images.length > 1 && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 rounded-full bg-primary hover:bg-accent transition-colors"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                )}
                
                {/* Image Container */}
                <div className="relative w-full max-w-xs mx-auto overflow-hidden">
                  <div className="w-full">
                    <Image
                      src={project.images[currentImageIndex].original}
                      alt={project.images[currentImageIndex].description || `Screenshot ${currentImageIndex + 1}`}
                      width={300}
                      height={600}
                      className="w-full h-auto rounded-lg shadow-lg object-contain"
                      priority={currentImageIndex === 0}
                      style={{ 
                        width: '300px',
                        height: 'auto',
                        minHeight: '500px',
                        maxHeight: '700px'
                      }}
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        console.log('Image loaded:', {
                          index: currentImageIndex,
                          src: project.images[currentImageIndex].original,
                          isFirst: currentImageIndex === 0,
                          naturalWidth: img.naturalWidth,
                          naturalHeight: img.naturalHeight,
                          renderedWidth: img.offsetWidth,
                          renderedHeight: img.offsetHeight
                        });
                      }}
                      onError={(e) => {
                        console.error('Image load error:', {
                          index: currentImageIndex,
                          src: project.images[currentImageIndex].original,
                          error: e
                        });
                      }}
                    />
                  </div>
                </div>
                
                {/* Next Button */}
                {project.images.length > 1 && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 rounded-full bg-primary hover:bg-accent transition-colors"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Right Side - Thumbnail Navigation */}
            {project.images.length > 1 && (
              <div className="flex-shrink-0 w-20">
                <div className="flex flex-col space-y-2 max-h-96 overflow-y-auto">
                  {project.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToImage(index);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-16 h-32 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                        index === currentImageIndex 
                          ? 'border-primary ring-2 ring-primary/30 opacity-100' 
                          : 'border-transparent hover:border-primary/50 opacity-70 hover:opacity-85'
                      }`}
                    >
                      <Image
                        src={image.thumbnail}
                        alt={image.description || `Thumbnail ${index + 1}`}
                        width={64}
                        height={128}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-75'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
