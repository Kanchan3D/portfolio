// API Service for Portfolio Backend
// Use relative path for Vercel deployment, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api');

class PortfolioAPI {
  constructor() {
    this.adminKey = import.meta.env.VITE_ADMIN_KEY || '';
  }

  // Helper method for admin requests
  async adminFetch(url, method = 'GET', body = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': this.adminKey,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Request failed with status ${response.status}`);
    }
    return await response.json();
  }

  // ==================== PUBLIC GET METHODS ====================

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

  // ==================== ADMIN POST/PUT/DELETE METHODS ====================

  // Create project
  async createProject(projectData) {
    return this.adminFetch(`${API_BASE_URL}/projects`, 'POST', projectData);
  }

  // Update project
  async updateProject(projectId, projectData) {
    return this.adminFetch(`${API_BASE_URL}/projects/${projectId}`, 'PUT', projectData);
  }

  // Delete project
  async deleteProject(projectId) {
    return this.adminFetch(`${API_BASE_URL}/projects/${projectId}`, 'DELETE');
  }

  // Create certificate
  async createCertificate(certData) {
    return this.adminFetch(`${API_BASE_URL}/certificates`, 'POST', certData);
  }

  // Update certificate
  async updateCertificate(certId, certData) {
    return this.adminFetch(`${API_BASE_URL}/certificates/${certId}`, 'PUT', certData);
  }

  // Delete certificate
  async deleteCertificate(certId) {
    return this.adminFetch(`${API_BASE_URL}/certificates/${certId}`, 'DELETE');
  }

  // Create CV
  async createCV(cvData) {
    return this.adminFetch(`${API_BASE_URL}/cv`, 'POST', cvData);
  }

  // Update CV
  async updateCV(cvId, cvData) {
    return this.adminFetch(`${API_BASE_URL}/cv/${cvId}`, 'PUT', cvData);
  }

  // Delete CV
  async deleteCV(cvId) {
    return this.adminFetch(`${API_BASE_URL}/cv/${cvId}`, 'DELETE');
  }

  // Update profile
  async updateProfile(profileData) {
    return this.adminFetch(`${API_BASE_URL}/profile`, 'PUT', profileData);
  }
}

// Export singleton instance
export default new PortfolioAPI();
