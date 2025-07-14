import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BALL_CONFIG,
  GAME_CONFIG,
  INITIAL_BALL_VELOCITY,
  PADDLE_CONFIG,
} from '../constants/gameConfig';
import { useGameLoop } from '../hooks/useGameLoop';
import { useKeyboard } from '../hooks/useKeyboard';
import { useResponsiveCanvas } from '../hooks/useResponsiveCanvas';
import { GameState, GameStatus } from '../types/game';
import { areAllBricksDestroyed, generateBricks } from '../utils/brickGenerator';
import {
  calculatePaddleReflection,
  checkBrickCollision,
  checkPaddleCollision,
  checkWallCollision,
  normalizeVelocity,
} from '../utils/physics';
import { Canvas, CanvasRef } from './Canvas';
import GameHeader from './GameHeader';
import { GameMenu } from './GameMenu';

/**
 * Main game engine component that manages game state and logic
 */
export const GameEngine: React.FC = () => {
  const canvasRef = useRef<CanvasRef>(null);
  const ballLaunchedRef = useRef(false);

  const canvasSize = useResponsiveCanvas();

  // Create a proper ref for mouse hook
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const { getKeyState } = useKeyboard();

  const setCanvasRef = useCallback((node: CanvasRef | null) => {
    // This callback ref is used to manage two refs:
    // 1. canvasRef: for the imperative handle to call draw()
    // 2. canvasElementRef: for the useMouse hook to get coordinates relative to the canvas
    if (node) {
      (canvasRef as React.MutableRefObject<CanvasRef | null>).current = node;
      canvasElementRef.current = node.getCanvas();
    }
  }, []);

  const [gameState, setGameState] = useState<GameState>(() => {
    const newPaddleWidth = canvasSize.width * 0.15; // Paddle width as a percentage of canvas width
    return {
      ball: {
        position: { 
          x: canvasSize.width / 2, 
          y: canvasSize.height - 50 - BALL_CONFIG.radius 
        },
        velocity: { x: 0, y: 0 },
        radius: BALL_CONFIG.radius,
      },
      paddle: {
        position: { 
          x: canvasSize.width / 2 - newPaddleWidth / 2,
          y: canvasSize.height - 50
        },
        dimensions: { width: newPaddleWidth, height: PADDLE_CONFIG.height },
        speed: PADDLE_CONFIG.speed,
      },
      bricks: generateBricks(canvasSize.width),
      score: 0,
      status: 'start' as GameStatus,
    };
  });

  const updateGame = useCallback(() => {
    if (gameState.status !== 'playing') return;

    setGameState(prevState => {
      const newState = { ...prevState };

      // Update paddle position based on input
      let targetX = newState.paddle.position.x;
      const keys = getKeyState();
      const paddleSpeed = newState.paddle.speed;
      if (keys.ArrowLeft || keys.KeyA) {
        targetX -= paddleSpeed;
      }
      if (keys.ArrowRight || keys.KeyD) {
        targetX += paddleSpeed;
      }

      // Keep paddle within bounds
      targetX = Math.max(0, Math.min(canvasSize.width - newState.paddle.dimensions.width, targetX));
      newState.paddle.position.x = targetX;

      // Launch ball if not launched yet
      if (!ballLaunchedRef.current) {
        const keys = getKeyState();
        if (keys.Space || keys.Enter) {
          newState.ball.velocity = { ...INITIAL_BALL_VELOCITY };
          ballLaunchedRef.current = true;
        }
      }

      // Update ball position if launched
      if (ballLaunchedRef.current) {
        newState.ball.position.x += newState.ball.velocity.x;
        newState.ball.position.y += newState.ball.velocity.y;

        // Check wall collisions
        const wallCollisions = checkWallCollision(newState.ball, canvasSize);
        
        if (wallCollisions.left || wallCollisions.right) {
          newState.ball.velocity.x = -newState.ball.velocity.x;
        }
        if (wallCollisions.top) {
          newState.ball.velocity.y = -newState.ball.velocity.y;
        }
        if (wallCollisions.bottom) {
          newState.status = 'gameOver';
        }

        // Check paddle collision
        const paddleCollision = checkPaddleCollision(newState.ball, newState.paddle);
        if (paddleCollision.collision) {
          const newVelocity = calculatePaddleReflection(newState.ball, newState.paddle);
          newState.ball.velocity = normalizeVelocity(newVelocity, BALL_CONFIG.initialSpeed);
        }

        // Check brick collisions
        newState.bricks.forEach(brick => {
          if (!brick.destroyed) {
            const collision = checkBrickCollision(newState.ball, brick);
            if (collision.collision) {
              brick.destroyed = true;
              newState.score += brick.points;

              // Simple collision response - reverse appropriate velocity component
              if (collision.side === 'top' || collision.side === 'bottom') {
                newState.ball.velocity.y = -newState.ball.velocity.y;
              } else {
                newState.ball.velocity.x = -newState.ball.velocity.x;
              }
            }
          }
        });

        // Check win condition
        if (areAllBricksDestroyed(newState.bricks)) {
          newState.status = 'win';
        }
      } else {
        // Ball follows paddle when not launched
        newState.ball.position.x = newState.paddle.position.x + newState.paddle.dimensions.width / 2;
        newState.ball.position.y = newState.paddle.position.y - newState.ball.radius;
      }

      return newState;
    });
  }, [gameState.status, canvasSize, getKeyState]);

  const render = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.render();
    }
  }, []);

  useGameLoop({
    onUpdate: updateGame,
    onRender: render,
    isRunning: gameState.status === 'playing',
    targetFPS: GAME_CONFIG.frameRate,
  });

  const handleStart = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'playing' }));
  }, []);

  const handlePause = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'paused' }));
  }, []);

  const handleRestart = useCallback(() => {
    ballLaunchedRef.current = false;
    const newPaddleWidth = canvasSize.width * 0.15;
    setGameState({
      ball: {
        position: { 
          x: canvasSize.width / 2, 
          y: canvasSize.height - 50 - BALL_CONFIG.radius 
        },
        velocity: { x: 0, y: 0 },
        radius: BALL_CONFIG.radius,
      },
      paddle: {
        position: { 
          x: canvasSize.width / 2 - newPaddleWidth / 2,
          y: canvasSize.height - 50
        },
        dimensions: { width: newPaddleWidth, height: PADDLE_CONFIG.height },
        speed: PADDLE_CONFIG.speed,
      },
      bricks: generateBricks(canvasSize.width),
      score: 0,
      status: 'playing',
    });
  }, [canvasSize]);

  useEffect(() => {
    handleRestart();
  }, [canvasSize, handleRestart]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && gameState.status === 'start') {
        event.preventDefault();
        handleStart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.status, handleStart]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-4xl">
        <GameHeader
          score={gameState.score}
          gameStatus={gameState.status}
          onPause={handlePause}
          onStart={handleStart}
          onRestart={handleRestart}
        />
        
        <div className="relative w-full h-full flex flex-col lg:flex-row justify-center items-center p-4 gap-4">
          <Canvas
          ref={setCanvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          ball={gameState.ball}
          paddle={gameState.paddle}
          bricks={gameState.bricks}
        />
          <GameMenu
            gameStatus={gameState.status}
            onStart={handleStart}
          />
        </div>

        {gameState.status === 'playing' && (
          <div className="mt-4 text-center text-gray-300">
            <p>Use mouse or arrow keys to move • Space to launch ball</p>
          </div>
        )}
      </div>
    </div>
  );
};