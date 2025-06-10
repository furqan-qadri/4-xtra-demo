import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface RealDataPoint {
  date: string;
  real: number;
  shockEvent: number | null;
}

interface SyntheticDataPoint {
  date: string;
  scenario: number;
  price: number;
}

interface ChartDataPoint {
  date: string;
  real?: number;
  shockEvent?: number | null;
  [key: string]: any; // For synthetic_${number} properties
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
  }>;
  label?: string;
}

const PredictionChart: React.FC = () => {
  // Generate realistic Bitcoin price data before shock event
  const generateRealData = (): RealDataPoint[] => {
    const data: RealDataPoint[] = [];
    let price = 98000;

    for (let i = 0; i < 50; i++) {
      const date = new Date(2025, 0, i + 1);
      const dateStr = date.toISOString().split("T")[0];

      // Add some realistic volatility with general downward trend
      const volatility = (Math.random() - 0.5) * 8000;
      const trend = -200 + (Math.random() - 0.5) * 400;
      price = Math.max(price + trend + volatility, 75000);

      data.push({
        date: dateStr,
        real: Math.round(price),
        shockEvent: i === 30 ? price : null,
      });
    }

    return data;
  };

  // Generate synthetic prediction scenarios after shock
  const generateSyntheticData = (realData: RealDataPoint[]): SyntheticDataPoint[] => {
    const shockIndex = 30;
    const shockPrice = realData[shockIndex].real;
    const scenarios: SyntheticDataPoint[] = [];

    // Generate 80 different synthetic scenarios with directional bias
    for (let scenario = 0; scenario < 80; scenario++) {
      let currentPrice = shockPrice; // All start from exact shock point

      // Create directional bias - most scenarios trend upward
      const biasStrength = Math.exp(-Math.pow((scenario - 20) / 25, 2)); // Normal distribution centered around scenario 20
      const mainTrend = 400 * biasStrength; // Strong upward bias for central scenarios
      const sideTrend =
        (scenario < 20 ? -200 : scenario > 60 ? -300 : 200) *
        (1 - biasStrength);

      for (let i = shockIndex + 1; i < 85; i++) {
        const date = new Date(2025, 0, i + 1);
        const dateStr = date.toISOString().split("T")[0];

        const timeFromShock = i - shockIndex;

        // Apply main directional trend
        const trendComponent =
          (mainTrend + sideTrend) * Math.log(1 + timeFromShock / 10);

        // Add volatility (less for central scenarios, more for outliers)
        const volatilityFactor = 1500 + Math.abs(scenario - 40) * 50;
        const randomWalk = (Math.random() - 0.5) * volatilityFactor;

        // Add some cyclical patterns
        const cyclical =
          Math.sin(timeFromShock / (4 + (scenario % 6))) *
          600 *
          (1 - biasStrength * 0.5);

        currentPrice = currentPrice + trendComponent + randomWalk + cyclical;
        currentPrice = Math.max(currentPrice, 60000);
        currentPrice = Math.min(currentPrice, 150000);

        scenarios.push({
          date: dateStr,
          scenario: scenario,
          price: Math.round(currentPrice),
        });
      }
    }

    return scenarios;
  };

  const realData = generateRealData();
  const syntheticData = generateSyntheticData(realData);

  // Combine data for chart
  const chartData: ChartDataPoint[] = [];

  // Add real data points
  realData.forEach((point) => {
    chartData.push({
      date: point.date,
      real: point.real,
      shockEvent: point.shockEvent,
    });
  });

  // Add synthetic scenarios - make sure they start exactly at shock point
  const syntheticByDate: { [key: string]: { [key: string]: number } } = {};
  const shockDate = realData[30].date;
  const shockPrice = realData[30].real;

  syntheticData.forEach((point) => {
    if (!syntheticByDate[point.date]) {
      syntheticByDate[point.date] = {};
    }
    syntheticByDate[point.date][`synthetic_${point.scenario}`] = point.price;
  });

  // Ensure all synthetic lines start at the exact shock point
  if (!syntheticByDate[shockDate]) {
    syntheticByDate[shockDate] = {};
  }
  for (let i = 0; i < 80; i++) {
    syntheticByDate[shockDate][`synthetic_${i}`] = shockPrice;
  }

  Object.keys(syntheticByDate).forEach((date) => {
    const existingPoint = chartData.find((p) => p.date === date);
    if (existingPoint) {
      Object.assign(existingPoint, syntheticByDate[date]);
    } else {
      chartData.push({
        date,
        ...syntheticByDate[date],
      });
    }
  });

  // Sort by date
  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const realValue = payload.find((p) => p.dataKey === "real")?.value;
      const syntheticValues = payload.filter((p) =>
        p.dataKey.startsWith("synthetic_")
      );

      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{label ? formatDate(label) : ''}</p>
          {realValue && (
            <p className="text-red-600">Real: ${realValue.toLocaleString()}</p>
          )}
          {syntheticValues.length > 0 && (
            <p className="text-blue-600">
              Synthetic: ${syntheticValues[0].value.toLocaleString()}
              {syntheticValues.length > 1 &&
                ` (+${syntheticValues.length - 1} scenarios)`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96 bg-white p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-center mb-2">BTCUSD</h2>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            angle={-45}
            textAnchor="end"
            height={60}
            fontSize={10}
            interval={4}
          />
          <YAxis
            domain={["dataMin - 5000", "dataMax + 5000"]}
            tickFormatter={(value: number) => (value / 1000).toFixed(0) + "K"}
            fontSize={10}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* Shock event reference line */}
          <ReferenceLine
            x="2025-01-31"
            stroke="#666"
            strokeDasharray="5 5"
            label={{ value: "Shock event - Trump tariffs", position: "top" }}
          />

          {/* Real data line with shock point dot */}
          <Line
            type="monotone"
            dataKey="real"
            stroke="#dc2626"
            strokeWidth={2.5}
            dot={(props: any) => {
              // Only show dot at shock event point
              if (props.payload && props.payload.shockEvent) {
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill="#dc2626"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                );
              }
              return null;
            }}
            connectNulls={false}
          />

          {/* Synthetic scenario lines with directional bias and density-based opacity */}
          {Array.from({ length: 80 }, (_, i) => {
            // Calculate opacity based on distance from central trend (scenario 20-40 are densest)
            const distanceFromCenter = Math.abs(i - 30);
            const density = Math.exp(-distanceFromCenter / 15); // Exponential decay
            const opacity = 0.08 + density * 0.3; // Higher opacity for central scenarios

            return (
              <Line
                key={`synthetic_${i}`}
                type="monotone"
                dataKey={`synthetic_${i}`}
                stroke={`rgba(59, 130, 246, ${opacity})`}
                strokeWidth={0.7}
                dot={false}
                connectNulls={false}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;