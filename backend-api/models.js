import mongoose from 'mongoose';

const { Schema } = mongoose;

// Profile Schema - matches Django MongoEngine model EXACTLY
const ProfileSchema = new Schema({
  // Basic Information
  name: { type: String, required: true, maxlength: 100 },
  title: { type: String, maxlength: 200 },
  bio: { type: String, maxlength: 1000 },
  
  // Contact Information
  email: { type: String, required: true },
  phone: { type: String, maxlength: 20 },
  location: { type: String, maxlength: 100 },
  
  // Social Media & Professional Links
  linkedin_url: { type: String },
  github_url: { type: String },
  twitter_url: { type: String },
  instagram_url: { type: String },
  website_url: { type: String },
  
  // Media
  profile_photo_url: { type: String },
  resume_url: { type: String },
  
  // Professional Details
  years_experience: { type: Number, min: 0 },
  skills: { type: String, maxlength: 500 },
  languages: { type: String, maxlength: 200 },
  
  // Settings
  is_active: { type: Boolean, default: true },
  is_available_for_work: { type: Boolean, default: true },
  
  // Timestamps
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { 
  collection: 'profile',
  timestamps: false // We handle timestamps manually
});

// Certificate Schema - matches Django MongoEngine model EXACTLY
const CertificateSchema = new Schema({
  title: { type: String, required: true, maxlength: 200 },
  issuer: { type: String, required: true, maxlength: 200 },
  pdf_url: { type: String, required: true },
  issue_date: { type: Date, default: Date.now },
  description: { type: String, maxlength: 500 },
  is_featured: { type: Boolean, default: true },
  display_order: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { 
  collection: 'certificates',
  timestamps: false
});

// CV Schema - matches Django MongoEngine model EXACTLY
const CVSchema = new Schema({
  title: { type: String, required: true, maxlength: 100, default: "My Resume" },
  pdf_url: { type: String, required: true },
  version: { type: String, maxlength: 50, default: "1.0" },
  is_active: { type: Boolean, default: true },
  description: { type: String, maxlength: 300 },
  upload_date: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { 
  collection: 'cv_resumes',
  timestamps: false
});

// Project Schema - matches Django MongoEngine model EXACTLY
const ProjectSchema = new Schema({
  title: { type: String, required: true, maxlength: 200 },
  description: { type: String, required: true, maxlength: 1000 },
  image_url: { type: String },
  github_url: { type: String },
  live_url: { type: String },
  technologies: { type: String, maxlength: 500 },
  is_featured: { type: Boolean, default: true },
  display_order: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { 
  collection: 'projects',
  timestamps: false
});

// Helper method for technologies list
ProjectSchema.methods.getTechnologiesList = function() {
  if (this.technologies) {
    return this.technologies.split(',').map(tech => tech.trim());
  }
  return [];
};

// Export models
export const Profile = mongoose.model('Profile', ProfileSchema);
export const Certificate = mongoose.model('Certificate', CertificateSchema);
export const CV = mongoose.model('CV', CVSchema);
export const Project = mongoose.model('Project', ProjectSchema);
