import React from "react";
import leetcodeIcon from "../assets/icons/lc.png";
import hackerrankIcon from "../assets/icons/hr.png";
import codeforcesIcon from "../assets/icons/cf.png";
import "./MyInfo.css";

const projects = [
  {
    title: "Learning Management System",
    description:
      "A responsive website built using MERN and Tailwind CSS. It includes a user-friendly interface for managing courses, students, and instructors.",
    link: "https://lms-kd.vercel.app/",
  },
  {
    title: "URL Shortener",
    description:
      "A website built using MERN and Tailwind CSS. It allows users to shorten long URLs.",
    link: "https://short-url-kd.vercel.app/",
  },
  {
    title: "E-commerce Store",
    description:
      "A full-stack MERN application for an online store with user authentication and payment integration.",
    link: "https://kanchan3d.github.io/Portfolio/",
  },
  {
    title: "Blog App",
    description:
      "A dynamic blog application using Node.js, Express, and MongoDB.",
    link: "https://kanchan3d.github.io/Portfolio/",
  },
  {
    title: "LeetMetric",
    description:
      "A UI application using Node.js to show user stats from LeetCode.",
    link: "https://kanchan3d.github.io/LeetMetric/",
  },
  {
    title: "Online Voting System",
    description: "An online voting system using PHP.",
    link: "http://kanchandasila3.fwh.is/",
  },
];

const codingProfiles = [
  {
    platform: "GitHub",
    link: "https://github.com/kanchan3d",
    icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
  },
  {
    platform: "GeeksforGeeks",
    link: "https://www.geeksforgeeks.org/user/kanchan3d/",
    icon: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
  },
  {
    platform: "LeetCode",
    link: "https://leetcode.com/u/Kanchan3D/",
    icon: leetcodeIcon,
  },
  {
    platform: "Coding Ninjas",
    link: "https://www.naukri.com/code360/profile/KanchanD",
    icon: "https://files.codingninjas.in/new-cn-logos-1-1711622387.svg",
  },
  {
    platform: "HackerRank",
    link: "https://www.hackerrank.com/profile/kanchan_dasila1",
    icon: hackerrankIcon,
  },
  {
    platform: "Codeforces",
    link: "https://codeforces.com/profile/kanchan_3d",
    icon: codeforcesIcon,
  },
];
const MyWork = () => {
  return (
    <div className="container mx-auto p-6">
      <h3 className="text-2xl pb-2 font-bold text-center">
        Find Me on Coding Platforms
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-8 justify-center">
        {codingProfiles.map((profile, index) => (
          <a
            key={index}
            href={profile.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-[#fecaca] shadow-md rounded-lg p-4 flex flex-col items-center border no-underline 
      transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl">
            <img
              src={profile.icon}
              alt={`${profile.platform} icon`}
              className="w-12 h-12 mb-4 transition-all duration-300 ease-in-out transform hover:scale-125"
            />
            <span className="text-lg font-semibold text-gray-700 hover:text-[#f87171]">
              {profile.platform}
            </span>
          </a>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center mt-12 mb-3">Projects</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className=" bg-white shadow-lg rounded-lg overflow-hidden border transition-all duration-300 ease-in-out 
      transform hover:scale-105 hover:shadow-2xl">
            <div className="p-6 shadow-[#fecaca]">
              <h3 className="text-xl font-semibold transition-all duration-300 hover:text-[#f87171]">
                {project.title}
              </h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#10b981] text-white mt-4 px-4 py-2 rounded 
          hover:bg-[#ef4444] hover:scale-110 transition-all duration-300 ease-in-out no-underline bottom-1 right-1">
                View Project
              </a>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyWork;
