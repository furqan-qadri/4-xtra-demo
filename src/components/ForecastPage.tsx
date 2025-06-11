import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MAIN_IMPACTED_SECTORS,
  SHOCK_EVENT_ANALYSIS,
  CHART_CONFIG,
  UI_TEXT,
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

  const handleNavigateToPrediction = () => {
    navigate("/prediction");
  };

  const MainChart = ({
    name,
    data,
    color,
    change,
    unit = "$",
  }: MarketSector) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center mt-1">
            {isPositiveChange(change) ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${getChangeColor(change)}`}>
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

  const SmallChart = ({ name, data, color, change }: MarketSector) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
        <span className={`text-xs font-medium ${getChangeColor(change)}`}>
          {change}
        </span>
      </div>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              dot={false}
              animationDuration={CHART_CONFIG.animationDuration}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-gray-50 overflow-y-auto">
      <div className="w-4/5 mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {SHOCK_EVENT_ANALYSIS.title}
          </h1>
          <p className="text-lg text-gray-600">
            {SHOCK_EVENT_ANALYSIS.subtitle}
          </p>
        </div>

        {/* Top 3 Industries */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {UI_TEXT.MAIN_TITLE}
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {MAIN_IMPACTED_SECTORS.map((sector, index) => (
              <MainChart
                key={`main-sector-${index}`}
                name={sector.name}
                data={sector.data}
                color={sector.color}
                change={sector.change}
                unit={sector.unit}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleNavigateToPrediction}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-3 transition-colors duration-200 shadow-lg"
          >
            <span>{UI_TEXT.BUTTON_TEXT}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForecastPage;
