import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MyWork from './components/MyWork';
import 'bootstrap/dist/css/bootstrap.min.css'; // Remove if not using Bootstrap

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen`}>
        <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/myWork" element={<MyWork />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
