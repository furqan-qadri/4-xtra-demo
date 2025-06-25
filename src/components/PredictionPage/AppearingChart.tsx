import React, { useState, useEffect, useRef } from "react";

interface AppearingChartProps {
  imageUrl: string;
  title: string;
  // subheading: string;
  duration?: number; // Duration in milliseconds
  autoStart?: boolean;
  altText?: string; // Optional alt text for accessibility
}

const AppearingChart: React.FC<AppearingChartProps> = ({
  imageUrl,
  title,
  // subheading,
  duration = 7000,
  autoStart = true,
  altText,
}) => {
  const [revealPercentage, setRevealPercentage] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setRevealPercentage(50);
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current!;
      const progress = Math.min(elapsed / duration, 1);

      // Use easeOutQuart for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setRevealPercentage(50 + easedProgress * 50);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (autoStart) {
      // Wait one second before animation starts
      const timer = setTimeout(startAnimation, 2000);
      return () => clearTimeout(timer);
    }
  }, [autoStart, duration]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95">
      {/* Header section - matching ForecastPage chart header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        </div>
      </div>

      {/* Chart container - matching ForecastPage chart dimensions */}
      <div className="h-64">
        <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 h-full">
          {/* Container for the image with clip-path reveal */}
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt={altText || title}
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                clipPath: `inset(0 ${100 - revealPercentage}% 0 0)`,
                transition: isAnimating ? "none" : "clip-path 0.3s ease",
              }}
            />

            {/* Animated reveal line */}
            {/* {isAnimating && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-blue-500 shadow-lg"
                style={{
                  left: `${revealPercentage}%`,
                  boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)",
                }}
              >
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
              </div>
            )} */}

            {/* Progress indicator */}
            {/* <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
              {Math.round(revealPercentage)}% revealed
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearingChart;
