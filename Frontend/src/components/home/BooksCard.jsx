import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const BooksCard = ({ books }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(books.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Split function for Thirukural titles
  const splitThirukural = (title) => {
    const words = title.split(" ");
    const firstLine = words.slice(0, 4).join(" ");
    const secondLine = words.slice(4).join(" ");
    return { firstLine, secondLine };
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6 mt-6">
        {currentBooks.map((item) => {
          const { firstLine, secondLine } = splitThirukural(item.title);
          return (
            <div
              key={item._id}
              className="border-2 border-gray-500 rounded-lg px-4 py-6 relative hover:shadow-xl"
            >
              <div className="flex justify-start items-center gap-x-2">
                <PiBookOpenTextLight className="text-red-900 text-4xl" />
              </div>
              <div className="my-4 mx-12">
                <p className="text-lg text-gray-600">{firstLine}</p>
                <p className="text-lg text-gray-600">{secondLine}</p>
              </div>
              <div className="text-gray-1000 font-bold mt-2 ml-12 my-1">
                குறள் விளக்கம் : '{item.author}'
              </div>
              <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
                <Link to={`/books/edit/${item._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
                </Link>
                <Link to={`/books/delete/${item._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-400 disabled:opacity-50 rounded-lg"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(books.length / itemsPerPage)}
          className="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-400 disabled:opacity-50 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BooksCard;
