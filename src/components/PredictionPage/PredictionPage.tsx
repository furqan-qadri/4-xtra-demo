import React, { useContext, useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import AppearingChart from "./AppearingChart";
import { ShockEventContext } from "../../App";
import { PREDICTION_HEADINGS } from "../../data";

const MemoAppearingChart = memo(AppearingChart);

interface ChartsGridProps {
  showCharts: boolean;
}

const ChartsGrid: React.FC<ChartsGridProps> = memo(({ showCharts }) => (
  <div className="p-8 animate-fade-in">
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
        showCharts ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <MemoAppearingChart
        title="Crude Oil"
        subheading="Variation of Crude Oil"
        imageUrl="/assets/crude.jpg"
      />
      <MemoAppearingChart
        title="BTCUSD"
        subheading="Variation of BTC"
        imageUrl="/assets/bitcoin.jpg"
      />
      <MemoAppearingChart
        title="Gold"
        subheading="Variation of Gold"
        imageUrl="/assets/Gold.jpg"
      />
      <MemoAppearingChart
        title="NASDAQ 100"
        subheading="Variation of NASDAQ"
        imageUrl="/assets/nasdaq.jpg"
      />
      <MemoAppearingChart
        title="Silver"
        subheading="Variation of Silver"
        imageUrl="/assets/silver.jpg"
      />
      <MemoAppearingChart
        title="Dow Jones Industrial Average"
        subheading="Variation of Dow Jones"
        imageUrl="/assets/dji.jpg"
      />
      <MemoAppearingChart
        title="Russel 2000"
        subheading="Variation of Russel 2000"
        imageUrl="/assets/russel2000.jpg"
      />
      <MemoAppearingChart
        title="S&P 500 Index"
        subheading="Variation of S&P 500"
        imageUrl="/assets/sandp.jpg"
      />
    </div>
  </div>
));

const PredictionPage: React.FC = () => {
  const navigate = useNavigate();
  const { shockEvent } = useContext(ShockEventContext);

  /* ─────────── UI state ─────────── */
  const [showCharts, setShowCharts] = useState(false);
  const [showGeneratingText, setShowGeneratingText] = useState(true);

  /* ─── chart / text timers ─── */
  useEffect(() => {
    const chartTimer = setTimeout(() => setShowCharts(true), 500);
    const textTimer = setTimeout(() => setShowGeneratingText(false), 13000);

    return () => {
      clearTimeout(chartTimer);
      clearTimeout(textTimer);
    };
  }, []);

  const handleBack = () => {
    navigate("/forecast");
  };

  return (
    <div className="w-full h-full bg-transparent overflow-y-auto">
      {/* Header */}
      <div className="p-8 pb-0">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-800 mr-4 flex items-center"
          >
            ← Back to Forecast
          </button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Extreme Scenarios
          </h1>
          <div
            className={`text-lg font-semibold text-gray-700 transition-opacity duration-500 ${
              showGeneratingText ? "animate-blink opacity-100" : "opacity-0"
            }`}
            style={{ minWidth: "280px" }}
          >
            Generating Synthetic Trajectories...
          </div>
        </div>
        <p className="text-lg text-gray-600">
          Event: {shockEvent || "Trump imposing 100% tariffs"}
        </p>
      </div>

      {/* Memoized Charts Grid */}
      <ChartsGrid showCharts={showCharts} />

      {/* Animations */}
      <style jsx>{`
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
    </div>
  );
};

export default PredictionPage;
