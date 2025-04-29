import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("An error occurred. Check console.");
        console.log(err);
      });
  }, [id]);

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear: Number(publishYear),
    };
    setLoading(true);
    axios
      .put(`http://localhost:4000/books/edit/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        alert("An error occurred. Check console.");
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <BackButton />
      <h1 className="text-4xl font-bold text-blue-600 my-6">திருத்து குறள்</h1>
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        {loading && <Spinner />}
        <div className="flex flex-col space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              குறள்:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              ஆசிரியர்:
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              அத்தியாயம் எண்:
            </label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <button
            onClick={handleSaveBook}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            சேமிக்க
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
