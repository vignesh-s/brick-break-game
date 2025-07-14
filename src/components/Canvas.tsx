import { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Ball, Paddle, Brick } from '../types/game';
import { BALL_CONFIG, PADDLE_CONFIG } from '../constants/gameConfig';

interface CanvasProps {
  ball: Ball;
  paddle: Paddle;
  bricks: Brick[];
  width: number;
  height: number;
  className?: string;
}

export interface CanvasRef {
  getContext: () => CanvasRenderingContext2D | null;
  getCanvas: () => HTMLCanvasElement | null;
  render: () => void;
}

/**
 * Canvas component for rendering game objects
 */
export const Canvas = forwardRef<CanvasRef, CanvasProps>((
  {
    ball,
    paddle,
    bricks,
    width,
    height,
    className = '',
  },
  ref
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const render = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1f2937'; // gray-800
    ctx.fillRect(0, 0, width, height);

    // Render bricks
    bricks.forEach(brick => {
      if (!brick.destroyed) {
        ctx.fillStyle = brick.color;
        ctx.fillRect(
          brick.position.x,
          brick.position.y,
          brick.dimensions.width,
          brick.dimensions.height
        );
        
        // Add border for better visibility
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          brick.position.x,
          brick.position.y,
          brick.dimensions.width,
          brick.dimensions.height
        );
      }
    });

    // Render paddle
    ctx.fillStyle = PADDLE_CONFIG.color;
    ctx.fillRect(
      paddle.position.x,
      paddle.position.y,
      paddle.dimensions.width,
      paddle.dimensions.height
    );

    // Render ball
    ctx.fillStyle = BALL_CONFIG.color;
    ctx.beginPath();
    ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
  }, [ball, paddle, bricks, width, height]);

  useImperativeHandle(ref, () => ({
    getContext: () => contextRef.current,
    getCanvas: () => canvasRef.current,
    render,
  }));

  useEffect(() => {
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext('2d');
      // Initial render
      render();
    }
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`border-2 border-gray-700 ${className}`}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
});

Canvas.displayName = 'Canvas';