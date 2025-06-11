// data.ts
// data.ts
import type {
  MarketDataPoint,
  MarketSector,
  ShockEventAnalysis,
  ChartConfig,
} from "./types";

export const SHOCK_EVENT_ANALYSIS: ShockEventAnalysis = {
  title: "Impact Analysis: Trump tariffs introduced on several countries",
  subtitle: "Some markets facing more than 100% tariffs",
  shockDate: "2025-06-16",
  description:
    "Analysis of market reactions to comprehensive tariff implementation",
};

export const SP_500_DATA: MarketDataPoint[] = [
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

export const VIX_DATA: MarketDataPoint[] = [
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

export const OIL_DATA: MarketDataPoint[] = [
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

export const GOLD_DATA: MarketDataPoint[] = [
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

export const DXY_DATA: MarketDataPoint[] = [
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

export const YIELD_DATA: MarketDataPoint[] = [
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

export const DEFENSE_STOCKS_DATA: MarketDataPoint[] = [
  { date: "2025-06-10", price: 145 },
  { date: "2025-06-15", price: 152 },
  { date: "2025-06-16", price: 198 }, // +30% spike
  { date: "2025-06-25", price: 185 },
  { date: "2025-07-05", price: 175 },
  { date: "2025-07-09", price: 172 },
];

export const ENERGY_STOCKS_DATA: MarketDataPoint[] = [
  { date: "2025-06-10", price: 85 },
  { date: "2025-06-15", price: 89 },
  { date: "2025-06-16", price: 142 }, // +60% spike
  { date: "2025-06-25", price: 125 },
  { date: "2025-07-05", price: 115 },
  { date: "2025-07-09", price: 108 },
];

export const AIRLINE_STOCKS_DATA: MarketDataPoint[] = [
  { date: "2025-06-10", price: 52 },
  { date: "2025-06-15", price: 49 },
  { date: "2025-06-16", price: 28 }, // -43% crash
  { date: "2025-06-25", price: 32 },
  { date: "2025-07-05", price: 38 },
  { date: "2025-07-09", price: 41 },
];

export const TECH_STOCKS_DATA: MarketDataPoint[] = [
  { date: "2025-06-10", price: 180 },
  { date: "2025-06-15", price: 175 },
  { date: "2025-06-16", price: 125 }, // -29% crash
  { date: "2025-06-25", price: 135 },
  { date: "2025-07-05", price: 148 },
  { date: "2025-07-09", price: 155 },
];

// Main impacted sectors (shown as large charts)
export const MAIN_IMPACTED_SECTORS: MarketSector[] = [
  {
    name: "Volatility Index (VIX)",
    data: VIX_DATA,
    color: "#702cde",
    change: "+168%",
    unit: "",
  },
  {
    name: "WTI Crude Oil",
    data: OIL_DATA,
    color: "#702cde",
    change: "+67%",
    unit: "$",
  },
  {
    name: "Gold",
    data: GOLD_DATA,
    color: "#702cde",
    change: "+22%",
    unit: "$",
  },
];

// Other industries (shown as smaller charts)
export const OTHER_INDUSTRIES: MarketSector[] = [
  {
    name: "USD Index (DXY)",
    data: DXY_DATA.filter((_, i) => i % 2 === 0),
    color: "#8B5CF6",
    change: "+5.0%",
  },
  {
    name: "10Y Treasury Yield",
    data: YIELD_DATA.filter((_, i) => i % 2 === 0),
    color: "#06B6D4",
    change: "-38.9%",
  },
  {
    name: "Defense Stocks",
    data: DEFENSE_STOCKS_DATA,
    color: "#6366F1",
    change: "+30%",
  },
  {
    name: "Energy Stocks",
    data: ENERGY_STOCKS_DATA,
    color: "#10B981",
    change: "+60%",
  },
  {
    name: "Airline Stocks",
    data: AIRLINE_STOCKS_DATA,
    color: "#EF4444",
    change: "-43%",
  },
  {
    name: "Tech Stocks",
    data: TECH_STOCKS_DATA,
    color: "#F59E0B",
    change: "-29%",
  },
];

export const CHART_CONFIG: ChartConfig = {
  animationDuration: 5000,
  strokeWidth: 3,
  activeDotRadius: 6,
  gridColor: "#f0f0f0",
  textColor: "#9CA3AF",
};

export const PROCESSING_HEADINGS = [
  "Analyzing...",
  "Exploring Knowledge Base...",
  "Pulling relevant data sources...",
  "Mapping Macroeconomic factors...",
  "Introducing shocks...",
  "Validating & Testing...",
  "Finalizing...",
];

export const PREDICTION_HEADINGS = [
  "Introducing Macroeconomic Shocks to Financial Markets",
  "Preparing to generate synthetic trajectories",
];

export const UI_TEXT = {
  MAIN_TITLE: "Identified and Shocked Macroeconomic Drivers",
  BUTTON_TEXT: "Send to 4-xtra Engine",
} as const;
