import { CanvasSize, Velocity } from '../types/game';

export const CANVAS_CONFIG: CanvasSize = {
  width: 800,
  height: 600,
};

export const BALL_CONFIG = {
  radius: 10,
  initialSpeed: 5,
  maxSpeed: 8,
  color: '#10b981', // emerald-500
};

export const PADDLE_CONFIG = {
  width: 100,
  height: 15,
  speed: 8,
  color: '#ffffff',
  initialPosition: {
    x: CANVAS_CONFIG.width / 2 - 50,
    y: CANVAS_CONFIG.height - 50,
  },
};

export const BRICK_CONFIG = {
  width: 100,
  height: 30,
  rows: 6,
  cols: 7,
  padding: 10,
  offsetTop: 50,
  offsetLeft: 50,
  colors: {
    red: { color: '#ef4444', points: 10 },
    orange: { color: '#f97316', points: 20 },
    green: { color: '#10b981', points: 30 },
  },
};

export const GAME_CONFIG = {
  initialLives: 3,
  frameRate: 60,
  ballStartDelay: 1000, // ms
};

export const INITIAL_BALL_VELOCITY: Velocity = {
  x: 3,
  y: -4,
};