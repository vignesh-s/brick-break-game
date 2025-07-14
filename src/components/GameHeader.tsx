import React from 'react';


interface GameHeaderProps {
  score: number;
  level: number;
  lives: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  score, 
  level, 
  lives,
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white rounded-lg">
      <div className="flex items-center space-x-6">
        <div className="text-xl font-bold">
          Score: <span className="text-green-400">{score}</span>
        </div>
        <div className="text-lg">
          Level: <span className="text-blue-400">{level}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-lg font-semibold">Lives:</span>
        <div className="flex space-x-1">
          {Array.from({ length: lives }, (_, index) => (
            <div key={index} className="w-6 h-6 bg-red-500 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
