import { Ball, Paddle, Brick, Position, Velocity, CollisionResult, CanvasSize } from '../types/game';

/**
 * Check collision between ball and rectangular object
 */
export function checkRectCollision(
  ballPos: Position,
  ballRadius: number,
  rectPos: Position,
  rectWidth: number,
  rectHeight: number
): CollisionResult {
  const closestX = Math.max(rectPos.x, Math.min(ballPos.x, rectPos.x + rectWidth));
  const closestY = Math.max(rectPos.y, Math.min(ballPos.y, rectPos.y + rectHeight));
  
  const distanceX = ballPos.x - closestX;
  const distanceY = ballPos.y - closestY;
  const distanceSquared = distanceX * distanceX + distanceY * distanceY;
  
  const collision = distanceSquared <= ballRadius * ballRadius;
  
  if (!collision) {
    return { collision: false };
  }

  // Determine collision side
  let side: 'top' | 'bottom' | 'left' | 'right' = 'top';
  
  const ballCenterX = ballPos.x;
  const ballCenterY = ballPos.y;
  const rectCenterX = rectPos.x + rectWidth / 2;
  const rectCenterY = rectPos.y + rectHeight / 2;
  
  const deltaX = ballCenterX - rectCenterX;
  const deltaY = ballCenterY - rectCenterY;
  
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    side = deltaX > 0 ? 'right' : 'left';
  } else {
    side = deltaY > 0 ? 'bottom' : 'top';
  }
  
  return { collision: true, side };
}

/**
 * Check collision between ball and paddle
 */
export function checkPaddleCollision(ball: Ball, paddle: Paddle): CollisionResult {
  return checkRectCollision(
    ball.position,
    ball.radius,
    paddle.position,
    paddle.dimensions.width,
    paddle.dimensions.height
  );
}

/**
 * Check collision between ball and brick
 */
export function checkBrickCollision(ball: Ball, brick: Brick): CollisionResult {
  if (brick.destroyed) {
    return { collision: false };
  }
  
  return checkRectCollision(
    ball.position,
    ball.radius,
    brick.position,
    brick.dimensions.width,
    brick.dimensions.height
  );
}

/**
 * Check collision with canvas walls
 */
export function checkWallCollision(ball: Ball, canvasSize: CanvasSize): { top: boolean; left: boolean; right: boolean; bottom: boolean } {
  return {
    top: ball.position.y - ball.radius <= 0,
    left: ball.position.x - ball.radius <= 0,
    right: ball.position.x + ball.radius >= canvasSize.width,
    bottom: ball.position.y + ball.radius >= canvasSize.height,
  };
}

/**
 * Calculate paddle collision angle effect
 */
export function calculatePaddleReflection(ball: Ball, paddle: Paddle): Velocity {
  const paddleCenter = paddle.position.x + paddle.dimensions.width / 2;
  const ballRelativePosition = ball.position.x - paddleCenter;
  const normalizedPosition = ballRelativePosition / (paddle.dimensions.width / 2);
  
  // Clamp between -1 and 1
  const clampedPosition = Math.max(-1, Math.min(1, normalizedPosition));
  
  const angle = clampedPosition * Math.PI / 4; // Max 45 degrees
  const speed = Math.sqrt(ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y);
  
  return {
    x: Math.sin(angle) * speed,
    y: -Math.abs(Math.cos(angle) * speed), // Always upward
  };
}

/**
 * Normalize vector to maintain consistent speed
 */
export function normalizeVelocity(velocity: Velocity, targetSpeed: number): Velocity {
  const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  const ratio = targetSpeed / currentSpeed;
  
  return {
    x: velocity.x * ratio,
    y: velocity.y * ratio,
  };
}