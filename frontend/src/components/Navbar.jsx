import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const MyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/myWork", label: "My Work" },
    { to: "/certification", label: "Certification" },
    { to: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-transparent py-4 fixed top-0 right-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Logo/Brand */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-gray-900 no-underline hover:text-blue-600 transition-colors"
            onClick={handleNavClick}
          >
            Kanchan
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2 lg:space-x-6">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className="relative text-sm lg:text-lg font-medium tracking-wider text-gray-900 no-underline transition-all duration-300 ease-in-out hover:scale-110 hover:font-bold group px-2 lg:px-3 py-2"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-gray-900 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden text-gray-900 text-2xl p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={item.to}
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg font-medium transition-all no-underline ${
                          isActive
                            ? "bg-blue-500 text-white"
                            : "text-gray-900 hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default MyNavbar;
