import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/home" }) => {
  return (
    <div className="flex pt-4">
      <Link
        to={destination}
        className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-800 transition duration-300"
      >
        <BsArrowLeft className="text-xl mr-2" />
        <span className="text-sm font-medium">Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
