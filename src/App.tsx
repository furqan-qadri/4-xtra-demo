import React, { useState } from "react";
import InputPage from "./components/InputPage";
import ForecastPage from "./components/ForecastPage";
import PredictionPage from "./components/PredictionPage/PredictionPage";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("input"); // Add page state
  const [shockEvent, setShockEvent] = useState<string>(""); // Store the shock event

  const handleSubmitShockEvent = (eventText: string): void => {
    setShockEvent(eventText);
    setCurrentPage("forecast");
  };

  const handleBackToInput = (): void => {
    setCurrentPage("input");
    setShockEvent("");
  };

  const handleNavigateToPrediction = (): void => {
    setCurrentPage("prediction");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <button
              onClick={handleBackToInput}
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              4-Xtra Technologies
            </button>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Main Content Area */}
        <main className="flex-1 lg:ml-0">
          <div className="min-h-screen bg-white">
            {/* Content Container */}
            <div className="max-w-full mx-auto">
              {currentPage === "input" ? (
                <InputPage onSubmit={handleSubmitShockEvent} />
              ) : currentPage === "forecast" ? (
                <ForecastPage
                  shockEvent={shockEvent}
                  onBack={handleBackToInput}
                  onNavigateToPrediction={handleNavigateToPrediction}
                />
              ) : (
                <PredictionPage
                  shockEvent={shockEvent}
                  onBack={() => setCurrentPage("forecast")}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
