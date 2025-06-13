import React, { useContext, useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import AppearingChart from "./AppearingChart";
import { ShockEventContext } from "../../App";

const MemoAppearingChart = memo(AppearingChart);

interface ChartsGridProps {
  showCharts: boolean;
  onChartClick: () => void;
}

const ChartsGrid: React.FC<ChartsGridProps> = memo(
  ({ showCharts, onChartClick }) => (
    <div className="p-8 w-full animate-fade-in">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-2000 ${
          showCharts ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div onClick={onChartClick} className="cursor-pointer">
          <MemoAppearingChart title="BTCUSD" imageUrl="/assets/bitcoin.png" />
        </div>
        <div onClick={onChartClick} className="cursor-pointer">
          <MemoAppearingChart
            title="NASDAQ 100"
            imageUrl="/assets/nasdaq.png"
          />
        </div>
        <div onClick={onChartClick} className="cursor-pointer">
          <MemoAppearingChart
            title="S&P 500 Index"
            imageUrl="/assets/sandp.png"
          />
        </div>
      </div>
    </div>
  )
);

const PredictionPage: React.FC = () => {
  const navigate = useNavigate();
  const { shockEvent } = useContext(ShockEventContext);

  /* ─────────── UI state ─────────── */
  const [showCharts, setShowCharts] = useState(false);
  const [showGeneratingText, setShowGeneratingText] = useState(true);

  /* ─── scroll to top on mount ─── */
  useEffect(() => {
    // Immediate scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also scroll after a short delay to handle any layout shifts
    const scrollTimer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, []);

  /* ─── chart / text timers ─── */
  useEffect(() => {
    const chartTimer = setTimeout(() => setShowCharts(true), 500);
    const textTimer = setTimeout(() => setShowGeneratingText(false), 4500);
    return () => {
      clearTimeout(chartTimer);
      clearTimeout(textTimer);
    };
  }, []);

  /* ─── navigation handler ─── */
  const handleNavigateHome = () => {
    navigate("/");
  };

  /* ─── navigate on Enter ─── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleNavigateHome();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="w-full min-h-screen relative overflow-y-auto flex flex-col items-center justify-center">
      {/* CSS Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0.3;
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-blink {
          animation: blink 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Centered Content Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col">
        {/* Header */}
        <div className="p-8 pb-0 relative">
          <div className="flex mb-2 justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Market Scenarios
            </h1>
            <div
              className={` hidden lg:flex text-2xl font-semibold text-gray-700 transition-opacity duration-500 ${
                showGeneratingText ? "animate-blink opacity-100" : "opacity-0"
              }`}
            >
              Generating Synthetic Trajectories...
            </div>
          </div>
          <p className="text-lg text-gray-600">
            Event: {shockEvent || "Trump imposing 100% tariffs"}
          </p>
        </div>

        {/* Memoized Charts Grid */}
        <div className="relative z-10 w-full flex justify-center">
          <ChartsGrid
            showCharts={showCharts}
            onChartClick={handleNavigateHome}
          />
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
