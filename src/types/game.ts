// Game entity interfaces and types
export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Ball {
  position: Position;
  velocity: Velocity;
  radius: number;
}

export interface Paddle {
  position: Position;
  dimensions: Dimensions;
  speed: number;
}

export interface Brick {
  id: string;
  position: Position;
  dimensions: Dimensions;
  color: string;
  points: number;
  destroyed: boolean;
}

export interface GameState {
  ball: Ball;
  paddle: Paddle;
  bricks: Brick[];
  score: number;
  lives: number;
  level: number;
  status: GameStatus;
}

export type GameStatus = 'start' | 'playing' | 'paused' | 'gameOver' | 'win';

export interface CanvasSize {
  width: number;
  height: number;
}

export interface CollisionResult {
  collision: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
}