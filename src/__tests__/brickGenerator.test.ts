import { describe, it, expect } from 'vitest';
import { generateBricks, areAllBricksDestroyed, calculateScore } from '../utils/brickGenerator';
import { BRICK_CONFIG, CANVAS_CONFIG } from '../constants/gameConfig';

describe('Brick Generator Utils', () => {
  describe('generateBricks', () => {
    it('should generate correct number of bricks', () => {
      const bricks = generateBricks(CANVAS_CONFIG.width);
      const expectedCount = BRICK_CONFIG.rows * BRICK_CONFIG.cols;
      
      expect(bricks).toHaveLength(expectedCount);
    });

    it('should generate bricks with unique IDs', () => {
      const bricks = generateBricks(CANVAS_CONFIG.width);
      const ids = bricks.map(brick => brick.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should generate bricks with correct colors based on row', () => {
      const bricks = generateBricks(CANVAS_CONFIG.width);
      
      // Check first two rows are red
      const redBricks = bricks.filter(brick => brick.id.includes('-0-') || brick.id.includes('-1-'));
      expect(redBricks.every(brick => brick.color === BRICK_CONFIG.colors.red.color)).toBe(true);
      
      // Check rows 2-3 are orange
      const orangeBricks = bricks.filter(brick => brick.id.includes('-2-') || brick.id.includes('-3-'));
      expect(orangeBricks.every(brick => brick.color === BRICK_CONFIG.colors.orange.color)).toBe(true);
      
      // Check rows 4-5 are green
      const greenBricks = bricks.filter(brick => brick.id.includes('-4-') || brick.id.includes('-5-'));
      expect(greenBricks.every(brick => brick.color === BRICK_CONFIG.colors.green.color)).toBe(true);
    });

    it('should position bricks correctly', () => {
      const bricks = generateBricks(CANVAS_CONFIG.width);
      const firstBrick = bricks[0]; // Should be at row 0, col 0

      // Calculate expected dimensions based on the logic in generateBricks
      const totalPadding = BRICK_CONFIG.padding * (BRICK_CONFIG.cols + 1);
      const availableWidth = CANVAS_CONFIG.width - totalPadding;
      const expectedBrickWidth = availableWidth / BRICK_CONFIG.cols;
      const expectedBrickHeight = expectedBrickWidth / 3.5;

      expect(firstBrick.position.x).toBe(BRICK_CONFIG.padding);
      expect(firstBrick.position.y).toBe(BRICK_CONFIG.offsetTop);
      expect(firstBrick.dimensions.width).toBeCloseTo(expectedBrickWidth);
      expect(firstBrick.dimensions.height).toBeCloseTo(expectedBrickHeight);
    });
  });

  describe('areAllBricksDestroyed', () => {
    it('should return true when all bricks are destroyed', () => {
      const bricks = generateBricks(CANVAS_CONFIG.width).map(brick => ({ ...brick, destroyed: true }));
      
      expect(areAllBricksDestroyed(bricks)).toBe(true);
    });

    it('should return false when some bricks remain', () => {
      const bricks = generateBricks(CANVAS_CONFIG.width);
      bricks[0].destroyed = true;
      bricks[1].destroyed = true;
      // Leave others intact
      
      expect(areAllBricksDestroyed(bricks)).toBe(false);
    });

    it('should return false when no bricks are destroyed', () => {
      const bricks = generateBricks(CANVAS_CONFIG.width);
      
      expect(areAllBricksDestroyed(bricks)).toBe(false);
    });
  });

  describe('calculateScore', () => {
    it('should calculate correct score for destroyed bricks', () => {
      const bricks = generateBricks(CANVAS_CONFIG.width);
      
      // Destroy a few bricks from different rows
      // Brick indices depend on BRICK_CONFIG.cols
      const cols = BRICK_CONFIG.cols;
      bricks[0].destroyed = true; // Row 0, red
      bricks[2 * cols].destroyed = true; // Row 2, orange
      bricks[4 * cols].destroyed = true; // Row 4, green
      
      const expectedScore = BRICK_CONFIG.colors.red.points + 
                           BRICK_CONFIG.colors.orange.points + 
                           BRICK_CONFIG.colors.green.points;
      
      expect(calculateScore(bricks)).toBe(expectedScore);
    });

    it('should return 0 when no bricks are destroyed', () => {
      const bricks = generateBricks(CANVAS_CONFIG.width);
      
      expect(calculateScore(bricks)).toBe(0);
    });

    it('should not count intact bricks in score', () => {
      const bricks = generateBricks(CANVAS_CONFIG.width);
      bricks[0].destroyed = true; // Only destroy one brick
      
      expect(calculateScore(bricks)).toBe(BRICK_CONFIG.colors.red.points);
    });
  });
});