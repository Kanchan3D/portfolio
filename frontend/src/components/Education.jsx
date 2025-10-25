import React, { useState } from "react";
import lpuLogo from "../assets/icons/lpu.png";
import asianAcademyLogo from "../assets/icons/school.jpeg";
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaAward } from "react-icons/fa";

const educationData = [
  {
    logo: lpuLogo,
    institute: "Lovely Professional University",
    degree: "B.Tech - Computer Science and Engineering",
    score: "CGPA: 8.26",
    duration: "2022 – 2026",
    location: "Phagwara, Punjab",
    color: "#4f46e5", // Indigo
    description: "Specializing in Full Stack Web development with a focus on innovative application development. Active member of the coding club and participant in multiple hackathons."
  },
  {
    logo: asianAcademyLogo,
    institute: "The Asian Academy Sr. Secondary School",
    degree: "Intermediate",
    score: "Percentage: 77%",
    duration: "2020 – 2021",
    location: "Pithoragarh, Uttarakhand",
    color: "#10b981", // Emerald
    description: "Focused on Mathematics and Computer Science. Participated in regional science exhibitions and coding competitions."
  },
  {
    logo: asianAcademyLogo,
    institute: "The Asian Academy Sr. Secondary School",
    degree: "Matriculation",
    score: "Percentage: 81.2%",
    duration: "2018 – 2019",
    location: "Pithoragarh, Uttarakhand",
    color: "#f59e0b", // Amber
    description: "Earned distinction in Science and Mathematics. Active participant in school cultural activities and sports events."
  },
];

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <div className="mt-10 py-16 px-4 sm:px-6 lg:px-8 min-h-screen" id="education">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Educational Journey
          </h2>
          <div className="h-1 w-24 bg-indigo-600 mx-auto rounded"></div>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            My academic background that has shaped my knowledge and skills
          </p>
        </div>

        {/* Timeline */}
        <div className="hidden md:flex justify-center mb-12">
          <div className="relative">
            <div className="absolute left-0 w-full h-1 bg-gray-200 top-4"></div>
            {educationData.map((edu, index) => (
              <div 
                key={index} 
                className="relative inline-block mx-6"
                onClick={() => setActiveIndex(index)}
              >
                <div 
                  className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    activeIndex === index 
                      ? "bg-indigo-600 shadow-lg scale-125" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  style={activeIndex === index ? { backgroundColor: edu.color } : {}}
                >
                  <span className="text-white font-bold">{educationData.length - index}</span>
                </div>
                <div className={`mt-2 text-xs font-medium transition-all duration-300 ${
                  activeIndex === index ? "text-indigo-600 scale-110" : "text-gray-500"
                }`}>
                  {edu.duration.split(" – ")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-1 gap-8">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 ${
                activeIndex === index 
                  ? "scale-100 opacity-100 border-l-4" 
                  : "md:scale-95 md:opacity-70"
              }`}
              style={activeIndex === index ? { borderLeftColor: edu.color } : {}}
              onMouseOver={() => setActiveIndex(index)}
            >
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 flex items-start justify-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 p-2 border border-gray-200 flex items-center justify-center">
                    <img
                      src={edu.logo}
                      alt={`${edu.institute} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">{edu.institute}</h3>
                    <span 
                      className="inline-block px-3 py-1 text-xs font-medium rounded-full" 
                      style={{ backgroundColor: `${edu.color}20`, color: edu.color }}
                    >
                      {index === 0 ? "Current" : "Completed"}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-gray-700 mb-3">{edu.degree}</h4>
                  
                  <p className="text-gray-600 mb-4">{edu.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-2 text-gray-400" />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-gray-400" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaAward className="mr-2 text-gray-400" />
                      <span>{edu.score}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile timeline dots */}
        <div className="flex justify-center mt-8 md:hidden">
          {educationData.map((_, index) => (
            <div 
              key={index}
              className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
                activeIndex === index ? "bg-indigo-600" : "bg-gray-300"
              }`}
              style={activeIndex === index ? { backgroundColor: educationData[index].color } : {}}
              onClick={() => setActiveIndex(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;