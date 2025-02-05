import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    axios
      .post("http://localhost:6969/signup", { name, email, password })
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        setError("Error creating account. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-100 to-blue-200">
      <div className="w-96 bg-white shadow-md rounded-lg px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Create an Account 🚀
        </h2>

        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-sm bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-sm bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-sm bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full text-sm bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already Registered?{" "}
          <Link
            to="/"
            className="font-medium text-blue-600 underline hover:text-blue-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
