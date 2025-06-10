import AppearingChart from "./AppearingChart";

interface PredictionPageProps {
  shockEvent: string;
  onBack: () => void;
}

function PredictionPage({ shockEvent }: PredictionPageProps) {
  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Extreme Scenarios
        </h1>
        <p className="text-lg text-gray-600">
          Event: {shockEvent || "Trump imposing 100% tariffs"}
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AppearingChart
          title="Crude Oil"
          subheading="Variation of Crude Oil"
          imageUrl="src/assets/crude.jpg"
        />
        <AppearingChart
          title="BTCUSD"
          subheading="Variation of BTC"
          imageUrl="src/assets/bitcoin.jpg"
        />
        <AppearingChart
          title="Gold"
          subheading="Variation of Gold"
          imageUrl="src/assets/Gold.jpg"
        />
        <AppearingChart
          title="NASDAQ 100"
          subheading="Variation of NASDAQ"
          imageUrl="src/assets/nasdaq.jpg"
        />
        <AppearingChart
          title="Silver"
          subheading="Variation of Silver"
          imageUrl="src/assets/silver.jpg"
        />
        <AppearingChart
          title="Dow Jones Industrial Average"
          subheading="Variation of Dow Jones"
          imageUrl="src/assets/dji.jpg"
        />
        <AppearingChart
          title="Russel 2000"
          subheading="Variation of Russel 2000"
          imageUrl="src/assets/russel2000.jpg"
        />

        <AppearingChart
          title="S&P 500 Index"
          subheading="Variation of S&P 500"
          imageUrl="src/assets/sandp.jpg"
        />
      </div>
    </div>
  );
}

export default PredictionPage;
