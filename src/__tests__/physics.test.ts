import { describe, it, expect } from 'vitest';
import {
  checkRectCollision,
  checkWallCollision,
  calculatePaddleReflection,
  normalizeVelocity,
} from '../utils/physics';
import { Ball, Paddle } from '../types/game';
import { CANVAS_CONFIG } from '../constants/gameConfig';

describe('Physics Utils', () => {
  describe('checkRectCollision', () => {
    it('should detect collision when ball overlaps rectangle', () => {
      const result = checkRectCollision(
        { x: 50, y: 50 }, // ball position
        10, // ball radius
        { x: 40, y: 40 }, // rect position
        20, // rect width
        20 // rect height
      );
      
      expect(result.collision).toBe(true);
    });

    it('should not detect collision when ball is far from rectangle', () => {
      const result = checkRectCollision(
        { x: 100, y: 100 }, // ball position
        10, // ball radius
        { x: 40, y: 40 }, // rect position
        20, // rect width
        20 // rect height
      );
      
      expect(result.collision).toBe(false);
    });

    it('should detect correct collision side', () => {
      const result = checkRectCollision(
        { x: 50, y: 30 }, // ball position (above rect)
        10, // ball radius
        { x: 40, y: 40 }, // rect position
        20, // rect width
        20 // rect height
      );
      
      expect(result.collision).toBe(true);
      expect(result.side).toBe('top');
    });
  });

  describe('checkWallCollision', () => {
    it('should detect top wall collision', () => {
      const ball: Ball = {
        position: { x: 100, y: 5 },
        velocity: { x: 0, y: -1 },
        radius: 10,
      };

      const result = checkWallCollision(ball, CANVAS_CONFIG);
      expect(result.top).toBe(true);
      expect(result.left).toBe(false);
      expect(result.right).toBe(false);
      expect(result.bottom).toBe(false);
    });

    it('should detect left wall collision', () => {
      const ball: Ball = {
        position: { x: 5, y: 100 },
        velocity: { x: -1, y: 0 },
        radius: 10,
      };

      const result = checkWallCollision(ball, CANVAS_CONFIG);
      expect(result.left).toBe(true);
      expect(result.top).toBe(false);
      expect(result.right).toBe(false);
      expect(result.bottom).toBe(false);
    });

    it('should detect right wall collision', () => {
      const ball: Ball = {
        position: { x: CANVAS_CONFIG.width - 5, y: 100 },
        velocity: { x: 1, y: 0 },
        radius: 10,
      };

      const result = checkWallCollision(ball, CANVAS_CONFIG);
      expect(result.right).toBe(true);
      expect(result.left).toBe(false);
      expect(result.top).toBe(false);
      expect(result.bottom).toBe(false);
    });
  });

  describe('calculatePaddleReflection', () => {
    it('should reflect ball straight up when hitting paddle center', () => {
      const ball: Ball = {
        position: { x: 100, y: 100 },
        velocity: { x: 0, y: 5 },
        radius: 10,
      };

      const paddle: Paddle = {
        position: { x: 75, y: 110 },
        dimensions: { width: 50, height: 10 },
        speed: 5,
      };

      const result = calculatePaddleReflection(ball, paddle);
      expect(result.x).toBeCloseTo(0, 1);
      expect(result.y).toBeLessThan(0); // Should be negative (upward)
    });

    it('should reflect ball at angle when hitting paddle edge', () => {
      const ball: Ball = {
        position: { x: 120, y: 100 }, // Right side of paddle
        velocity: { x: 0, y: 5 },
        radius: 10,
      };

      const paddle: Paddle = {
        position: { x: 75, y: 110 },
        dimensions: { width: 50, height: 10 },
        speed: 5,
      };

      const result = calculatePaddleReflection(ball, paddle);
      expect(result.x).toBeGreaterThan(0); // Should have rightward component
      expect(result.y).toBeLessThan(0); // Should be negative (upward)
    });
  });

  describe('normalizeVelocity', () => {
    it('should maintain target speed', () => {
      const velocity = { x: 3, y: 4 }; // Speed = 5
      const targetSpeed = 10;

      const result = normalizeVelocity(velocity, targetSpeed);
      const actualSpeed = Math.sqrt(result.x * result.x + result.y * result.y);
      
      expect(actualSpeed).toBeCloseTo(targetSpeed, 1);
    });

    it('should preserve direction', () => {
      const velocity = { x: 1, y: 1 };
      const targetSpeed = 5;

      const result = normalizeVelocity(velocity, targetSpeed);
      
      // Both components should be positive (same direction)
      expect(result.x).toBeGreaterThan(0);
      expect(result.y).toBeGreaterThan(0);
      
      // Ratio should be preserved
      expect(Math.abs(result.x - result.y)).toBeLessThan(0.1);
    });
  });
});