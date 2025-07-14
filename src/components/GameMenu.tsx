import React from "react";
import { Play } from "lucide-react";
import { GameStatus } from "../types/game";

interface GameMenuProps {
  gameStatus: GameStatus;
  onStart: () => void;
}

/**
 * GameMenu component for game control buttons
 */
export const GameMenu: React.FC<GameMenuProps> = ({
  gameStatus,
  onStart,
}) => {
  const renderStartScreen = () => (
    <div className="text-center p-4">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
        Brick Breaker
      </h2>
      <p className="text-sm lg:text-base text-gray-300 mb-6">
        Use mouse or arrow keys to control the paddle. Press Space or click to
        launch the ball!
      </p>
      <button
        onClick={onStart}
        className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <Play className="w-5 h-5" />
        <span>Start Game</span>
      </button>
    </div>
  );

  const renderGameOverScreen = () => (
    <div className="text-center p-4">
      <h2 className="text-2xl lg:text-3xl font-bold text-red-400 mb-4">
        Game Over
      </h2>
      <p className="text-sm lg:text-base text-gray-300 mb-6">
        Better luck next time!
      </p>

    </div>
  );

  const renderWinScreen = () => (
    <div className="text-center p-4">
      <h2 className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-4">
        Congratulations!
      </h2>
      <p className="text-sm lg:text-base text-gray-300 mb-6">
        You cleared all the bricks!
      </p>

    </div>
  );

  const renderGameControls = () => (
    <div className="flex flex-row justify-center items-center space-x-4 w-full">
    </div>
  );

  if (gameStatus === "start") {
    return (
      <div className="lg:absolute lg:inset-0 lg:bg-black lg:bg-opacity-75 flex items-center justify-center z-10 mt-4 lg:mt-0">
        {renderStartScreen()}
      </div>
    );
  }

  if (gameStatus === "gameOver") {
    return (
      <div className="lg:absolute lg:inset-0 lg:bg-black lg:bg-opacity-75 flex items-center justify-center z-10 mt-4 lg:mt-0">
        {renderGameOverScreen()}
      </div>
    );
  }

  if (gameStatus === "win") {
    return (
      <div className="lg:absolute lg:inset-0 lg:bg-black lg:bg-opacity-75 flex items-center justify-center z-10 mt-4 lg:mt-0">
        {renderWinScreen()}
      </div>
    );
  }

  if (gameStatus === "paused") {
    return (
      <div className="lg:absolute lg:inset-0 lg:bg-black lg:bg-opacity-75 flex items-center justify-center z-10 mt-4 lg:mt-0">
        <div className="text-center p-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
            Game Paused
          </h2>
          {renderGameControls()}
        </div>
      </div>
    );
  }

  // Show controls for playing state
  return <div className="mt-4">{renderGameControls()}</div>;
};
