import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import profileImage1 from "../assets/icons/pf2.png";
import profileImage2 from "../assets/icons/pft1.jpg";
import MyInfo from "./MyInfo";
import { FaExternalLinkAlt, FaPython, FaServer } from "react-icons/fa";
import { SiDjango } from "react-icons/si";
import api from "../services/api";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [cvUrl, setCvUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const djangoPortfolioUrl = import.meta.env.VITE_DJANGO_PORTFOLIO_URL;
  
  useEffect(() => {
    const fetchCV = async () => {
      try {
        const cvData = await api.getCV();
        setCvUrl(cvData.pdf_url);
      } catch (error) {
        console.error('Error fetching CV:', error);
        // Fallback to env variable if API fails
        setCvUrl(import.meta.env.VITE_CV_URL || 'https://drive.google.com/file/d/1yzdrXJG6MOCjmjz1-GzCCpPxSefCiVT3/view');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCV();
  }, []);

  return (
    <>
      {/* Django Portfolio Banner */}
      {showBanner && djangoPortfolioUrl && (
        <motion.div
          className="fixed top-20 left-0 right-0 z-40 mx-4 mt-4"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border-2 border-white/20">
              <div className="relative p-4 md:p-5">
                {/* Close Button */}
                <button
                  onClick={() => setShowBanner(false)}
                  className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
                  aria-label="Close banner"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Banner Content */}
                <div className="flex flex-col md:flex-row items-center gap-4 pr-8">
                  {/* Icon Section */}
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="bg-white/20 backdrop-blur-md rounded-full p-3"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <SiDjango className="text-3xl text-white" />
                    </motion.div>
                    <div className="hidden md:flex items-center gap-2">
                      <FaPython className="text-2xl text-white/90" />
                      <FaServer className="text-xl text-white/80" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-white font-bold text-lg md:text-xl mb-1 flex items-center justify-center md:justify-start gap-2">
                      <span className="animate-pulse">🚀</span>
                      Check Out My Django Portfolio!
                    </h3>
                    <p className="text-white/90 text-sm md:text-base">
                      Built with Django & MongoDB • Full Admin Panel • Dynamic Content Management
                    </p>
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href={djangoPortfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-green-600 px-6 py-3 rounded-full font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap no-underline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Visit Django Site
                    <FaExternalLinkAlt className="text-sm" />
                  </motion.a>
                </div>

                {/* Animated Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col pt-6 md:pt-20 mt-8 md:mt-20 px-4 sm:px-6 lg:px-0 lg:flex-row justify-center items-center min-h-screen gap-4 md:gap-8">
        {/* Left Section - Text Content */}
        <div className="w-full lg:w-2/3 flex flex-col justify-center text-center lg:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            Welcome
          </motion.h1>
          <motion.p
            className="text-2xl sm:text-3xl font-bold mt-4 text-[#0284c7]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}>
            Hi, I'm{" "}
            <span className="text-[#1d4ed8] hover:text-[#fda4af]">
              Kanchan Dasila
            </span>
          </motion.p>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#0c0a09] font-semibold hover:text-[#52525b] mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}>
            A creative and driven <span className="text-[#c084fc] hover:text-[#ec4899]">Full-Stack Web Developer</span>, currently pursuing
            B.Tech in CSE.&nbsp;
            <span className="text-[#34d399] hover:text-[#fda4af]">Always exploring, learning</span>, and pushing the
            boundaries of technology.
          </motion.p>
          <MyInfo />
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start mt-6 gap-3 sm:gap-5">
            {!loading && cvUrl && (
              <motion.a
                href={cvUrl}
                download
                className="w-full sm:w-auto px-6 py-3 text-[#1c1917] border-[#1c1917] border-2 rounded-lg text-base sm:text-lg lg:text-xl font-semibold transition-all duration-300 hover:bg-[#fca5a5] no-underline text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}>
                Download My CV
              </motion.a>
            )}
            {loading && (
              <div className="w-full sm:w-auto px-6 py-3 text-[#1c1917] border-[#1c1917] border-2 rounded-lg text-base sm:text-lg font-semibold opacity-50 text-center">
                Loading CV...
              </div>
            )}
            <motion.a
              href="https://github.com/Kanchan3D" target="_blank"
              className="w-full sm:w-auto px-6 py-3 text-[#1c1917] border-[#1c1917] border-2 rounded-lg text-base sm:text-lg lg:text-xl font-semibold transition-all duration-300 hover:bg-[#4ade80] no-underline text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}>
              Go to GitHub
            </motion.a>
          </div>
        </div>

        {/* Right Section - Profile Image with Flip Effect */}
        <motion.div
          className="w-full lg:w-1/3 flex flex-col items-center justify-center relative mt-6 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.img
            src={isHovered ? profileImage2 : profileImage1}
            alt="Kanchan Dasila"
            className="rounded-full w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 shadow-lg object-cover"
            animate={{ rotateY: isHovered ? 180 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Home;
