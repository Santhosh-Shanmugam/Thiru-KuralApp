import React from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  console.log(books);
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">திருக்குறள்</th>
            <th className="border border-gray-400 px-4 py-2">குறள் ஏன்</th>
            <th className="border border-gray-400 px-4 py-2">செயல்கள்</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book) => (
              <tr key={book._id}>
                <td className="border border-gray-400 px-4 py-2">{book.title}</td>
                <td className="border border-gray-400 px-4 py-2 ">{book.author}</td>
                <td className="border border-gray-400 px-4 py-2 flex gap-x-2">
                  <span>
                    <PiBookOpenTextLight className="text-red-300 text-2xl" />
                  </span>
                  <span>
                    <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
                  </span>
                  <span>
                    <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
