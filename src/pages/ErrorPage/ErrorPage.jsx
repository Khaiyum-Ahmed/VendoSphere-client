import { Link, useRouteError } from "react-router";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-base-300 flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <h1 className="text-7xl font-extrabold text-error mb-3">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Something went wrong.</h2>
      <p className="text-gray-600 mb-6">
        {error?.statusText || error?.message || "The page you’re looking for doesn’t exist."}
      </p>

      <Link to="/" className="btn btn-primary flex items-center gap-2">
        <FaHome /> Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
