import React, { useState, useEffect } from 'react';

interface EffectChartProps {
  title: string;
  imageUrl: string;
}

const EffectChart: React.FC<EffectChartProps> = ({ title, imageUrl }) => {
  const [isDisappearing, setIsDisappearing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisappearing(true);
    }, 1000); // Start animation after 1 second

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleAnimationEnd = () => {
    // Reset the animation after it completes if needed
    // setIsDisappearing(false);
  };

  return (
    <div className="flex flex-col relative items-center gap-4 w-full h-full">
      {/* Title */}
      <div className="flex justify-between items-start mb-4 w-full">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
      
      {/* Chart container */}
      <div 
        className="flex flex-col relative items-center p-12 gap-4 w-full h-full rounded-lg overflow-hidden bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      >
        {/* Red square container */}
        {/* <div className="relative w-64 h-64 bg-red-500 rounded-lg overflow-hidden"> */}
          {/* Yellow div positioned 15% from bottom and 20% from left */}
          <div 
            className={`absolute h-3/5 bg-white ${
              isDisappearing 
                ? 'transform translate-x-full opacity-100' 
                : 'transform translate-x-0 opacity-100'
            }`}
            style={{
              bottom: '50%',
              left: '52%',
              right: '0%',
              top: '15%',
              width: '90%',
              height: '65%',
              transition: 'all 6s ease-in-out'
            }}
            onTransitionEnd={handleAnimationEnd}
          />
        {/* </div> */}
      </div>
    </div>
  );
};

export default EffectChart; 