"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/navbar.jsx";

export default function ContactUsPage() {
  const [blurBg, setBlurBg] = useState(false);

  const handleFocus = () => setBlurBg(true);
  const handleBlur = () => setBlurBg(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col px-6 py-12"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      <Navbar />

      {/* Dark Overlay with Conditional Blur */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-all duration-300 ${
          blurBg ? "backdrop-blur-md" : ""
        }`}
      ></div>

      {/* Contact Form Container */}
      <div className="relative z-10 flex-grow flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-popUp"
        >
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Message
              </label>
              <textarea
                placeholder="Your Message"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 h-32"
                onFocus={handleFocus}
                onBlur={handleBlur}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-300 text-black py-2 rounded hover:bg-blue-500 transition-colors font-semibold"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* Pop-Up Animation Keyframes */}
      <style jsx>{`
        @keyframes popUp {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-popUp {
          animation: popUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
