import { useCallback, useEffect, useRef } from "react";

interface GameLoopOptions {
  onUpdate: () => void;
  onRender: () => void;
  isRunning: boolean;
  targetFPS?: number;
}

/**
 * Custom hook for managing game loop with requestAnimationFrame
 */
export function useGameLoop({
  onUpdate,
  onRender,
  isRunning,
}: GameLoopOptions) {
  const animationRef = useRef<number>();

  const gameLoop = useCallback(() => {
    onUpdate();
    onRender();

    if (isRunning) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  }, [onUpdate, onRender, isRunning]);

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, gameLoop]);
}
