import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  // useLocation,
} from "react-router-dom";
import InputPage from "./components/InputPage";
import ForecastPage from "./components/ForecastPage";
import PredictionPage from "./components/PredictionPage/PredictionPage";

// Create a context to share shock event data
const ShockEventContext = React.createContext<{
  shockEvent: string;
  setShockEvent: (event: string) => void;
}>({
  shockEvent: "",
  setShockEvent: () => {},
});

// Navbar component that uses router hooks
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <button
            onClick={handleLogoClick}
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            4-Xtra Technologies
          </button>
        </div>
      </div>
    </nav>
  );
};

// Main content component that handles routing
const AppContent: React.FC = () => {
  const [shockEvent, setShockEvent] = useState<string>("");

  return (
    <ShockEventContext.Provider value={{ shockEvent, setShockEvent }}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex pt-16">
          <main className="flex-1 lg:ml-0">
            <div className="min-h-screen bg-white relative">
              {/* Background with opacity */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'url("/assets/input_background.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              {/* Your content with relative positioning */}
              <div className="max-w-full mx-auto relative z-10">
                <Routes>
                  <Route path="/" element={<InputPage />} />
                  <Route path="/forecast" element={<ForecastPage />} />
                  <Route path="/prediction" element={<PredictionPage />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ShockEventContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
export { ShockEventContext };
