import React from 'react';

const projects = [
  {
    title: 'Project 1: Portfolio Website',
    description: 'A responsive portfolio website built using React and Tailwind CSS.',
    link: 'https://github.com/kanchandasila/portfolio',
  },
  {
    title: 'Project 2: E-commerce Store',
    description: 'A full-stack MERN application for an online store with user authentication and payment integration.',
    link: 'https://github.com/kanchandasila/ecommerce-store',
  },
  {
    title: 'Project 3: Blog App',
    description: 'A dynamic blog application using Node.js, Express, and MongoDB.',
    link: 'https://github.com/kanchandasila/blog-app',
  },
];

const codingProfiles = [
  {
    platform: 'GitHub',
    link: 'https://github.com/kanchandasila',
    icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', // GitHub logo
  },
  {
    platform: 'LeetCode',
    link: 'https://leetcode.com/kanchandasila',
    icon: 'https://cdn-icons-png.flaticon.com/512/732/732212.png', // LeetCode logo
  },
  {
    platform: 'HackerRank',
    link: 'https://www.hackerrank.com/kanchandasila',
    icon: 'https://static.cdnlogo.com/logos/h/58/hackerrank.svg', // HackerRank logo
  },
  {
    platform: 'Coding Ninjas',
    link: 'https://www.codingninjas.com/codestudio/profile/kanchandasila',
    icon: 'https://upload.wikimedia.org/wikipedia/en/4/47/Coding_Ninjas_Logo.png', // Coding Ninjas logo
  },
  {
    platform: 'Codeforces',
    link: 'https://codeforces.com/profile/kanchandasila',
    icon: 'https://sta.codeforces.com/s/19848/images/codeforces-logo-with-telegram.png', // Codeforces logo
  },
  {
    platform: 'GeeksforGeeks',
    link: 'https://auth.geeksforgeeks.org/user/kanchandasila',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg', // GeeksforGeeks logo
  },
];

const MyWork = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">My Work</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden border">
            <div className="p-6">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-600"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <h3 className="text-2xl font-bold text-center mt-12 mb-6">Find Me on Coding Platforms</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
        {codingProfiles.map((profile, index) => (
          <a
            key={index}
            href={profile.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-lg border"
          >
            <img src={profile.icon} alt={`${profile.platform} icon`} className="w-12 h-12 mb-4" />
            <span className="text-lg font-semibold text-gray-700">{profile.platform}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MyWork;
