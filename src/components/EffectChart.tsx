import React, { useState } from 'react';

const EffectChart: React.FC = () => {
  const [isDisappearing, setIsDisappearing] = useState(false);

  const handleButtonClick = () => {
    setIsDisappearing(true);
  };

  const handleAnimationEnd = () => {
    // Reset the animation after it completes if needed
    // setIsDisappearing(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      {/* Red square container */}
      <div className="relative w-64 h-64 bg-red-500 rounded-lg overflow-hidden">
        {/* Yellow div positioned 15% from bottom and 20% from left */}
        <div 
          className={`absolute h-3/5 bg-yellow-400 ${
            isDisappearing 
              ? 'transform translate-x-full opacity-100' 
              : 'transform translate-x-0 opacity-100'
          }`}
          style={{
            bottom: '15%',
            left: '20%',
            right: '0%',
            width: '80%',
            transition: 'all 6s ease-in-out'
          }}
          onTransitionEnd={handleAnimationEnd}
        />
      </div>
      
      {/* Button to trigger the effect */}
      <button
        onClick={handleButtonClick}
        disabled={isDisappearing}
        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
          isDisappearing 
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
        }`}
      >
        {isDisappearing ? 'Disappearing...' : 'Start Effect'}
      </button>
      
      {/* Reset button */}
      {isDisappearing && (
        <button
          onClick={() => setIsDisappearing(false)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default EffectChart; 