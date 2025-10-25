// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-64 text-gray-800 p-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h1 className="text-5xl font-bold mb-4">Oops!</h1>
      <p className="text-lg mb-6">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-green-400 text-black px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
