import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:6969/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happened");
        console.error(err);
      });
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-sky-50 to-sky-200 flex flex-col items-center">
      <BackButton />
      <h1 className="text-4xl font-bold text-gray-700 my-6">📜 திருக்குறள்</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center bg-white shadow-lg rounded-xl w-full max-w-md p-8">
          <h3 className="text-xl font-medium text-gray-800 mb-4 text-center">
            இந்த திருக்குறளை நிச்சயமாக நீக்க விரும்புகிறீர்களா?
          </h3>
          <div className="flex flex-col gap-4 w-full">
            <button
              className="py-3 px-6 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300 w-full"
              onClick={handleDeleteBook}
            >
              உறுதி
            </button>
            <button
              className="py-3 px-6 bg-gray-200 text-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-300 transition duration-300 w-full"
              onClick={() => navigate("/home")}
            >
              திரும்ப செல்லுங்கள்
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
