"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/layout/navbar.jsx";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    category: "",
    date: "",
    timeSlot: "",
    name: "",
    mobile: "",
  });

  const [token, setToken] = useState("");
  const [blurBg, setBlurBg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  const handleFocus = () => setBlurBg(true);
  const handleBlur = () => setBlurBg(false);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid =
    formData.category !== "" &&
    formData.date !== "" &&
    formData.timeSlot !== "" &&
    formData.name !== "" &&
    formData.mobile !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const bookingResponse = await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          type: formData.category,
          date: formData.date,
          time: formData.timeSlot,
          name: formData.name,
          mobile: formData.mobile,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (bookingResponse?.data?.success) {
        const appointmentId = bookingResponse.data.appointment._id;

        const paymentResponse = await axios.post(
          "http://localhost:5000/api/appointments/initiate-payment",
          { appointmentId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (paymentResponse?.data?.success) {
          const paymentLink = paymentResponse.data.paymentLink;
          window.open(paymentLink, "_blank");
        }
      }
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      <Navbar />

      {/* Dark Overlay with Conditional Blur */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-all duration-300 ${
          blurBg ? "backdrop-blur-md" : ""
        }`}
      ></div>

      {/* Appointment Form Container */}
      <div className="relative z-10 flex-grow flex items-center justify-center mt-10">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-popUp">
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            Book an Appointment
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Category Selection */}
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Select Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                required
              >
                <option value="">Select a category</option>
                <option value="General Consultation">General Consultation</option>
                <option value="Dental Checkup">Dental Checkup</option>
                <option value="Eye Checkup">Eye Checkup</option>
                <option value="Specialist Visit">Specialist Visit</option>
              </select>
            </div>

            {/* Date Input */}
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                required
              />
            </div>

            {/* Time Slot Selection */}
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Select Time Slot
              </label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                required
              >
                <option value="">Select a time</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
              </select>
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Mobile Number Input */}
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="Enter mobile number"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 rounded font-semibold transition-colors ${
                isFormValid
                  ? "bg-blue-300 text-black hover:bg-blue-500"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Proceed to Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
