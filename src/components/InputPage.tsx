import React, { useState, useEffect } from "react";
import { ArrowRight, TrendingUp, BarChart3, Globe, Zap } from "lucide-react";
import AppearingChart from "./PredictionPage/AppearingChart";

interface InputPageProps {
  onSubmit: (inputValue: string) => void;
}

const InputPage: React.FC<InputPageProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setIsLoading(true);
      // After 5 seconds, navigate to forecast page
      setTimeout(() => {
        onSubmit(inputValue);
      }, 5000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Handle keyboard press during loading to skip to forecast
  useEffect(() => {
    const handleKeyPress = () => {
      if (isLoading && inputValue.trim()) {
        onSubmit(inputValue);
      }
    };

    if (isLoading) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [isLoading, inputValue, onSubmit]);

  const LoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] space-y-12 w-full max-w-4xl mx-auto pt-16">
      {/* Add instruction text */}
      {/* <div className="text-center mb-4">
        <p className="text-gray-600">
          Press any key to continue or wait 5 seconds...
        </p>
      </div> */}

      {/* Animated pulse circles */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-blue-200 animate-pulse"></div>
        <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 w-16 h-16 rounded-full border-2 border-blue-300 border-b-transparent animate-spin animate-reverse"></div>
      </div>

      {/* Floating icons animation */}
      <div className="relative w-96 h-48">
        <div className="absolute top-0 left-0 animate-bounce delay-0">
          <TrendingUp className="w-8 h-8 text-blue-500" />
        </div>
        <div className="absolute top-4 right-8 animate-bounce delay-150">
          <BarChart3 className="w-8 h-8 text-green-500" />
        </div>
        <div className="absolute bottom-8 left-16 animate-bounce delay-300">
          <Globe className="w-8 h-8 text-purple-500" />
        </div>
        <div className="absolute bottom-0 right-0 animate-bounce delay-450">
          <Zap className="w-8 h-8 text-orange-500" />
        </div>
      </div>

      {/* Loading text with typing effect */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">
          Analyzing Impact Scenarios
        </h3>
        <div className="flex items-center justify-center space-x-1">
          <span className="text-gray-600">Identifying affected industries</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      {/* <div className="w-96 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-base text-gray-600">Processing event</span>
          <span className="text-base font-medium text-blue-600">100%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full animate-pulse"
            style={{ width: "100%" }}
          ></div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-base text-gray-600">Mapping sectors</span>
          <span className="text-base font-medium text-green-600">75%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full animate-pulse"
            style={{ width: "75%" }}
          ></div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-base text-gray-600">Generating forecasts</span>
          <span className="text-base font-medium text-orange-600">45%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-orange-600 h-3 rounded-full animate-pulse"
            style={{ width: "45%" }}
          ></div>
        </div>
      </div> */}
    </div>
  );

  return (
    <div className="w-full h-full bg-white pt-12">
      <main className="w-full h-full p-0 m-0">
        <div className="w-full h-full flex items-center justify-center">
          {!isLoading ? (
            <div className="text-center space-y-8 w-full max-w-6xl px-8">
              {/* Hero Section */}
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Forecast Economic Impact
                </h2>
                <p className="text-xl text-gray-600 mx-auto">
                  Enter a shock event scenario to predict its impact on global
                  macroeconomic sectors
                </p>
              </div>

              {/* Input Section */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g., Trump slaps a 100% tariff on China"
                      className="w-full px-6 py-4 pr-16 text-lg border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={!inputValue.trim()}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full p-3 transition-colors duration-200 disabled:cursor-not-allowed"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Example Scenarios */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Example Scenarios
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  <button
                    onClick={() =>
                      setInputValue(
                        "Russia-Ukraine conflict escalating to nuclear confrontation"
                      )
                    }
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <span className="text-gray-700">
                      Russia-Ukraine conflict escalating to nuclear
                      confrontation
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      setInputValue(
                        "Major cyber attack on global financial systems"
                      )
                    }
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <span className="text-gray-700">
                      Major cyber attack on global financial systems
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      setInputValue(
                        "Fed raises interest rates by 200 basis points"
                      )
                    }
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <span className="text-gray-700">
                      Fed raises interest rates by 200 basis points
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      setInputValue(
                        "China implements complete trade embargo on Taiwan"
                      )
                    }
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <span className="text-gray-700">
                      China implements complete trade embargo on Taiwan
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <LoadingAnimation />
          )}
        </div>
      </main>
    </div>
  );
};

export default InputPage;
