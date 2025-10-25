import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Profile, Project, Certificate, CV } from './models.js';

dotenv.config();

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...\n');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!\n');
    
    // Test Profile
    console.log('📊 Testing Profile collection...');
    const profile = await Profile.findOne();
    if (profile) {
      console.log(`✅ Found profile: ${profile.name} - ${profile.title}`);
      console.log(`   Email: ${profile.email}`);
      if (profile.profile_photo_url) {
        console.log(`   Photo URL: ${profile.profile_photo_url.substring(0, 50)}...`);
      }
    } else {
      console.log('⚠️  No profile found. Add one in Django admin!');
    }
    
    // Test Projects
    console.log('\n📊 Testing Project collection...');
    const projects = await Project.find();
    console.log(`✅ Found ${projects.length} projects`);
    if (projects.length > 0) {
      projects.slice(0, 3).forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.title}`);
      });
    } else {
      console.log('⚠️  No projects found. Add some in Django admin!');
    }
    
    // Test Certificates
    console.log('\n📊 Testing Certificate collection...');
    const certificates = await Certificate.find();
    console.log(`✅ Found ${certificates.length} certificates`);
    if (certificates.length > 0) {
      certificates.slice(0, 3).forEach((c, i) => {
        console.log(`   ${i + 1}. ${c.title} - ${c.issuer}`);
      });
    } else {
      console.log('⚠️  No certificates found. Add some in Django admin!');
    }
    
    // Test CV
    console.log('\n📊 Testing CV collection...');
    const cv = await CV.findOne({ is_active: true });
    if (cv) {
      console.log(`✅ Found active CV: ${cv.title}`);
      console.log(`   URL: ${cv.cv_url}`);
    } else {
      console.log('⚠️  No active CV found. Add one in Django admin!');
    }
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('💡 Your backend is ready to serve this data via API.\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

testConnection();
