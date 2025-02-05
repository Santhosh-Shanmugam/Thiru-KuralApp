import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:6969/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-sky-50 to-blue-100">
      <BackButton />
      <h1 className="text-4xl font-bold text-gray-700 my-6">📖 Show Book</h1>
      
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col bg-white shadow-xl rounded-xl p-6 w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{book.title}</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-500">Author:</span>
              <span className="text-lg">{book.author}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-500">Publish Year:</span>
              <span className="text-lg">{book.publishYear}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-500">Create Time:</span>
              <span className="text-lg">{new Date(book.createAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-500">Last Update Time:</span>
              <span className="text-lg">{new Date(book.updateAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
