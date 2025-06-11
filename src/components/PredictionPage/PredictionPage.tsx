import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import AppearingChart from "./AppearingChart";
import { ShockEventContext } from "../../App";
import { PREDICTION_HEADINGS } from "../../data";

const PredictionPage: React.FC = () => {
  const navigate = useNavigate();
  const { shockEvent } = useContext(ShockEventContext);

  /* ─────────── phased UI state ─────────── */
  const [currentPhase, setCurrentPhase] = useState<"processing" | "content">(
    "processing"
  );
  const [processingIndex, setProcessingIndex] = useState(0);
  const [showCharts, setShowCharts] = useState(false);

  /* ─────────── processing phase timer ─────────── */
  useEffect(() => {
    const timer = setInterval(() => {
      setProcessingIndex((i) => {
        if (i >= PREDICTION_HEADINGS.length - 1) {
          setTimeout(() => {
            setCurrentPhase("content");
            // Show charts after a delay
            setTimeout(() => setShowCharts(true), 1000);
          }, 2000);
          return i;
        }
        return i + 1;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const handleBack = () => {
    navigate("/forecast");
  };

  /* ─────────── sub-components ─────────── */
  const ProcessingBanner = () => (
    <div className="flex items-center justify-center min-h-[400px] mt-16">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-12 max-w-2xl w-full mx-4 shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <BarChart3 className="w-12 h-12 text-blue-600 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {PREDICTION_HEADINGS[processingIndex]}
        </h3>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>
    </div>
  );

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
    <div className="w-full h-full bg-gray-50 overflow-y-auto">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Extreme Scenarios
        </h1>
        <p className="text-lg text-gray-600">
          Event: {shockEvent || "Trump imposing 100% tariffs"}
        </p>
      </div>

      {/* Processing Steps or Content */}
      {currentPhase === "processing" ? <ProcessingBanner /> : <MainContent />}

      {/* Add fade-in animation for content */}
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
