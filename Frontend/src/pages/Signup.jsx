import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Basic validation
      if (!username || !email || !password) {
        throw new Error("Please fill in all fields");
      }

      // Password validation
      // if (password.length < 6) {
      //   throw new Error("Password must be at least 6 characters long");
      // }

      console.log("Attempting signup with:", { username, email }); // Debug log

      const response = await axios.post(
        "http://localhost:4000/auth/signup",
        { username, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Add this if using cookies
        }
      );

      console.log("Signup response:", response.data); // Debug log

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Detailed signup error:", err);
      if (err.response) {
        // Server responded with error
        setError(err.response.data.message || "Server error occurred");
      } else if (err.request) {
        // No response received
        setError(
          "Cannot connect to server. Please check your internet connection."
        );
      } else {
        // Local error
        setError(err.message || "Error creating account");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-100 to-blue-200">
      <div className="w-96 bg-white shadow-md rounded-lg px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Register Now 🚀
        </h2>
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-sm bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-sm bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-sm bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          <button
            type="submit"
            className={`w-full text-sm bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
