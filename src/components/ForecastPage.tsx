import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, BarChart3, Cpu } from "lucide-react";
import React, { useState, useEffect, useMemo, memo } from "react";
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

  /* ─────────── phased UI state ─────────── */

  const [currentPhase, setCurrentPhase] = useState<
    "header" | "processing" | "charts" | "engine-loader"
  >("header");
  const [processingIndex, setProcessingIndex] = useState(0);

  const [showMainTitle, setShowMainTitle] = useState(false);
  const [showChart1, setShowChart1] = useState(false);
  const [showChart2, setShowChart2] = useState(false);
  const [showChart3, setShowChart3] = useState(false);
  const [chartsVisible, setChartsVisible] = useState(true);

  /* which charts are currently visible? */
  const visibleCharts = useMemo(() => {
    const arr: number[] = [];
    if (showChart1) arr.push(0);
    if (showChart2) arr.push(1);
    if (showChart3) arr.push(2);
    return arr;
  }, [showChart1, showChart2, showChart3]);

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

    const t1 = setTimeout(() => setShowChart1(true), 1000);
    const t2 = setTimeout(() => setShowChart2(true), 5000);
    const t3 = setTimeout(() => setShowChart3(true), 9000);

    // Transition to engine loader after all charts are shown
    const engineTransition = setTimeout(() => {
      setChartsVisible(false);
      setTimeout(() => setCurrentPhase("engine-loader"), 800);
    }, 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(engineTransition);
    };
  }, [currentPhase]);

  /* ─────────── keyboard event handler ─────────── */

  useEffect(() => {
    if (currentPhase !== "engine-loader") return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        navigate("/prediction");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPhase, navigate]);

  /* ─────────── helpers ─────────── */

  /* ─────────── sub-components ─────────── */

  const ProcessingBanner = () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-12 max-w-2xl w-full mx-4 shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <BarChart3 className="w-12 h-12 text-blue-600 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {PROCESSING_HEADINGS[processingIndex]}
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

  const EngineLoader = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
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
          Passing Data to 4-Xtra Engine
        </h3>

        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-blue-600 animate-pulse rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa, #2563eb)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
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

  const MainChart = memo(
    ({ name, data, color, change, unit = "$" }: MarketSector) => {
      /* one-time animation flag */
      const [animate, setAnimate] = useState(true);
      useEffect(() => setAnimate(false), []);

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
                  isAnimationActive={animate}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
  );

  /* ─────────── render ─────────── */

  return (
    <div className="w-full h-full bg-gray-50 overflow-y-auto">
      {currentPhase === "engine-loader" ? (
        <EngineLoader />
      ) : (
        <div className="w-4/5 mx-auto p-8">
          {currentPhase === "processing" && <ProcessingBanner />}

          {currentPhase === "charts" && (
            <div
              className={`space-y-8 transition-all duration-800 transform ${
                chartsVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* section title */}
              <h2
                className={`text-2xl font-bold text-gray-900 mb-6 text-center transition-all duration-1000 ${
                  showMainTitle
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {UI_TEXT.MAIN_TITLE}
              </h2>

              {/* charts grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {MAIN_IMPACTED_SECTORS.map((sector, i) => (
                  <div key={sector.name}>
                    <div
                      className={`min-h-[16rem] transition-all duration-1000 transform ${
                        visibleCharts.includes(i)
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0"
                      }`}
                    >
                      {visibleCharts.includes(i) && <MainChart {...sector} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForecastPage;
