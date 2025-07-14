import { useEffect, useCallback, useRef } from 'react';
import { Position } from '../types/game';

/**
 * Custom hook for mouse input handling within canvas
 */
export function useMouse(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const mousePosition = useRef<Position>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const scaleX = canvasRef.current.width / rect.width;
      const scaleY = canvasRef.current.height / rect.height;
      
      mousePosition.current = {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
      };
    }
  }, [canvasRef]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const getMousePosition = useCallback(() => mousePosition.current, []);

  return { getMousePosition };
}