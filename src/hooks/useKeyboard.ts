import { useEffect, useCallback, useRef } from 'react';

export interface KeyboardState {
  [key: string]: boolean;
}

/**
 * Custom hook for keyboard input handling
 */
export function useKeyboard() {
  const keysPressed = useRef<KeyboardState>({});

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    keysPressed.current[event.code] = true;
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    keysPressed.current[event.code] = false;
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return { 
    getKeyState: useCallback(() => ({ ...keysPressed.current }), []) 
  };
}