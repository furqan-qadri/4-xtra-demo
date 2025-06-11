import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import AppearingChart from "./AppearingChart";
import { ShockEventContext } from "../../App";
import { PREDICTION_HEADINGS } from "../../data";

const PredictionPage: React.FC = () => {
  const navigate = useNavigate();
  const { shockEvent } = useContext(ShockEventContext);

  /* ─────────── UI state ─────────── */
  const [showCharts, setShowCharts] = useState(false);

  /* ─────────── chart loading timer ─────────── */
  useEffect(() => {
    // Show charts after a short delay
    const timer = setTimeout(() => setShowCharts(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate("/forecast");
  };

  /* ─────────── sub-components ─────────── */
  const MainContent = () => (
    <div className="p-8 animate-fade-in">
      {/* Charts Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
          showCharts ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <AppearingChart
          title="Crude Oil"
          subheading="Variation of Crude Oil"
          imageUrl="/assets/crude.jpg"
        />
        <AppearingChart
          title="BTCUSD"
          subheading="Variation of BTC"
          imageUrl="/assets/bitcoin.jpg"
        />
        <AppearingChart
          title="Gold"
          subheading="Variation of Gold"
          imageUrl="/assets/Gold.jpg"
        />
        <AppearingChart
          title="NASDAQ 100"
          subheading="Variation of NASDAQ"
          imageUrl="/assets/nasdaq.jpg"
        />
        <AppearingChart
          title="Silver"
          subheading="Variation of Silver"
          imageUrl="/assets/silver.jpg"
        />
        <AppearingChart
          title="Dow Jones Industrial Average"
          subheading="Variation of Dow Jones"
          imageUrl="/assets/dji.jpg"
        />
        <AppearingChart
          title="Russel 2000"
          subheading="Variation of Russel 2000"
          imageUrl="/assets/russel2000.jpg"
        />
        <AppearingChart
          title="S&P 500 Index"
          subheading="Variation of S&P 500"
          imageUrl="/assets/sandp.jpg"
        />
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-transparent overflow-y-auto">
      {/* Header Section - Always visible */}
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
        </div>
        <p className="text-lg text-gray-600">
          {/* Event: {shockEvent || "Trump imposing 100% tariffs"} */}
          Event: {"Trump tariffs intensify in the next week"}
        </p>
      </div>

      {/* Main Content */}
      <MainContent />

      {/* Add fade-in and blink animations */}
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

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PredictionPage;
