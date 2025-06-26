import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from "lucide-react";
import { isPositiveChange, getChangeColor } from "../utils";

interface EffectChartProps {
  title: string;
  imageUrl: string;
  change?: string; // e.g., "+12.5%" or "-8.3%"
}

const EffectChart: React.FC<EffectChartProps> = ({ title, imageUrl, change }) => {
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
    <div className="flex flex-col relative gap-4 w-full h-full">
      {/* Title */}
      <div className="flex justify-between items-start w-full">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          {/* Blinking Arrow Component */}
          {change && (
            <div className="flex items-center mt-1">
              {isPositiveChange(change) ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1 animate-bounce" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1 animate-bounce" />
              )}
              <span
                className={`text-sm font-medium ${getChangeColor(
                  change
                )} animate-pulse`}
              >
                {change}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Chart container */}
      <div 
        className="flex flex-col relative gap-4 bg-grey-100 w-full h-full rounded-lg overflow-hidden bg-center border border-gray-200 bg-contain bg-no-repeat"
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
              transition: 'all 10s ease-in-out'
            }}
            onTransitionEnd={handleAnimationEnd}
          />
        {/* </div> */}
      </div>
    </div>
  );
};

export default EffectChart; 