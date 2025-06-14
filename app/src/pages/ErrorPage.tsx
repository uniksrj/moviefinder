import { Link } from "react-router";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-6">
          We can't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
