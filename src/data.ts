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

const VIX_DATA = [
  { date: "2025-03-13", price: 24.66 },
  { date: "2025-03-14", price: 21.77 },
  { date: "2025-03-17", price: 20.51 },
  { date: "2025-03-18", price: 21.70 },
  { date: "2025-03-19", price: 19.90 },
  { date: "2025-03-20", price: 19.80 },
  { date: "2025-03-21", price: 19.28 },
  { date: "2025-03-24", price: 17.48 },
  { date: "2025-03-25", price: 17.15 },
  { date: "2025-03-26", price: 18.33 },
  { date: "2025-03-27", price: 18.69 },
  { date: "2025-03-28", price: 21.65 },
  { date: "2025-03-31", price: 22.28 },
  { date: "2025-04-01", price: 21.77 },
  { date: "2025-04-02", price: 21.51 },
  { date: "2025-04-03", price: 30.02 },
  { date: "2025-04-04", price: 45.31 },
  { date: "2025-04-07", price: 46.98 },
  { date: "2025-04-08", price: 52.33 },
  { date: "2025-04-09", price: 33.62 },
  { date: "2025-04-10", price: 40.72 },
  { date: "2025-04-11", price: 37.56 },
];

const OIL_DATA = [
  { date: "2025-03-13", price: 66.82 },
  { date: "2025-03-14", price: 67.43 },
  { date: "2025-03-17", price: 67.84 },
  { date: "2025-03-18", price: 67.49 },
  { date: "2025-03-19", price: 67.40 },
  { date: "2025-03-20", price: 68.55 },
  { date: "2025-03-21", price: 68.52 },
  { date: "2025-03-24", price: 69.46 },
  { date: "2025-03-25", price: 69.48 },
  { date: "2025-03-26", price: 70.05 },
  { date: "2025-03-27", price: 70.30 },
  { date: "2025-03-28", price: 69.74 },
  { date: "2025-03-31", price: 71.87 },
  { date: "2025-04-01", price: 71.61 },
  { date: "2025-04-02", price: 72.12 },
  { date: "2025-04-03", price: 67.43 },
  { date: "2025-04-04", price: 62.42 },
  { date: "2025-04-07", price: 61.05 },
  { date: "2025-04-08", price: 60.04 },
  { date: "2025-04-09", price: 62.63 },
  { date: "2025-04-10", price: 60.57 },
  { date: "2025-04-11", price: 61.91 },
];

export const INFLATION_DATA: MarketDataPoint[] = [
  { date: "2025-03-13", price: 2.48 },
  { date: "2025-03-14", price: 2.48 },
  { date: "2025-03-17", price: 2.48 },
  { date: "2025-03-18", price: 2.46 },
  { date: "2025-03-19", price: 2.50 },
  { date: "2025-03-20", price: 2.51 },
  { date: "2025-03-21", price: 2.51 },
  { date: "2025-03-24", price: 2.54 },
  { date: "2025-03-25", price: 2.56 },
  { date: "2025-03-26", price: 2.56 },
  { date: "2025-03-27", price: 2.60 },
  { date: "2025-03-28", price: 2.58 },
  { date: "2025-03-31", price: 2.61 },
  { date: "2025-04-01", price: 2.54 },
  { date: "2025-04-02", price: 2.51 },
  { date: "2025-04-03", price: 2.50 },
  { date: "2025-04-04", price: 2.34 },
  { date: "2025-04-07", price: 2.31 },
  { date: "2025-04-08", price: 2.35 },
  { date: "2025-04-09", price: 2.45 },
  { date: "2025-04-10", price: 2.32 },
  { date: "2025-04-11", price: 2.33 },
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
    change: "+52%",
    unit: "",
    yAxisLabel:"Index",
  },
  {
    name: "WTI Crude Oil",
    data: OIL_DATA,
    color: "#702cde",
    change: "-7.3%",
    unit: "$",
    yAxisLabel:"USD / bbl",
  },
  {
    name: "5-year breakeven inflation rate",
    data: INFLATION_DATA,
    color: "#702cde",
    change: "-6%",
    unit: "",
    yAxisLabel:"%",
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
