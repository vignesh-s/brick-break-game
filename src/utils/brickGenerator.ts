import { Brick } from '../types/game';
import { BRICK_CONFIG } from '../constants/gameConfig';

/**
 * Generate brick grid for the game
 */
export function generateBricks(canvasWidth: number): Brick[] {
  const bricks: Brick[] = [];

  // Adjust brick dimensions based on canvas width
  const totalPadding = BRICK_CONFIG.padding * (BRICK_CONFIG.cols + 1);
  const availableWidth = canvasWidth - totalPadding;
  const brickWidth = availableWidth / BRICK_CONFIG.cols;
  const brickHeight = brickWidth / 3.5; // Maintain an aspect ratio for bricks

  const offsetLeft = BRICK_CONFIG.padding;

  for (let row = 0; row < BRICK_CONFIG.rows; row++) {
    for (let col = 0; col < BRICK_CONFIG.cols; col++) {
      // Determine color based on row
      let colorConfig;
      if (row < 2) {
        colorConfig = BRICK_CONFIG.colors.red;
      } else if (row < 4) {
        colorConfig = BRICK_CONFIG.colors.orange;
      } else {
        colorConfig = BRICK_CONFIG.colors.green;
      }

      const brick: Brick = {
        id: `brick-${row}-${col}`,
        position: {
          x: offsetLeft + col * (brickWidth + BRICK_CONFIG.padding),
          y: BRICK_CONFIG.offsetTop + row * (brickHeight + BRICK_CONFIG.padding),
        },
        dimensions: {
          width: brickWidth,
          height: brickHeight,
        },
        color: colorConfig.color,
        points: colorConfig.points,
        destroyed: false,
      };

      bricks.push(brick);
    }
  }
  
  return bricks;
}

/**
 * Check if all bricks are destroyed
 */
export function areAllBricksDestroyed(bricks: Brick[]): boolean {
  return bricks.every(brick => brick.destroyed);
}

/**
 * Get total score from destroyed bricks
 */
export function calculateScore(bricks: Brick[]): number {
  return bricks.filter(brick => brick.destroyed).reduce((sum, brick) => sum + brick.points, 0);
}