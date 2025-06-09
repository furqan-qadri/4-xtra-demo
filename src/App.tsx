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
import ForecastPage from "./ForecastPage";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
                <div className="text-2xl font-bold text-gray-900 ml-2 lg:ml-0">
                  4-xtra
                </div>
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
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            {/* Sidebar Header */}
            {/* <div className="px-6 py-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Navigation
              </h2>
            </div> */}

            {/* Sidebar Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-700 bg-blue-50 border-r-2 border-blue-500 rounded-l-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <Home className="w-5 h-5 mr-3" />
                <span className="font-medium">Dashboard</span>
              </a>

              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <TrendingUp className="w-5 h-5 mr-3" />
                <span>Forecasts</span>
              </a>

              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                <span>Analytics</span>
              </a>
            </nav>

            {/* Sidebar Footer */}
            <div className="px-4 py-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                <p className="font-medium">4-xtra MVP</p>
                <p>Economic Impact Forecasting</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Sidebar Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-0">
          <div className="min-h-screen bg-white">
            {/* Content Container */}
            <div className="max-w-full mx-auto">
              {/* This is where your InputPage component will go */}
              {/* <InputPage /> */}
              <ForecastPage />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
