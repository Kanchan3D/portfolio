import React from "react";
import { motion } from "framer-motion";  
import { usePortfolio } from "../context/PortfolioContext";
import leetcodeIcon from "../assets/icons/lc.png";
import hackerrankIcon from "../assets/icons/hr.png";
import codeforcesIcon from "../assets/icons/cf.png";
import "./MyInfo.css";

// Coding Profiles Data (keeping static as these are external platforms)
const codingProfiles = [
  {
    platform: "GitHub",
    link: "https://github.com/kanchan3d",
    icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
  },
  {
    platform: "GeeksforGeeks",
    link: "https://www.geeksforgeeks.org/user/kanchan3d/",
    icon: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
  },
  {
    platform: "LeetCode",
    link: "https://leetcode.com/u/Kanchan3D/",
    icon: leetcodeIcon,
  },
  {
    platform: "Coding Ninjas",
    link: "https://www.naukri.com/code360/profile/KanchanD",
    icon: "https://files.codingninjas.in/new-cn-logos-1-1711622387.svg",
  },
  {
    platform: "HackerRank",
    link: "https://www.hackerrank.com/profile/kanchan_dasila1",
    icon: hackerrankIcon,
  },
  {
    platform: "Codeforces",
    link: "https://codeforces.com/profile/kanchan_3d",
    icon: codeforcesIcon,
  },
];

// Stagger Effect for Profiles
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MyWork = () => {
  const { projects, loading, error } = usePortfolio();

  return (
    <motion.div 
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Animated Heading */}
      <motion.h3 
        className="text-2xl pb-2 font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from("Find Me on Coding Platforms").map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h3>

      {/* Coding Profiles Section */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-6 gap-8 justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {codingProfiles.map((profile, index) => (
          <motion.a
            key={index}
            href={profile.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center border no-underline"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.img
              src={profile.icon}
              alt={`${profile.platform} icon`}
              className="w-12 h-12 mb-4"
              animate={{ y: [0, -5, 0] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-lg font-semibold text-gray-700 hover:text-[#f87171]">
              {profile.platform}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Animated Projects Title */}
      <motion.h2 
        className="text-3xl font-bold text-center mt-12 mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Projects
      </motion.h2>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading projects from MongoDB...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center max-w-md">
            <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Project Cards - Data from MongoDB */}
      {!loading && !error && projects && projects.length > 0 && (
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id || index}
              className="bg-white shadow-lg rounded-lg overflow-hidden border"
              variants={itemVariants}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              {project.image_url && (
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-semibold hover:text-[#f87171]"
                  whileHover={{ color: "#f87171" }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                
                {project.technologies && (
                  <p className="text-sm text-blue-600 mt-2">
                    <strong>Tech:</strong> {project.technologies}
                  </p>
                )}
                
                <div className="flex gap-3 mt-4">
                  {project.live_url && (
                    <motion.a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#10b981] text-white px-4 py-2 rounded hover:bg-[#ef4444] transition-all duration-300 ease-in-out no-underline"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      View Project
                    </motion.a>
                  )}
                  
                  {project.github_url && (
                    <motion.a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-300 ease-in-out no-underline"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fab fa-github mr-2"></i>
                      GitHub
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* No Projects State */}
      {!loading && !error && (!projects || projects.length === 0) && (
        <div className="text-center py-20">
          <i className="fas fa-code text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-xl">No projects found.</p>
          <p className="text-gray-400 text-sm mt-2">Add projects through Django admin to display them here!</p>
        </div>
      )}
    </motion.div>
  );
};

export default MyWork;
