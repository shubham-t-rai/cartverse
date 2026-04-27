import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProductCard from "./components/ProductCard.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import ProductDetails from "./components/ProductDetails.jsx";
import SearchResults from "./components/SearchResults.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import Protected from "./pages/Protected.jsx";
import Cart from "./pages/Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductCard />,
      },
      {
        path: "products/:category",
        element: <ProductCard />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "search/:search",
        element: <SearchResults />,
      },
      {
        path: "wishlist",
        element: (
          <Protected>
            <Wishlist />
          </Protected>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Auth0Provider>,
);
