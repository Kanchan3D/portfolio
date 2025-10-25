import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { FaAward, FaCertificate, FaExternalLinkAlt, FaCalendarAlt, FaTrophy, FaDownload } from "react-icons/fa";

const Certificates = () => {
  const { certificates, loading, error } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Loading state with enhanced animation
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="text-center">
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 border-4 border-transparent border-t-purple-500 border-r-blue-500 border-b-pink-500 rounded-full mx-auto"></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <FaCertificate className="text-5xl text-purple-500 mx-auto mb-3 animate-pulse" />
            <p className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Loading Certificates
            </p>
            <p className="text-sm text-gray-500 mt-2">Fetching from MongoDB...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Error state with enhanced design
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4 ">
        <motion.div 
          className="text-center max-w-md bg-white rounded-3xl shadow-2xl p-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
          >
            <i className="fas fa-exclamation-triangle text-7xl text-yellow-500 mb-4"></i>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <motion.button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      {/* Animated Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaTrophy className="text-6xl text-yellow-500 mx-auto drop-shadow-lg" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              My Certificates
            </span>
          </h1>
          
          <motion.div
            className="h-1.5 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            A collection of my professional achievements and continuous learning journey
          </p>
          
          {certificates && certificates.length > 0 && (
            <motion.div
              className="mt-6 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <FaAward className="text-purple-500 text-xl" />
              <span className="text-gray-800 font-semibold">
                {certificates.length} Certificate{certificates.length !== 1 ? 's' : ''} Earned
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Certificates Grid */}
        {certificates && certificates.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={cert._id || index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Card Container */}
                <motion.div
                  className="relative bg-white rounded-3xl shadow-xl overflow-hidden h-full"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" 
                       style={{ padding: '3px' }}>
                    <div className="h-full w-full bg-white rounded-3xl" />
                  </div>

                  {/* Content Wrapper */}
                  <div className="relative z-10">
                    {/* PDF Preview Section */}
                    <div className="relative h-56 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 overflow-hidden">
                      <iframe
                        src={cert.pdf_url}
                        title={`preview-${index}`}
                        className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        frameBorder="0"
                      />
                      
                      {/* Overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      >
                        <div className="flex gap-3">
                          <motion.a
                            href={cert.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800 flex items-center gap-2 hover:bg-white transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaExternalLinkAlt className="text-purple-600" />
                            View
                          </motion.a>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCert(cert);
                            }}
                            className="px-4 py-2 bg-purple-500 rounded-full text-sm font-semibold text-white flex items-center gap-2 hover:bg-purple-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaDownload />
                            Download
                          </motion.button>
                        </div>
                      </motion.div>

                      {/* Featured Badge */}
                      {cert.is_featured && (
                        <motion.div
                          className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                        >
                          <FaTrophy className="text-white" />
                          Featured
                        </motion.div>
                      )}
                    </div>

                    {/* Certificate Details */}
                    <div className="p-6">
                      <motion.h2 
                        className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300"
                      >
                        {cert.title}
                      </motion.h2>
                      
                      {cert.issuer && (
                        <div className="flex items-center gap-2 mb-2">
                          <FaCertificate className="text-blue-500 text-sm" />
                          <p className="text-sm font-semibold text-blue-600">
                            {cert.issuer}
                          </p>
                        </div>
                      )}
                      
                      {cert.issue_date && (
                        <div className="flex items-center gap-2 mb-3">
                          <FaCalendarAlt className="text-gray-400 text-sm" />
                          <p className="text-xs text-gray-500">
                            {new Date(cert.issue_date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      )}
                      
                      {cert.description && (
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                          {cert.description}
                        </p>
                      )}

                      {/* View Certificate Link */}
                      <motion.div
                        className="pt-4 border-t border-gray-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                          Click to view full certificate
                          <FaExternalLinkAlt className="text-xs" />
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Number Badge */}
                <motion.div
                  className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-20"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaCertificate className="text-8xl text-gray-300 mx-auto mb-6" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Certificates Yet</h3>
            <p className="text-gray-500 text-lg mb-2">Your learning journey starts here!</p>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Add certificates through Django admin panel to showcase your achievements
            </p>
          </motion.div>
        )}

        {/* Modal for Certificate Preview */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedCert.title}</h2>
                      {selectedCert.issuer && (
                        <p className="text-white/90 text-sm">{selectedCert.issuer}</p>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  <iframe
                    src={selectedCert.pdf_url}
                    className="w-full h-[500px] rounded-lg"
                    title="Certificate Preview"
                  />
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={selectedCert.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <FaDownload />
                    Download Certificate
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Certificates;
