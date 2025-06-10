import AppearingChart from "./AppearingChart";

interface PredictionPageProps {
  shockEvent: string;
  onBack: () => void;
}

function PredictionPage({ shockEvent, onBack }: PredictionPageProps) {
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
        <AppearingChart />
        <AppearingChart />
        <AppearingChart />
        <AppearingChart />
        <AppearingChart />
        <AppearingChart />
      </div>
    </div>
  );
}

export default PredictionPage;
