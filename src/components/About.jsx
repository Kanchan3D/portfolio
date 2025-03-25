import React from 'react';
import profileImage from '../assets/icons/profile3.jpeg';

const About = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={profileImage}
        alt="Kanchan Dasila"
        className="rounded-full w-32 h-32 md:w-48 md:h-48 mb-4 shadow-lg object-cover"
      />
      <h2 className="text-3xl font-bold mt-4">About Me</h2>
      <p className="mt-2 text-lg text-gray-600 max-w-xl">
        I am Kanchan Dasila, a Full Stack Web Developer with a passion for creating dynamic and responsive web applications. I specialize in both front-end and back-end development, with a focus on modern technologies.
      </p>
    </div>
  );
};

export default About;
