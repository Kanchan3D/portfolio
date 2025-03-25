import React from "react";
// import profileImage from "../profile2.JPG";
import profileImage1 from "../assets/icons/profile1.jpeg";

const Home = () => {
  return (
    <>
    
      <div className="flex flex-col items-center text-center">
        {/* <img src={profileImage} class="img-fluid w-32 h-32" alt="..."></img> */}
        <img
          src={profileImage1}
          alt="Kanchan Dasila"
          // className="rounded-full w-32 h-32 md:w-48 md:h-48 mb-4 shadow-lg"
          className="rounded-full w-32 h-32 md:w-48 md:h-48 mb-4 shadow-lg object-cover"
        />
        <h1 className="text-4xl font-bold mt-4">Kanchan Dasila</h1>
        <p className="mt-2 text-lg text-gray-600">
          Full Stack Web Developer specializing in modern web development.
        </p>
      </div>
    </>
  );
};

export default Home;
