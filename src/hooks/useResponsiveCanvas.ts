import { useState, useEffect } from 'react';

const ASPECT_RATIO = 800 / 600;
const PADDING = 40; // Corresponds to p-4 on each side, so 2 * 1rem = 32px, plus some buffer
const MAX_WIDTH = 1280; // Corresponds to max-w-4xl

export const useResponsiveCanvas = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const containerWidth = Math.min(screenWidth, MAX_WIDTH) - PADDING;
      
      const newWidth = containerWidth;
      const newHeight = newWidth / ASPECT_RATIO;

      setCanvasSize({ width: newWidth, height: newHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size calculation

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return canvasSize;
};
