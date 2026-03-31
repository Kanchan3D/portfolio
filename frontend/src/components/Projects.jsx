import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

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

const Projects = () => {
  const { projects, loading, error } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Extract unique technologies
  const allTechs = useMemo(() => {
    if (!projects) return [];
    const techs = new Set();
    projects.forEach((project) => {
      if (project.technologies) {
        project.technologies.split(',').forEach((tech) => {
          techs.add(tech.trim());
        });
      }
    });
    return Array.from(techs).sort();
  }, [projects]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    
    return projects.filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = !selectedTag || 
        (project.technologies && project.technologies.toLowerCase().includes(selectedTag.toLowerCase()));
      
      return matchesSearch && matchesTag;
    });
  }, [projects, searchTerm, selectedTag]);

  // Paginate
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIdx = (currentPage - 1) * projectsPerPage;
  const paginatedProjects = filteredProjects.slice(startIdx, startIdx + projectsPerPage);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTag]);

  return (
    <motion.div 
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8 px-4"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-2">My Projects</h1>
        <p className="text-center text-gray-600 text-sm sm:text-base">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
        </p>
      </motion.div>

      {/* Search & Filter Section */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 sm:mb-8 space-y-4 px-4"
        >
          {/* Search Bar */}
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="🔍 Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-2xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Technology Filter Tags - Responsive */}
          {allTechs.length > 0 && (
            <div className="flex justify-center flex-wrap gap-2 px-2">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base transition-all ${
                  selectedTag === ''
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTag(tech)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${
                    selectedTag === tech
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading projects...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center max-w-md">
            <div className="text-6xl text-yellow-500 mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && !error && paginatedProjects.length > 0 && (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 px-4"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {paginatedProjects.map((project, index) => (
            <motion.div
              key={project._id || index}
              className="bg-white shadow-lg rounded-lg overflow-hidden border hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              {project.image_url && (
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(',').map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3 mt-4">
                  {project.live_url && (
                    <motion.a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all duration-300 no-underline font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Live
                    </motion.a>
                  )}
                  
                  {project.github_url && (
                    <motion.a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all duration-300 no-underline font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* No Results State */}
      {!loading && !error && filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-xl mb-2">No projects found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedTag('');
            }}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && (!projects || projects.length === 0) && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-gray-500 text-xl">No projects yet.</p>
          <p className="text-gray-400 text-sm mt-2">Add projects to your portfolio to display them here!</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center gap-2 mt-8"
        >
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50 hover:bg-gray-400 transition-colors"
          >
            ← Previous
          </button>
          
          <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 sm:px-3 py-2 rounded text-sm sm:text-base transition-colors ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50 hover:bg-gray-400 transition-colors text-sm sm:text-base"
          >
            Next →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;
