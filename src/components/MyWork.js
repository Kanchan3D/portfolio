import React from 'react';

// import gfgIcon from 'https://media.geeksforgeeks.org/gfg-gg-logo.svg';
import leetcodeIcon from '../assets/icons/lc.png';
import hackerrankIcon from '../assets/icons/hr.png';
// import codingNinjasIcon from 'https://files.codingninjas.in/new-cn-logos-1-1711622387.svg';
import codeforcesIcon from '../assets/icons/cf.png';

const projects = [
  {
    title: 'Project 1: Portfolio Website',
    description: 'A responsive portfolio website built using React and Tailwind CSS.',
    link: 'https://kanchan3d.github.io/Portfolio/',
  },
  {
    title: 'Project 2: E-commerce Store',
    description: 'A full-stack MERN application for an online store with user authentication and payment integration.',
    link: 'https://kanchan3d.github.io/Portfolio/',
  },
  {
    title: 'Project 3: Blog App',
    description: 'A dynamic blog application using Node.js, Express, and MongoDB.',
    link: 'https://kanchan3d.github.io/Portfolio/',
  },
];

const codingProfiles = [
  
    {
      platform: 'GitHub',
      link: 'https://github.com/kanchan3d',
      icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    },
    {
      platform: 'GeeksforGeeks',
      link: 'https://www.geeksforgeeks.org/user/kanchan3d/',
      icon: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
    },
    {
      platform: 'LeetCode',
      link: 'https://leetcode.com/u/Kanchan3D/',
      icon: leetcodeIcon,
    },
    {
      platform: 'HackerRank',
      link: 'https://www.hackerrank.com/profile/kanchan_dasila1',
      icon: hackerrankIcon,
    },
    {
      platform: 'Coding Ninjas',
      link: 'https://www.naukri.com/code360/profile/KanchanD',
      icon: 'https://files.codingninjas.in/new-cn-logos-1-1711622387.svg',
    },
    {
      platform: 'Codeforces',
      link: 'https://codeforces.com/profile/kanchan_3d',
      icon: codeforcesIcon,
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
