import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Create Context
const PortfolioContext = createContext();

// Custom Hook to use Portfolio Context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

// Portfolio Provider Component
export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [cv, setCV] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all portfolio data on mount
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all data at once
      const data = await api.getAllPortfolioData();
      
      setProfile(data.profile);
      setProjects(data.projects || []);
      setCertificates(data.certificates || []);
      setCV(data.cv);
      
      console.log('✅ Portfolio data loaded from MongoDB');
    } catch (err) {
      console.error('❌ Error loading portfolio data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Refresh specific data
  const refreshProfile = async () => {
    try {
      const data = await api.getProfile();
      setProfile(data);
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  };

  const refreshProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error refreshing projects:', err);
    }
  };

  const refreshCertificates = async () => {
    try {
      const data = await api.getCertificates();
      setCertificates(data);
    } catch (err) {
      console.error('Error refreshing certificates:', err);
    }
  };

  const refreshCV = async () => {
    try {
      const data = await api.getCV();
      setCV(data);
    } catch (err) {
      console.error('Error refreshing CV:', err);
    }
  };

  const value = {
    profile,
    projects,
    certificates,
    cv,
    loading,
    error,
    refreshProfile,
    refreshProjects,
    refreshCertificates,
    refreshCV,
    refreshAll: fetchPortfolioData
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
