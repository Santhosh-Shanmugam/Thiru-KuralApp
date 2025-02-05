import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:6969/books/tasks")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gradient-to-tr from-blue-50 to-indigo-100 min-h-screen">
      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg text-white font-semibold ${
            showType === "table"
              ? "bg-blue-600 shadow-md"
              : "bg-blue-400 hover:bg-blue-600"
          }`}
          onClick={() => setShowType("table")}
        >
          அனைத்து குறள்
        </button>
        <button
          className={`px-6 py-2 rounded-lg text-white font-semibold ${
            showType === "card"
              ? "bg-blue-600 shadow-md"
              : "bg-blue-400 hover:bg-blue-600"
          }`}
          onClick={() => setShowType("card")}
        >
          அட்டைகள்
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700 pl-4">📚 எனது குறள் பட்டியல்</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-blue-600 text-5xl hover:text-blue-800 transition duration-300" />
        </Link>
      </div>

      {/* Conditional Rendering for Books Table or Card */}
      <div className="bg-white p-6 shadow-md rounded-xl">
        {loading ? (
          <p className="text-center text-lg font-medium text-gray-500">
            தரவை ஏற்றுகிறது...
          </p>
        ) : showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
