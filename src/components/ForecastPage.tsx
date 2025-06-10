import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
const ForecastPage = ({
  // shockEvent,
  onBack,
  onNavigateToPrediction,
}: {
  shockEvent: string;
  onBack: () => void;
  onNavigateToPrediction: () => void;
}) => {
  // Real data from CSV showing actual shock event impacts
  const spData = [
    { date: "2025-06-10", price: 5930.36 },
    { date: "2025-06-11", price: 5857.98 },
    { date: "2025-06-12", price: 5757.52 },
    { date: "2025-06-13", price: 5688.75 },
    { date: "2025-06-14", price: 5601.86 },
    { date: "2025-06-15", price: 5516.56 },
    { date: "2025-06-16", price: 4413.25 }, // Shock day: -20% drop
    { date: "2025-06-17", price: 4388.31 },
    { date: "2025-06-18", price: 4376.37 },
    { date: "2025-06-19", price: 4362.84 },
    { date: "2025-06-20", price: 4351.2 },
    { date: "2025-06-25", price: 4387.92 },
    { date: "2025-07-01", price: 4412.85 },
    { date: "2025-07-05", price: 4400.46 },
    { date: "2025-07-09", price: 4455.85 },
  ];

  const vixData = [
    { date: "2025-06-10", price: 20.54 },
    { date: "2025-06-11", price: 22.41 },
    { date: "2025-06-12", price: 24.91 },
    { date: "2025-06-13", price: 27.84 },
    { date: "2025-06-14", price: 30.13 },
    { date: "2025-06-15", price: 33.63 },
    { date: "2025-06-16", price: 90.0 }, // Shock day: +168% spike
    { date: "2025-06-17", price: 82.3 },
    { date: "2025-06-18", price: 74.55 },
    { date: "2025-06-19", price: 68.42 },
    { date: "2025-06-20", price: 63.78 },
    { date: "2025-06-25", price: 45.89 },
    { date: "2025-07-01", price: 35.67 },
    { date: "2025-07-05", price: 30.26 },
    { date: "2025-07-09", price: 25.77 },
  ];

  const oilData = [
    { date: "2025-06-10", price: 65.55 },
    { date: "2025-06-11", price: 66.83 },
    { date: "2025-06-12", price: 68.33 },
    { date: "2025-06-13", price: 69.43 },
    { date: "2025-06-14", price: 70.73 },
    { date: "2025-06-15", price: 71.8 },
    { date: "2025-06-16", price: 120.0 }, // Shock day: +67% spike
    { date: "2025-06-17", price: 119.13 },
    { date: "2025-06-18", price: 115.93 },
    { date: "2025-06-19", price: 112.64 },
    { date: "2025-06-20", price: 109.87 },
    { date: "2025-06-25", price: 104.22 },
    { date: "2025-07-01", price: 101.58 },
    { date: "2025-07-05", price: 99.42 },
    { date: "2025-07-09", price: 96.57 },
  ];

  const goldData = [
    { date: "2025-06-10", price: 3366.27 },
    { date: "2025-06-11", price: 3402.77 },
    { date: "2025-06-12", price: 3428.23 },
    { date: "2025-06-13", price: 3470.47 },
    { date: "2025-06-14", price: 3509.06 },
    { date: "2025-06-15", price: 3554.96 },
    { date: "2025-06-16", price: 4330.0 }, // Shock day: +22% spike
    { date: "2025-06-17", price: 4358.97 },
    { date: "2025-06-18", price: 4396.99 },
    { date: "2025-06-19", price: 4412.84 },
    { date: "2025-06-20", price: 4426.73 },
    { date: "2025-06-25", price: 4398.65 },
    { date: "2025-07-01", price: 4389.23 },
    { date: "2025-07-05", price: 4386.4 },
    { date: "2025-07-09", price: 4331.58 },
  ];

  const dxyData = [
    { date: "2025-06-10", price: 99.4 },
    { date: "2025-06-11", price: 99.76 },
    { date: "2025-06-12", price: 100.13 },
    { date: "2025-06-13", price: 100.49 },
    { date: "2025-06-14", price: 100.86 },
    { date: "2025-06-15", price: 101.08 },
    { date: "2025-06-16", price: 106.13 }, // Shock day: +5% spike
    { date: "2025-06-17", price: 105.5 },
    { date: "2025-06-18", price: 104.92 },
    { date: "2025-06-20", price: 103.87 },
    { date: "2025-06-25", price: 102.89 },
    { date: "2025-07-01", price: 102.45 },
    { date: "2025-07-05", price: 102.32 },
    { date: "2025-07-09", price: 102.0 },
  ];

  const yieldData = [
    { date: "2025-06-10", price: 4.35 },
    { date: "2025-06-11", price: 4.3 },
    { date: "2025-06-12", price: 4.24 },
    { date: "2025-06-13", price: 4.19 },
    { date: "2025-06-14", price: 4.13 },
    { date: "2025-06-15", price: 4.09 },
    { date: "2025-06-16", price: 2.5 }, // Shock day: -39% drop
    { date: "2025-06-17", price: 2.53 },
    { date: "2025-06-18", price: 2.56 },
    { date: "2025-06-20", price: 2.64 },
    { date: "2025-06-25", price: 2.78 },
    { date: "2025-07-01", price: 2.91 },
    { date: "2025-07-05", price: 2.96 },
    { date: "2025-07-09", price: 3.03 },
  ];

  // Other industries with smaller charts - derived from main data
  const otherIndustries = [
    {
      name: "USD Index (DXY)",
      data: dxyData.filter((_, i) => i % 2 === 0),
      color: "#8B5CF6",
      change: "+5.0%",
    },
    {
      name: "10Y Treasury Yield",
      data: yieldData.filter((_, i) => i % 2 === 0),
      color: "#06B6D4",
      change: "-38.9%",
    },
    {
      name: "Defense Stocks",
      data: [
        { date: "2025-06-10", price: 145 },
        { date: "2025-06-15", price: 152 },
        { date: "2025-06-16", price: 198 }, // +30% spike
        { date: "2025-06-25", price: 185 },
        { date: "2025-07-05", price: 175 },
        { date: "2025-07-09", price: 172 },
      ],
      color: "#6366F1",
      change: "+30%",
    },
    {
      name: "Energy Stocks",
      data: [
        { date: "2025-06-10", price: 85 },
        { date: "2025-06-15", price: 89 },
        { date: "2025-06-16", price: 142 }, // +60% spike
        { date: "2025-06-25", price: 125 },
        { date: "2025-07-05", price: 115 },
        { date: "2025-07-09", price: 108 },
      ],
      color: "#10B981",
      change: "+60%",
    },
    {
      name: "Airline Stocks",
      data: [
        { date: "2025-06-10", price: 52 },
        { date: "2025-06-15", price: 49 },
        { date: "2025-06-16", price: 28 }, // -43% crash
        { date: "2025-06-25", price: 32 },
        { date: "2025-07-05", price: 38 },
        { date: "2025-07-09", price: 41 },
      ],
      color: "#EF4444",
      change: "-43%",
    },
    {
      name: "Tech Stocks",
      data: [
        { date: "2025-06-10", price: 180 },
        { date: "2025-06-15", price: 175 },
        { date: "2025-06-16", price: 125 }, // -29% crash
        { date: "2025-06-25", price: 135 },
        { date: "2025-07-05", price: 148 },
        { date: "2025-07-09", price: 155 },
      ],
      color: "#F59E0B",
      change: "-29%",
    },
  ];

  const formatDate = (dateStr: string | number | Date) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const MainChart = ({
    title,
    data,
    color,
    change,
    unit = "$",
  }: {
    title: string;
    data: Array<{ date: string; price: number }>;
    color: string;
    change: string;
    unit?: string;
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center mt-1">
            {change.startsWith("+") ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {unit}
            {data[data.length - 1]?.price}
          </div>
          <div className="text-sm text-gray-500">Current</div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => `${unit}${value}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 2 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              animationDuration={5000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const SmallChart = ({
    name,
    data,
    color,
    change,
  }: {
    name: string;
    data: Array<{ date: string; price: number }>;
    color: string;
    change: string;
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
        <span
          className={`text-xs font-medium ${
            change.startsWith("+") ? "text-green-600" : "text-red-600"
          }`}
        >
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
              animationDuration={5000} // Add this
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 mr-4 flex items-center"
            >
              ← Back to Input
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Impact Analysis: Trump tariffs introduced on several countries
          </h1>
          <p className="text-lg text-gray-600">
            {"Some markets facing more than 100% tariffs"}
          </p>
        </div>

        {/* Top 3 Industries */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Most Impacted Sectors
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <MainChart
              title="Volatility Index (VIX)"
              data={vixData}
              color="#EF4444"
              change="+168%"
              unit=""
            />
            <MainChart
              title="WTI Crude Oil"
              data={oilData}
              color="#F59E0B"
              change="+67%"
              unit="$"
            />
            <MainChart
              title="Gold Futures"
              data={goldData}
              color="#10B981"
              change="+22%"
              unit="$"
            />
          </div>
        </div>

        {/* Secondary Impact */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Secondary Market Impact
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <MainChart
              title="S&P 500 Index"
              data={spData}
              color="#7C3AED"
              change="-20%"
              unit=""
            />
            <MainChart
              title="10Y Treasury Yield"
              data={yieldData}
              color="#06B6D4"
              change="-39%"
              unit=""
            />
          </div>
        </div>

        {/* Other Affected Industries */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Sector-Specific Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherIndustries.map((industry, index) => (
              <SmallChart
                key={index}
                name={industry.name}
                data={industry.data}
                color={industry.color}
                change={industry.change}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={onNavigateToPrediction}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-3 transition-colors duration-200 shadow-lg"
          >
            <span>Send to 4-xtra Engine</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        {/* <div className="flex gap-1">
          <PredictionChart />
          <PredictionChart />
        </div> */}
      </div>
    </div>
  );
};

export default ForecastPage;
