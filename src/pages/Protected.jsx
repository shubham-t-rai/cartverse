import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Protected = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <>{children}</>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center text-(--primary-text-color)">
          <h1 className="text-4xl mb-4 font-medium">🔒 Login Required</h1>
          <p className="mb-6 text-gray-500">Please login to access your Watchlist</p>

          <button
            onClick={() => loginWithRedirect()}
            className="bg-(--secondary-text-color) text-white active:scale-95 px-6 py-2 rounded"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Protected;
