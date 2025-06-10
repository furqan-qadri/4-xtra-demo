import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppearingChart from "./AppearingChart";
import { ShockEventContext } from "../../App";

const PredictionPage: React.FC = () => {
  const navigate = useNavigate();
  const { shockEvent } = useContext(ShockEventContext);

  const handleBack = () => {
    navigate("/forecast");
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-800 mr-4 flex items-center"
          >
            ← Back to Forecast
          </button>
        </div>
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
          imageUrl="/assets/crude.jpg"
        />
        <AppearingChart
          title="BTCUSD"
          subheading="Variation of BTC"
          imageUrl="/assets/bitcoin.jpg"
        />
        <AppearingChart
          title="Gold"
          subheading="Variation of Gold"
          imageUrl="/assets/Gold.jpg"
        />
        <AppearingChart
          title="NASDAQ 100"
          subheading="Variation of NASDAQ"
          imageUrl="/assets/nasdaq.jpg"
        />
        <AppearingChart
          title="Silver"
          subheading="Variation of Silver"
          imageUrl="/assets/silver.jpg"
        />
        <AppearingChart
          title="Dow Jones Industrial Average"
          subheading="Variation of Dow Jones"
          imageUrl="/assets/dji.jpg"
        />
        <AppearingChart
          title="Russel 2000"
          subheading="Variation of Russel 2000"
          imageUrl="/assets/russel2000.jpg"
        />
        <AppearingChart
          title="S&P 500 Index"
          subheading="Variation of S&P 500"
          imageUrl="/assets/sandp.jpg"
        />
      </div>
    </div>
  );
};

export default PredictionPage;
