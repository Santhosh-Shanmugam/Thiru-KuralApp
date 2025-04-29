import React from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="table-auto w-full text-left border-separate border-spacing-0 border rounded-lg shadow-md">
        <thead className="bg-sky-800 text-white">
          <tr>
            <th className="px-6 py-4">திருக்குறள்</th>
            <th className="px-6 py-4">குறள் ஏன்</th>
            {/* <th className="px-6 py-4">⚙️ செயல்கள்</th> */}
          </tr>
        </thead>
        <tbody className="bg-white">
          {books &&
            books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-100">
                <td className="border-b px-6 py-4 font-medium">{book.title}</td>
                <td className="border-b px-6 py-4">{book.publishYear}</td>
                {/* <td className="border-b px-6 py-4 flex items-center gap-x-4">
                <PiBookOpenTextLight className="text-blue-500 text-xl cursor-pointer hover:scale-125 transition-transform" />
                <AiOutlineEdit className="text-yellow-600 text-xl cursor-pointer hover:scale-125 transition-transform" />
                <MdOutlineDelete className="text-red-600 text-xl cursor-pointer hover:scale-125 transition-transform" />
              </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
