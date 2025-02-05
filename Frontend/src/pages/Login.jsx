import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    axios
      .post("http://localhost:6969/login", { email, password })
      .then((response) => {
        console.log(response.data);
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        setError("Invalid credentials. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300">
      <div className="w-96 bg-white shadow-md rounded-lg px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Welcome Back 👋
        </h2>
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
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
            Login
          </button>
          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 underline hover:text-blue-800"
            >
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
