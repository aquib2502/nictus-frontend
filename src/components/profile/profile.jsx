"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login"); // Redirect to login if no token found
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Your Profile</h1>
        <p className="mt-4 text-gray-600">You are logged in successfully.</p>
        <button
          onClick={() => {
            localStorage.removeItem("authToken"); // Clear token on logout
            router.push("/login"); // Redirect to login page
          }}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
