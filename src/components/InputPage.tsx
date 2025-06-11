import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ShockEventContext } from "../App";

const InputPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { setShockEvent } = useContext(ShockEventContext);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setShockEvent(inputValue);
      navigate("/forecast");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Flashing scenarios with different positions and timings
  const flashingScenarios = [
    {
      text: "Trump slaps 100% tariff on China",
      position: "top-20 left-16",
      delay: 0,
    },
    {
      text: "Oil prices surge to $200/barrel",
      position: "top-32 right-24",
      delay: 800,
    },
    {
      text: "Fed cuts rates to zero",
      position: "bottom-40 left-12",
      delay: 1600,
    },
    {
      text: "China invades Taiwan",
      position: "bottom-24 right-16",
      delay: 2400,
    },
    {
      text: "Major cyberattack on banking",
      position: "top-48 left-1/3",
      delay: 3200,
    },
    {
      text: "Nuclear plant meltdown in Europe",
      position: "bottom-60 right-1/3",
      delay: 4000,
    },
  ];

  const FlashingScenario = ({
    text,
    position,
    delay,
  }: {
    text: string;
    position: string;
    delay: number;
  }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 500);
      }, delay);

      // Repeat the flashing every 5 seconds
      const interval = setInterval(() => {
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 500);
      }, 5000 + delay);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }, [delay]);

    return (
      <div
        className={`absolute ${position} transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } pointer-events-none`}
      >
        <span className="text-3xl text-gray-700 font-bold">{text}</span>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-none pt-12 relative overflow-hidden">
      {/* Flashing scenarios */}
      {flashingScenarios.map((scenario, index) => (
        <FlashingScenario
          key={index}
          text={scenario.text}
          position={scenario.position}
          delay={scenario.delay}
        />
      ))}

      <main className="w-full h-full p-0 m-0">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-8 w-full max-w-6xl px-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">WHAT IF ...</h2>
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
                    Russia-Ukraine conflict escalating to nuclear confrontation
                  </span>
                </button>
                <button
                  onClick={() =>
                    setInputValue(
                      "Trump tariffs slapped on several countries at once"
                    )
                  }
                  className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <span className="text-gray-700">
                    Trump tariffs slapped on several countries at once
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
        </div>
      </main>
    </div>
  );
};

export default InputPage;
