import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Profile, Project, Certificate, CV } from './models.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'your-secret-key-here';

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Authentication middleware for admin endpoints
const authenticateAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'] || req.body.admin_key;
  
  if (!adminKey || adminKey !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized - Invalid admin key' });
  }
  next();
};

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB successfully!'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ==================== PUBLIC API ROUTES (GET) ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running!' });
});

// Get Profile
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne({ is_active: true });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Get All Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ display_order: 1, created_at: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get Featured Projects
app.get('/api/projects/featured', async (req, res) => {
  try {
    const projects = await Project.find({ is_featured: true }).sort({ display_order: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
});

// Get Single Project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Get All Certificates
app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ display_order: 1, issue_date: -1 });
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// Get Active CV
app.get('/api/cv', async (req, res) => {
  try {
    const cv = await CV.findOne({ is_active: true }).sort({ upload_date: -1 });
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }
    res.json(cv);
  } catch (error) {
    console.error('Error fetching CV:', error);
    res.status(500).json({ error: 'Failed to fetch CV' });
  }
});

// Get all data at once (for initial load)
app.get('/api/portfolio-data', async (req, res) => {
  try {
    const [profile, projects, certificates, cv] = await Promise.all([
      Profile.findOne({ is_active: true }),
      Project.find().sort({ display_order: 1, created_at: -1 }),
      Certificate.find().sort({ display_order: 1, issue_date: -1 }),
      CV.findOne({ is_active: true }).sort({ upload_date: -1 })
    ]);

    res.json({
      profile,
      projects,
      certificates,
      cv
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
});

// ==================== ADMIN API ROUTES (POST, PUT, DELETE) ====================

// Create Project
app.post('/api/projects', authenticateAdmin, async (req, res) => {
  try {
    const { title, description, image_url, github_url, live_url, technologies, is_featured, display_order } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    
    const project = new Project({
      title,
      description,
      image_url,
      github_url,
      live_url,
      technologies,
      is_featured: is_featured !== undefined ? is_featured : true,
      display_order: display_order || 0
    });
    
    await project.save();
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update Project
app.put('/api/projects/:id', authenticateAdmin, async (req, res) => {
  try {
    const { title, description, image_url, github_url, live_url, technologies, is_featured, display_order } = req.body;
    
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        image_url,
        github_url,
        live_url,
        technologies,
        is_featured,
        display_order,
        updated_at: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete Project
app.delete('/api/projects/:id', authenticateAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Create Certificate
app.post('/api/certificates', authenticateAdmin, async (req, res) => {
  try {
    const { title, issuer, pdf_url, issue_date, description, is_featured, display_order } = req.body;
    
    if (!title || !issuer || !pdf_url) {
      return res.status(400).json({ error: 'Title, issuer, and PDF URL are required' });
    }
    
    const certificate = new Certificate({
      title,
      issuer,
      pdf_url,
      issue_date: issue_date || new Date(),
      description,
      is_featured: is_featured !== undefined ? is_featured : true,
      display_order: display_order || 0
    });
    
    await certificate.save();
    res.status(201).json({ message: 'Certificate created successfully', certificate });
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({ error: 'Failed to create certificate' });
  }
});

// Update Certificate
app.put('/api/certificates/:id', authenticateAdmin, async (req, res) => {
  try {
    const { title, issuer, pdf_url, issue_date, description, is_featured, display_order } = req.body;
    
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      {
        title,
        issuer,
        pdf_url,
        issue_date,
        description,
        is_featured,
        display_order,
        updated_at: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    
    res.json({ message: 'Certificate updated successfully', certificate });
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({ error: 'Failed to update certificate' });
  }
});

// Delete Certificate
app.delete('/api/certificates/:id', authenticateAdmin, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
});

// Create CV
app.post('/api/cv', authenticateAdmin, async (req, res) => {
  try {
    const { title, pdf_url, version, description } = req.body;
    
    if (!pdf_url) {
      return res.status(400).json({ error: 'PDF URL is required' });
    }
    
    // Deactivate other CVs if this is active
    if (req.body.is_active !== false) {
      await CV.updateMany({ is_active: true }, { is_active: false });
    }
    
    const cv = new CV({
      title: title || 'My Resume',
      pdf_url,
      version: version || '1.0',
      description,
      is_active: req.body.is_active !== false
    });
    
    await cv.save();
    res.status(201).json({ message: 'CV created successfully', cv });
  } catch (error) {
    console.error('Error creating CV:', error);
    res.status(500).json({ error: 'Failed to create CV' });
  }
});

// Update CV
app.put('/api/cv/:id', authenticateAdmin, async (req, res) => {
  try {
    const { title, pdf_url, version, description, is_active } = req.body;
    
    // Deactivate other CVs if this one is being activated
    if (is_active === true) {
      await CV.updateMany({ _id: { $ne: req.params.id }, is_active: true }, { is_active: false });
    }
    
    const cv = await CV.findByIdAndUpdate(
      req.params.id,
      {
        title,
        pdf_url,
        version,
        description,
        is_active,
        updated_at: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }
    
    res.json({ message: 'CV updated successfully', cv });
  } catch (error) {
    console.error('Error updating CV:', error);
    res.status(500).json({ error: 'Failed to update CV' });
  }
});

// Delete CV
app.delete('/api/cv/:id', authenticateAdmin, async (req, res) => {
  try {
    const cv = await CV.findByIdAndDelete(req.params.id);
    
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }
    
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.error('Error deleting CV:', error);
    res.status(500).json({ error: 'Failed to delete CV' });
  }
});

// Update Profile
app.put('/api/profile', authenticateAdmin, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { is_active: true },
      { ...req.body, updated_at: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ==================== Start Server ====================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log('ℹ️  Admin routes require X-Admin-Key header for authentication');
});
