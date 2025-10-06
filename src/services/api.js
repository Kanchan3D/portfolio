// API Service for Portfolio Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

class PortfolioAPI {
  // Fetch profile data
  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`);
      if (!response.ok) throw new Error('Failed to fetch profile');
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  // Fetch all projects
  async getProjects() {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  // Fetch featured projects only
  async getFeaturedProjects() {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/featured`);
      if (!response.ok) throw new Error('Failed to fetch featured projects');
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
  }

  // Fetch single project by ID
  async getProject(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`);
      if (!response.ok) throw new Error('Failed to fetch project');
      return await response.json();
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  }

  // Fetch all certificates
  async getCertificates() {
    try {
      const response = await fetch(`${API_BASE_URL}/certificates`);
      if (!response.ok) throw new Error('Failed to fetch certificates');
      return await response.json();
    } catch (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
  }

  // Fetch active CV
  async getCV() {
    try {
      const response = await fetch(`${API_BASE_URL}/cv`);
      if (!response.ok) throw new Error('Failed to fetch CV');
      return await response.json();
    } catch (error) {
      console.error('Error fetching CV:', error);
      throw error;
    }
  }

  // Fetch all portfolio data at once (optimized for initial load)
  async getAllPortfolioData() {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio-data`);
      if (!response.ok) throw new Error('Failed to fetch portfolio data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new PortfolioAPI();
