import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Cpu } from "lucide-react";
import React, { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MAIN_IMPACTED_SECTORS,
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

  /* ─────────── phased UI state ─────────── */

  const [currentPhase, setCurrentPhase] = useState<
    "header" | "processing" | "charts" | "engine-loader"
  >("header");
  const [processingIndex, setProcessingIndex] = useState(0);

  const [showMainTitle, setShowMainTitle] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [chartsVisible, setChartsVisible] = useState(true);

  /* ─────────── timers for the three phases ─────────── */

  useEffect(() => {
    const headerTimer = setTimeout(() => setCurrentPhase("processing"), 2000);
    return () => clearTimeout(headerTimer);
  }, []);

  useEffect(() => {
    if (currentPhase !== "processing") return;

    const timer = setInterval(() => {
      setProcessingIndex((i) => {
        if (i >= PROCESSING_HEADINGS.length - 1) {
          setCurrentPhase("charts");
          return i;
        }
        return i + 1;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [currentPhase]);

  useEffect(() => {
    if (currentPhase !== "charts") return;

    setShowMainTitle(true);

    // Show all charts simultaneously after title
    const chartsTimer = setTimeout(() => setShowCharts(true), 1000);

    return () => {
      clearTimeout(chartsTimer);
    };
  }, [currentPhase]);

  /* ─────────── keyboard event handler ─────────── */

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (currentPhase === "charts" && event.key === "Enter") {
        setChartsVisible(false);
        setTimeout(() => setCurrentPhase("engine-loader"), 800);
      } else if (
        currentPhase === "engine-loader" &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        navigate("/prediction");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPhase, navigate]);

  /* ─────────── unified loading component ─────────── */

  const LoadingComponent = ({
    title,
  }: {
    title: string;
    showProgressBar?: boolean;
  }) => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white border border-gray-200 rounded-2xl p-16 max-w-3xl w-full mx-4 shadow-xl">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <Cpu
              className="w-16 h-16 text-blue-600 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full animate-pulse" />
          </div>
        </div>

        <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {title}
        </h3>
      </div>

      {/* Add shimmer keyframes via style tag */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );

  const ProcessingBanner = () => (
    <LoadingComponent title={PROCESSING_HEADINGS[processingIndex]} />
  );

  const EngineLoader = () => (
    <LoadingComponent
      title="Passing Data to 4-Xtra Engine"
      showProgressBar={true}
    />
  );

  // Helper function to get Y-axis domain based on sector name
  const getYAxisDomain = (sectorName: string, data: any[]) => {
    // Check for oil or gold related keywords in the sector name
    const isOilOrGold =
      sectorName.toLowerCase().includes("oil") ||
      sectorName.toLowerCase().includes("crude") ||
      sectorName.toLowerCase().includes("gold");

    if (isOilOrGold) {
      const prices = data.map((d) => d.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const padding = (max - min) * 0.1; // 10% padding
      const domainMin = min - padding;
      const domainMax = max + padding;
      return [domainMin, domainMax];
    }
    return [0, "auto"]; // Default behavior for other sectors
  };

  const MainChart = memo(
    ({ name, data, color, change, unit = "$" }: MarketSector) => {
      const yAxisDomain = getYAxisDomain(name, data);

      return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* header */}
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

          {/* chart */}
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
                  domain={yAxisDomain}
                  stroke={CHART_CONFIG.textColor}
                  fontSize={12}
                  tickFormatter={(v) => formatPrice(v, unit)}
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
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
  );

  /* ─────────── render ─────────── */

  if (currentPhase === "engine-loader") {
    return <EngineLoader />;
  }

  if (currentPhase === "processing") {
    return <ProcessingBanner />;
  }

  if (currentPhase === "charts") {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div
          className={`max-w-7xl w-full space-y-8 transition-all duration-800 transform ${
            chartsVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* section title */}
          <h1
            className={`text-2xl font-bold text-gray-900 text-center transition-all duration-1000 ${
              showMainTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {UI_TEXT.MAIN_TITLE}
          </h1>

          {/* charts grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {MAIN_IMPACTED_SECTORS.map((sector, i) => (
              <div
                key={sector.name}
                className={`transition-all duration-1000 transform ${
                  showCharts
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <MainChart {...sector} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ForecastPage;
