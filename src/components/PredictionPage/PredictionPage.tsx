import React, { useContext, useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import EffectChart from "../EffectChart";
import { ShockEventContext } from "../../App";

interface ChartsGridProps {
  showCharts: boolean;
  onChartClick: () => void;
}

const ChartsGrid: React.FC<ChartsGridProps> = memo(
  ({ showCharts, onChartClick }) => (
    <div className="w-full animate-fade-in">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-2000 min-h-[400px] ${
          showCharts ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        
         <div onClick={onChartClick} className="cursor-pointer p-6 bg-white flex flex-col border border-gray-200 rounded-lg min-h-80 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
          <EffectChart title="BTC" imageUrl="/assets/bitcoin_new.png" />
        </div>
         <div onClick={onChartClick} className="cursor-pointer p-6 bg-white flex flex-col border border-gray-200 rounded-lg min-h-80 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
          <EffectChart title="S&P 500" imageUrl="/assets/sandp_new.png" />
        </div>
         <div onClick={onChartClick} className="cursor-pointer p-6 bg-white flex flex-col border border-gray-200 rounded-lg min-h-80 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
          <EffectChart title="Gold" imageUrl="/assets/gold_new.png" />
        </div>
        {/* <div onClick={onChartClick} className="cursor-pointer p-6 bg-white flex flex-col border border-gray-200 rounded-lg">
          <EffectChart title="S&P 500" imageUrl="/assets/sandp_new.png" />
        </div> */}
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
    const textTimer = setTimeout(() => setShowGeneratingText(false), 5500);
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
        <div className="mb-10 relative">
          <div className="flex justify-between">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
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
