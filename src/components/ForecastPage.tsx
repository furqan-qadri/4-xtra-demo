import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MAIN_IMPACTED_SECTORS,
  SHOCK_EVENT_ANALYSIS,
  CHART_CONFIG,
  UI_TEXT,
  PROCESSING_HEADINGS,
} from "../data";
import type { MarketSector } from "../types";
import {
  formatDate,
  formatPrice,
  getChangeColor,
  isPositiveChange,
} from "../utils";

const ForecastPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<
    "header" | "processing" | "charts"
  >("header");
  const [processingIndex, setProcessingIndex] = useState(0);
  const [visibleCharts, setVisibleCharts] = useState<number[]>([]);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const [showMainTitle, setShowMainTitle] = useState(false);

  useEffect(() => {
    // Phase 1: Show header for 2 seconds
    const headerTimer = setTimeout(() => {
      setCurrentPhase("processing");
    }, 2000);

    return () => clearTimeout(headerTimer);
  }, []);

  useEffect(() => {
    if (currentPhase === "processing") {
      // Phase 2: Cycle through processing headings
      const processingTimer = setInterval(() => {
        setProcessingIndex((prev) => {
          if (prev >= PROCESSING_HEADINGS.length - 1) {
            setCurrentPhase("charts");
            return prev;
          }
          return prev + 1;
        });
      }, 200);

      return () => clearInterval(processingTimer);
    }
  }, [currentPhase]);

  useEffect(() => {
    if (currentPhase === "charts") {
      // Step 1: Show main title first (2 seconds)
      if (!showMainTitle) {
        const titleTimer = setTimeout(() => {
          setShowMainTitle(true);
        }, 2000);
        return () => clearTimeout(titleTimer);
      }

      // Step 2: Show charts one by one with 4-second gaps
      if (showMainTitle && currentChartIndex < MAIN_IMPACTED_SECTORS.length) {
        const chartTimer = setTimeout(
          () => {
            setVisibleCharts((prev) => [...prev, currentChartIndex]);
            setCurrentChartIndex((prev) => prev + 1);
          },
          currentChartIndex === 0 ? 1000 : 4000
        ); // 1s for first chart after title, 4s gap between subsequent charts

        return () => clearTimeout(chartTimer);
      }
    }
  }, [currentPhase, showMainTitle, currentChartIndex]);

  const handleNavigateToPrediction = () => {
    navigate("/prediction");
  };

  const ProcessingBanner = () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-12 max-w-2xl w-full mx-4 shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <BarChart3 className="w-12 h-12 text-blue-600 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 transition-all duration-500 ease-in-out transform">
            {PROCESSING_HEADINGS[processingIndex]}
          </h3>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  const MainChart = ({
    name,
    data,
    color,
    change,
    unit = "$",
  }: MarketSector) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
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
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_CONFIG.gridColor}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke={CHART_CONFIG.textColor}
              fontSize={12}
            />
            <YAxis
              stroke={CHART_CONFIG.textColor}
              fontSize={12}
              tickFormatter={(value) => formatPrice(value, unit)}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={CHART_CONFIG.strokeWidth}
              dot={{ fill: color, strokeWidth: 2, r: 2 }}
              activeDot={{
                r: CHART_CONFIG.activeDotRadius,
                stroke: color,
                strokeWidth: 2,
              }}
              animationDuration={CHART_CONFIG.animationDuration}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const showSectionTitle = currentPhase === "charts" && showMainTitle;
  const showButton = visibleCharts.length === MAIN_IMPACTED_SECTORS.length;

  return (
    <div className="w-full h-full bg-gray-50 overflow-y-auto">
      <div className="w-4/5 mx-auto p-8">
        {/* Header - Always visible but with animation */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            currentPhase === "header"
              ? "opacity-100 transform translate-y-0"
              : "opacity-100"
          }`}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text">
            {SHOCK_EVENT_ANALYSIS.title}
          </h1>
          <p className="text-lg text-gray-600">
            {SHOCK_EVENT_ANALYSIS.subtitle}
          </p>
        </div>

        {/* Processing Banner */}
        {currentPhase === "processing" && <ProcessingBanner />}

        {/* Charts Section */}
        {currentPhase === "charts" && (
          <div className="space-y-8">
            {/* Section Title */}
            <div
              className={`transition-all duration-1000 ${
                showSectionTitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {UI_TEXT.MAIN_TITLE}
              </h2>
            </div>

            {/* Charts Grid - Keep original 3-column structure */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {MAIN_IMPACTED_SECTORS.map((sector, index) => (
                <div key={`sector-${index}`}>
                  {/* Chart - Show only if visible, no refreshing */}
                  <div
                    className={`transition-all duration-1000 transform ${
                      visibleCharts.includes(index)
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0"
                    }`}
                  >
                    {visibleCharts.includes(index) && (
                      <MainChart
                        name={sector.name}
                        data={sector.data}
                        color={sector.color}
                        change={sector.change}
                        unit={sector.unit}
                        isVisible={true}
                        delay={0}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            {showButton && (
              <div
                className={`flex justify-center pt-8 transition-all duration-1000 transform ${
                  showButton
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{ transitionDelay: "1000ms" }}
              >
                <button
                  onClick={handleNavigateToPrediction}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>{UI_TEXT.BUTTON_TEXT}</span>
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastPage;
