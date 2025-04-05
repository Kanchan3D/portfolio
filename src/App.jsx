import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MyWork from './components/MyWork';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
  {/* Radial Gradient Background */}
  <div className="fixed inset-0 -z-10 h-full w-full bg-white">
  <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
  <div className="absolute bottom-auto right-auto left-0 bottom-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[#38bdf8] opacity-50 blur-[80px]"></div>
</div>



  {/* Main App */}
  <Router>
    <div className={`flex flex-col min-h-screen pt-20 ${darkMode ? '' : ' text-gray-900'}`}>
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/myWork" element={<MyWork />} />
        </Routes>
      </div>
    </div>
  </Router>
  
</>

  );
};

export default App;
