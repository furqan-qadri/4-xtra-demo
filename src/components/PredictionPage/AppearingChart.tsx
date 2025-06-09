import React, { useState, useEffect, useRef } from "react";

interface ProgressiveGraphRevealProps {
  imageUrl: string;
  duration?: number; // Duration in milliseconds
  autoStart?: boolean;
}

const ProgressiveGraphReveal: React.FC<ProgressiveGraphRevealProps> = ({
  imageUrl,
  duration = 5000,
  autoStart = true,
}) => {
  const [revealPercentage, setRevealPercentage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsComplete(false);
    setRevealPercentage(0);
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current!;
      const progress = Math.min(elapsed / duration, 1);

      // Use easeOutQuart for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setRevealPercentage(easedProgress * 100);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setIsComplete(true);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const resetAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setRevealPercentage(0);
    setIsAnimating(false);
    setIsComplete(false);
  };

  useEffect(() => {
    if (autoStart) {
      // Small delay to ensure image is loaded
      const timer = setTimeout(startAnimation, 500);
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
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Crude Oil Price Analysis
        </h2>
        <p className="text-gray-600">
          Watch as the graph reveals the impact of trade policies on oil prices
        </p>
      </div>

      <div className="relative bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200">
        {/* Container for the image with clip-path reveal */}
        <div
          className="relative w-full"
          style={{ paddingBottom: "60%" }} // Maintain aspect ratio
        >
          <img
            src={imageUrl}
            alt="Crude Oil Price Graph"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              clipPath: `inset(0 ${100 - revealPercentage}% 0 0)`,
              transition: isAnimating ? "none" : "clip-path 0.3s ease",
            }}
          />

          {/* Animated reveal line */}
          {isAnimating && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-blue-500 shadow-lg"
              style={{
                left: `${revealPercentage}%`,
                boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)",
              }}
            >
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
            </div>
          )}

          {/* Progress indicator */}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
            {Math.round(revealPercentage)}% revealed
          </div>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex gap-3 mt-6 justify-center">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isAnimating
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
          }`}
        >
          {isAnimating
            ? "Generating..."
            : isComplete
            ? "Replay Animation"
            : "Start Animation"}
        </button>

        <button
          onClick={resetAnimation}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 active:bg-gray-800 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Animation status */}
      <div className="mt-4 text-center">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-100"
            style={{ width: `${revealPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {isAnimating && "Analyzing market data..."}
          {isComplete &&
            "Analysis complete! The graph shows the correlation between trade policies and oil prices."}
          {!isAnimating && !isComplete && "Ready to begin analysis"}
        </p>
      </div>
    </div>
  );
};

// Example usage component
const AppearingChart: React.FC = () => {
  // You'll need to upload your image and use its URL here
  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Black_cherry_tree_histogram.svg/1200px-Black_cherry_tree_histogram.svg.png";

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ProgressiveGraphReveal
        imageUrl={imageUrl}
        duration={4000}
        autoStart={true}
      />

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-3">How to use:</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            Replace the{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">imageUrl</code> prop
            with your actual crude oil graph image URL
          </li>
          <li>
            Adjust the{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">duration</code> prop
            to control animation speed (in milliseconds)
          </li>
          <li>
            Set <code className="bg-gray-100 px-2 py-1 rounded">autoStart</code>{" "}
            to false if you want manual control
          </li>
          <li>
            The component will progressively reveal your graph from left to
            right
          </li>
        </ol>
      </div>
    </div>
  );
};

export default AppearingChart;
