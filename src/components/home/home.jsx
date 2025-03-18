"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import ExpertSection from "../expertsection/expertsection.jsx";

const HomePage = () => {
  const router = useRouter(); // Initialize router

  return (
    <div>
     

      {/* Full-Screen Section with Background */}
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: "url('/bg-image.jpg')" }}
        ></div>

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          {/* Container for Text & Button */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Heading / Tagline */}
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-relaxed">
              Expert guidance tailored to your needs - book your consultation today!
            </h1>

            {/* Button */}
            <button
              onClick={() => router.push("/appointments")} // Redirect to /appointments
              className="
                px-6
                py-3
                bg-white
                text-black
                rounded-full
                text-lg
                font-semibold
                shadow
                hover:shadow-md
                transition
                hover:scale-105
              "
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      <ExpertSection />
    </div>
  );
};

export default HomePage;
