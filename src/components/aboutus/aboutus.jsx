"use client";

import { motion } from "framer-motion";
import Navbar from "../../components/layout/navbar.jsx";

export default function AboutUs() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-6 py-12 relative"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      <Navbar />

      {/* Dark Overlay with Conditional Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-all duration-300 backdrop-blur-md"></div>

      {/* Page Title */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="max-w-4xl text-center relative z-10"
      >
        <h1 className="text-5xl font-extrabold text-white">
          About Our Consultancy
        </h1>
      </motion.div>

      {/* Content Sections */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        
        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
          className="bg-[#F8F2E7] p-8 rounded-xl shadow-lg border border-gray-200 transition-all"
        >
          <h2 className="text-3xl font-bold text-black">Our Mission</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Our mission is to empower businesses with expert solutions that drive growth, innovation, and long-term success.
            We aim to bridge the gap between strategy and execution by offering tailored financial planning, operational efficiency, 
            and market expansion strategies.
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✔ Providing actionable insights and data-driven solutions.</li>
            <li>✔ Enhancing operational efficiency through cutting-edge strategies.</li>
            <li>✔ Guiding businesses through market trends and financial risks.</li>
          </ul>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
          className="bg-[#F8F2E7] p-8 rounded-xl shadow-lg border border-gray-200 transition-all"
        >
          <h2 className="text-3xl font-bold text-black">Our Vision</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Our vision is to become the most trusted and impactful consultancy firm globally.
            We strive to set new industry standards by continuously innovating and adapting to the changing business landscape.
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✔ Inspiring businesses to achieve their full potential.</li>
            <li>✔ Building sustainable growth strategies for long-term success.</li>
            <li>✔ Fostering a culture of innovation, trust, and excellence.</li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
}
