import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MyWork from './components/MyWork';
import Certification from './components/Certification';
import NotFound from './components/NotFound';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <PortfolioProvider>
      {/* Radial Gradient Background - Light Mode */}
      {!darkMode && (
        <div className="fixed inset-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
          <div className="absolute bottom-auto right-auto left-0 bottom-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[#38bdf8] opacity-50 blur-[80px]"></div>
        </div>
      )}

      {/* Radial Gradient Background - Dark Mode */}
      {darkMode && (
        <div className="fixed inset-0 -z-10 h-full w-full bg-slate-950">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(59,130,246,0.2)] opacity-50 blur-[80px]"></div>
          <div className="absolute bottom-auto right-auto left-0 bottom-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(168,85,247,0.2)] opacity-50 blur-[80px]"></div>
        </div>
      )}

      {/* Main App */}
      <Router>
        <div className={`flex flex-col min-h-screen pt-16 transition-colors duration-300 ${
          darkMode 
            ? 'bg-slate-950 text-gray-100' 
            : 'bg-white text-gray-900'
        }`}>
          <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/myWork" element={<MyWork />} />
              <Route path="/certification" element={<Certification />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </PortfolioProvider>
  );
};

export default App;
