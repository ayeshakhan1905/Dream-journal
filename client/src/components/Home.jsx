import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center bg-white/70 backdrop-blur-lg border border-white/30 shadow-lg rounded-3xl p-10 space-y-6">
        {/* Logo / Icon */}
        <div className="text-5xl mb-2">🌙</div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-800 drop-shadow-sm">
          Dream Journal
        </h1>

        {/* Tagline */}
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Reflect on your dreams, find meaning in the subconscious, and track your sleep stories all in one cozy place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            to="/add"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow transition duration-200 transform hover:scale-105"
          >
            ✍️ Add New Dream
          </Link>
          <Link
            to="/dreams"
            className="bg-white text-purple-700 border border-purple-300 px-6 py-3 rounded-xl font-medium hover:bg-purple-100 transition duration-200 transform hover:scale-105"
          >
            📜 View Dream Log
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
