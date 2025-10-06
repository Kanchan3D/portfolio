// Vercel Serverless Function for Backend API
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for Vercel deployment
  credentials: true
}));
app.use(express.json());

// MongoDB Connection with caching for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = connection;
  console.log('✅ Connected to MongoDB');
  return connection;
}

// Import models
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  linkedin_url: String,
  github_url: String,
  twitter_url: String,
  instagram_url: String,
  website_url: String,
  profile_photo_url: String,
  resume_url: String,
  years_experience: Number,
  skills: [String],
  languages: [String],
  is_active: { type: Boolean, default: true },
  is_available_for_work: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { collection: 'profile' });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image_url: String,
  github_url: String,
  live_url: String,
  technologies: String,
  is_featured: { type: Boolean, default: false },
  display_order: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { collection: 'projects' });

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: String,
  pdf_url: String,
  issue_date: Date,
  description: String,
  is_featured: { type: Boolean, default: true },
  display_order: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { collection: 'certificates' });

const cvSchema = new mongoose.Schema({
  title: String,
  pdf_url: String,
  version: String,
  is_active: { type: Boolean, default: true },
  description: String,
  upload_date: { type: Date, default: Date.now }
}, { collection: 'cv_resumes' });

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);
const CV = mongoose.models.CV || mongoose.model('CV', cvSchema);

// ==================== API Routes ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running on Vercel!' });
});

// Get Profile
app.get('/api/profile', async (req, res) => {
  try {
    await connectToDatabase();
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
    await connectToDatabase();
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
    await connectToDatabase();
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
    await connectToDatabase();
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
    await connectToDatabase();
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
    await connectToDatabase();
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
    await connectToDatabase();
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

// Export for Vercel serverless function
export default app;
