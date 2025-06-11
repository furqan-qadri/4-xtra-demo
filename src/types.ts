// types.ts
export interface MarketDataPoint {
  date: string;
  price: number;
}

export interface MarketSector {
  name: string;
  data: MarketDataPoint[];
  color: string;
  change: string;
  unit?: string;
}

export interface ShockEventAnalysis {
  title: string;
  subtitle: string;
  shockDate: string;
  description: string;
}

export interface ChartConfig {
  animationDuration: number;
  strokeWidth: number;
  activeDotRadius: number;
  gridColor: string;
  textColor: string;
}
