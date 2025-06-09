import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  TrendingUp,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";
import InputPage from "./components/InputPage";
import ForecastPage from "./components/ForecastPage";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('input'); // Add page state
  const [shockEvent, setShockEvent] = useState(''); // Store the shock event

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubmitShockEvent = (eventText) => {
    setShockEvent(eventText);
    setCurrentPage('forecast');
  };

  const handleBackToInput = () => {
    setCurrentPage('input');
    setShockEvent('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Menu toggle and Logo */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                {sidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* Logo - centered on mobile, left-aligned on desktop */}
              <div className="flex-1 lg:flex-none flex justify-center lg:justify-start text-center">
                <button 
                  onClick={handleBackToInput}
                  className="text-2xl font-bold text-gray-900 ml-2 lg:ml-0 hover:text-blue-600 transition-colors"
                >
                  4-xtra
                </button>
              </div>
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Main Content Area */}
        <main className="flex-1 lg:ml-0">
          <div className="min-h-screen bg-white">
            {/* Content Container */}
            <div className="max-w-full mx-auto">
              {currentPage === 'input' ? (
                <InputPage onSubmit={handleSubmitShockEvent} />
              ) : (
                <ForecastPage shockEvent={shockEvent} onBack={handleBackToInput} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;