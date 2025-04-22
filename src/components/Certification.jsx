import React from "react";
import { motion } from "framer-motion";
import eth1 from "../assets/Certificates/EthicalHacking.pdf"
import node1 from "../assets/Certificates/NodejsMOOC.pdf"
import php1 from "../assets/Certificates/phpmooc.pdf"
import cpp1 from "../assets/Certificates/cpp1.pdf"
import fe1 from "../assets/Certificates/KanchanFrontend.pdf"
import gai1 from "../assets/Certificates/Gai1.pdf"
import pf1 from "../assets/Certificates/pf1.pdf"

const certificates = [
  { title: "Mern Stack", pdfLink: "https://cipher-other-assets.s3.ap-south-1.amazonaws.com/certificates/TC_hkkamaldasila333%40gmail.com_CS2024-11203" },
  { title: "Ethical Hacking", pdfLink: eth1 },
  { title: "C++ and Data Structures Algorithms", pdfLink: cpp1 },
  { title: "Generative AI with Large Language Models", pdfLink: gai1 },
  { title: "Server side JavaScript with Node.js", pdfLink: node1 },
  { title: "HTML, CSS, and Javascript for Web Developers", pdfLink: fe1 },
  { title: "Fundamentals of Management", pdfLink: node1 },
  { title: "Programming Foundations: Data Structures", pdfLink: pf1 },
  { title: "Building Web Applications in PHP", pdfLink: php1 },
];

const Certificates = () => {
  return (
    <div className="container mx-auto px-2 py- min-h-screen">
      <motion.h1
        className="text-4xl font-bold text-center text-black mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Certificates
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {certificates.map((cert, index) => (
          <motion.a
            key={index}
            href={cert.pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-pink-300 transition-all border overflow-hidden"
          >
            {/* PDF Preview */}
            <div className="w-full h-60 bg-blue-100">
              <iframe
                src={cert.pdfLink}
                title={`preview-${index}`}
                className="w-full h-full"
                frameBorder="0"
              ></iframe>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{cert.title}</h2>
              <p className="text-sm text-gray-500">View or Download</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
