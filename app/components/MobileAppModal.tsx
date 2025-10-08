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
  appStoreUrl?: string;
  playStoreUrl?: string;
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
            <div className="mb-2">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <div className="flex flex-wrap gap-1 mb-2">
                {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 border border-primary rounded-full text-xs font-medium text-primary"
                    >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-text-secondary text-sm">{project.description}</p>

            {/* Store buttons */}
            {(project.appStoreUrl || project.playStoreUrl) && (
              <div className="mt-3 flex flex-wrap gap-3">
                {project.appStoreUrl && (
                  <motion.a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white border border-white/10 hover:bg-neutral-800 transition-colors"
                    aria-label="Download on the App Store"
                  >
                    {/* Apple icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4" fill="currentColor"><path d="M318.7 268.7c-.3-36.7 16.4-64.4 50-84.7-18.8-27.2-46.8-42.2-84.1-45.3-35.3-2.8-73.4 20.5-87.4 20.5-14.4 0-49.3-19.4-76.3-19-58.6.9-121 42.8-121 128.4 0 25.3 4.7 51.5 14.1 78.6 12.5 35.3 57.6 121.9 104.5 120.5 24.6-.6 42-17.2 73.9-17.2 31.5 0 47.6 17.2 76.3 17 47.1-.7 87.8-82.2 100.1-117.6-63.3-30-64.8-90.6-50.1-101.2zM260.2 76.3c27.3-32.4 24.8-61.9 24-72.3-24.1 1.4-52 16.4-67.9 35.7-17.5 21.4-27.6 47.9-25.4 75.4 26.1 2 50.1-11.5 69.3-38.8z"/></svg>
                    <span className="text-sm font-medium">App Store</span>
                  </motion.a>
                )}
                {project.playStoreUrl && (
                  <motion.a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F9D58] text-white border border-white/10 hover:bg-[#0c7f47] transition-colors"
                    aria-label="Get it on Google Play"
                  >
                    {/* Play icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4" fill="currentColor"><path d="M71.1 45.1C64.3 50 60 58.2 60 67.1v377.7c0 8.9 4.3 17.1 11.1 22l244.9-210.9L71.1 45.1zM352.6 218.6L115.5 17.9c5.2-3.5 11.5-5.6 18.3-5.6 7.9 0 15.2 2.6 21.1 7l226.1 164.1c7 5.1 11.1 13.2 11.1 21.8s-4.1 16.7-11.1 21.8zM352.6 293.4c7 5.1 11.1 13.2 11.1 21.8s-4.1 16.7-11.1 21.8L154.9 493c-5.9 4.4-13.2 7-21.1 7-6.8 0-13.1-2.1-18.3-5.6l237.1-200.7z"/></svg>
                    <span className="text-sm font-medium">Google Play</span>
                  </motion.a>
                )}
              </div>
            )}
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
