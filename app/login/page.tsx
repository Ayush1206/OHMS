"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set("token", data.token); // Store token in cookies
        Cookies.set("role", data.role);   // Store user role in cookies
        router.push("/dashboard");        // Redirect to dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to login");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-william">
      <div className="bg-porcelain shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          {/* Replace '/images/logo.png' with the path to your actual logo */}
          <Image src="/images/OHMS_logo.png" alt="Logo" width={150} height={150} className="" />
          <h1 className="text-4xl font-bold text-burntSienna">OHMS</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-william mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-william rounded-lg focus:outline-none focus:ring-2 focus:ring-burntSienna"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-william mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-william rounded-lg focus:outline-none focus:ring-2 focus:ring-burntSienna"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-burntSienna text-porcelain py-3 rounded-lg font-semibold hover:bg-porsche transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
