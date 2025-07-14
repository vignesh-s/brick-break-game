import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { GameStatus } from '../types/game';

interface GameHeaderProps {
  score: number;
  gameStatus: GameStatus;
  onPause: () => void;
  onStart: () => void;
  onRestart: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  score,
  gameStatus,
  onPause,
  onStart,
  onRestart
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white rounded-lg">
      <div className="flex items-center space-x-6">
        <div className="text-xl font-bold">
          Score: <span className="text-green-400">{score}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={gameStatus === 'playing' ? onPause : onStart}
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          {gameStatus === 'playing' ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span>{gameStatus === 'playing' ? 'Pause' : 'Resume'}</span>
        </button>
        <button
          onClick={onRestart}
          className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart</span>
        </button>
      </div>

    </div>
  );
};

export default GameHeader;
