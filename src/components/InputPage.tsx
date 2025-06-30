import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ShockEventContext } from "../App";

const InputPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);
  const navigate = useNavigate();
  const { setShockEvent } = useContext(ShockEventContext);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setShockEvent(inputValue);
      navigate("/forecast");
    }
  };

  const startTypingEffect = () => {
    console.log("Starting typing effect...");
    if (isTyping) return;

    setStopAnimations(true);
    setIsTyping(true);
    setInputValue("");

    const targetText = "US trade tariffs intensify in the next month";
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setInputValue(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        console.log("Typing effect complete");
      }
    }, 60);

    // Store interval reference to clear it if needed
    return typeInterval;
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isTyping) {
        // Skip typing animation and go to forecast
        console.log("Skipping typing, going to next screen");
        const completeText = "US trade tariffs intensify in the next month";
        setInputValue(completeText);
        setShockEvent(completeText);
        setIsTyping(false);
        navigate("/forecast");
      } else if (inputValue.trim()) {
        // Submit existing input
        console.log("Going to next screen with:", inputValue);
        handleSubmit();
      } else {
        // Start typing effect if no input
        console.log("Starting typing effect from Enter key");
        startTypingEffect();
      }
    }
  };

  // Global keydown handler for Enter key
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (isTyping) {
          // Skip typing animation and go to forecast
          console.log("Skipping typing, going to next screen");
          const completeText = "US trade tariffs intensify in the next month";
          setInputValue(completeText);
          setShockEvent(completeText);
          setIsTyping(false);
          navigate("/forecast");
        } else if (inputValue.trim()) {
          // Submit existing input
          console.log("Going to next screen with:", inputValue);
          handleSubmit();
        } else {
          // Start typing effect if no input
          console.log("Starting typing effect from global Enter key");
          startTypingEffect();
        }
      }
    };

    // Add event listener to the document
    document.addEventListener("keydown", handleGlobalKeyDown);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [inputValue, isTyping, navigate, setShockEvent]); // Dependencies for the effect

  // Flashing scenarios with different positions and timings
  const flashingScenarios = [
    {
      text: "Cascading cyber-attacks cripple global payments infrastructure",
      position: "top-20 left-16",
      delay: 0,
    },
    {
      text: "Oil prices surge to $200/barrel",
      position: "top-32 right-24",
      delay: 1500,
    },
    {
      text: "Fed cuts rates to zero",
      position: "bottom-40 left-12",
      delay: 3000,
    },
    {
      text: "China invades Taiwan",
      position: "bottom-24 right-16",
      delay: 4500,
    },
    {
      text: "Major cyberattack on banking",
      position: "top-48 left-1/3",
      delay: 6000,
    },
    {
      text: "Nuclear plant meltdown in Europe",
      position: "bottom-60 right-1/3",
      delay: 7500,
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
      if (stopAnimations) {
        setIsVisible(false);
        return;
      }

      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 2000);
      }, delay);

      const interval = setInterval(() => {
        if (stopAnimations) {
          setIsVisible(false);
          return;
        }
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 2000);
      }, 8000 + delay);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }, [delay, stopAnimations]);

    return (
      <div
        className={`absolute ${position} transition-all duration-1000 ease-in-out ${
          isVisible && !stopAnimations
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        } pointer-events-none`}
      >
        <span className="text-3xl text-gray-800 font-bold drop-shadow-sm">
          {text}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Flashing scenarios */}
      {flashingScenarios.map((scenario, index) => (
        <FlashingScenario
          key={index}
          text={scenario.text}
          position={scenario.position}
          delay={scenario.delay}
        />
      ))}

      <main className="w-full h-full flex items-center justify-center p-8">
        <div className="text-center space-y-8 w-full max-w-6xl">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="relative">
              <h2 className="text-5xl font-bold  bg-clip-text drop-shadow-sm">
                What If ...
              </h2>
              {/* Subtle glow effect behind text */}
              {/* <div className="absolute inset-0 text-6xl font-bold text-blue-500/10 blur-sm">
                What If ...
              </div> */}
            </div>
          </div>

          {/* Input Section */}
          <div className="max-w-2xl mx-auto">
            {/* Enhanced container with backdrop and glow effect */}
            {/* <div className="relative rounded-2xl bg-white/80 backdrop-blur-xs shadow-2xl border border-white/20"> */}
              {/* Remove the specific gradient overlay to match other screens */}
              {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-30"></div> */}
              
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => !isTyping && setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="e.g., US trade tariffs intensify in the next month"
                    className={`w-full px-6 bg-white py-5 pr-16 text-lg border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/50 transition-all duration-300 shadow-lg hover:shadow-xl ${
                      isTyping ? "cursor-default" : ""
                    } font-medium placeholder-gray-500`}
                    readOnly={isTyping}
                  />
                  <button
                    onClick={() => {
                      if (isTyping) {
                        // Skip typing animation and go to forecast
                        const completeText =
                          "US trade tariffs intensify in the next month";
                        setInputValue(completeText);
                        setShockEvent(completeText);
                        setIsTyping(false);
                        navigate("/forecast");
                      } else if (inputValue.trim()) {
                        // Submit existing input
                        handleSubmit();
                      } else {
                        // Start typing effect if no input
                        startTypingEffect();
                      }
                    }}
                    disabled={false}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full p-3 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            {/* </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InputPage;
