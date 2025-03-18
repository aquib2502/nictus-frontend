"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/navbar.jsx";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [blurBg, setBlurBg] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(""); 
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/");
    }
  }, []);

  const emailRegex = /^(?!\.)([a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,})$/;
  const mobileRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email: formData.email, password: formData.password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      setMessage("Login Successful! Redirecting...");
      setError("");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    if (!mobileRegex.test(formData.mobile)) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setError("Password must have at least 6 characters, 1 uppercase letter, and 1 special character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      setMessage("Registered Successfully! Redirecting to login...");
      setError("");

      setTimeout(() => {
        setIsLogin(true);
        setMessage("");
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", mobile: "", password: "", confirmPassword: "" });
    setError("");
    setMessage("");
  };

  const handleFocus = () => setBlurBg(true);
  const handleBlur = () => setBlurBg(false);

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

      <div className="relative z-10 flex-grow flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-popUp"
        >
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            {isLogin ? "Login" : "Register"}
          </h2>

          {message && <p className="mb-4 text-center text-green-500 font-medium">{message}</p>}
          {error && <p className="mb-4 text-center text-red-500 font-medium">{error}</p>}

          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-black font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your Password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-300 text-black py-2 rounded hover:bg-blue-500 transition-colors font-semibold"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={toggleForm} className="text-blue-600 hover:underline">
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </motion.div>
      </div>

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
