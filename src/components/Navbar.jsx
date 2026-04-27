import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Menu, X, Search, Heart, User, Handbag, Home } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, loginWithRedirect, logout } = useAuth0();
  const { searchProducts, fetchSearchProducts, searchLoading } = useProducts();
  const { items } = useSelector((state) => state.cart);

  const [openMenu, setOpenMenu] = useState(false);

  const [input, setInput] = useState("");
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const MAIN_NAV = [
    { label: "Men", key: "men" },
    { label: "Women", key: "women" },
    { label: "Electronics", key: "electronics" },
    { label: "Home & Living", key: "home" },
    { label: "Beauty", key: "beauty" },
  ];

  const MORE_NAV = [
    { label: "Accessories", key: "accessories" },
    { label: "Automotive", key: "automotive" },
    { label: "Groceries", key: "groceries" },
  ];

  const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (location.pathname.startsWith("/search")) return;

    const delay = setTimeout(() => {
      if (input.trim().length >= 2) {
        fetchSearchProducts(input);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [input, location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const clickedDesktop = desktopSearchRef.current?.contains(e.target);

      const clickedMobile = mobileSearchRef.current?.contains(e.target);

      if (!clickedDesktop && !clickedMobile) {
        setInput("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <nav className="px-4 md:px-10 lg:px-20 py-3 border-b bg-(--background-color) sticky top-0 z-40">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setOpenMenu(false)}
            className="text-xl md:text-3xl font-bold"
          >
            <span className="text-(--primary-button-color)">cart</span>verse
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 ">
            {MAIN_NAV.map((item) => (
              <NavLink
                key={item.key}
                to={`/products/${item.key}`}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 font-semibold text-(--secondary-text-color)"
                    : ""
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* More Dropdown */}
            <div className="relative group cursor-pointer">
              <p className="hover:text-(--secondary-text-color) hover:font-semibold">
                More
              </p>

              <div className="absolute hidden group-hover:flex flex-col bg-(--background-color) shadow-lg p-3 top-6 min-w-40">
                {MORE_NAV.map((item) => (
                  <NavLink
                    key={item.key}
                    to={`/products/${item.key}`}
                    className="border-b hover:text-(--secondary-text-color) hover:font-semibold"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <div
              ref={desktopSearchRef}
              className="relative flex items-center border-none rounded px-3 py-2 w-62.5 bg-(--secondary-accent-color)"
            >
              <Search size={18} />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/search/${input}`);
                    setInput("");
                  }
                }}
                className="w-full outline-none ml-2 text-sm"
                placeholder="Search for products..."
              />

              {searchLoading && (
                <div className="absolute top-full left-0 w-full bg-white p-3 shadow">
                  Searching...
                </div>
              )}

              {input && searchProducts.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchProducts.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                        setInput("");
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex gap-2">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-16 h-16 object-contain"
                        />
                        <p>{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="relative group cursor-pointer">
                <img src={user.picture} className="w-8 h-8 rounded-full" />

                <div className="absolute hidden group-hover:block">
                  <button
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                    className=" bg-red-700 px-3 py-2 cursor-pointer text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => loginWithRedirect()}
                className="flex flex-col items-center cursor-pointer"
              >
                <User size={18} />
                <p className="text-xs font-semibold">Profile</p>
              </div>
            )}

            <NavLink to="/wishlist">
              <div
                onClick={() => navigate(`/wishlist`)}
                className="flex flex-col items-center"
              >
                <Heart size={18} />
                <p className="text-xs font-semibold">Wishlist</p>
              </div>
            </NavLink>
            <NavLink to="/cart">
              <div className="relative flex flex-col items-center">
                <Handbag size={18} />

                {totalQty > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalQty}
                  </span>
                )}

                <p className="text-xs font-semibold">Bag</p>
              </div>
            </NavLink>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <div
              ref={mobileSearchRef}
              className="relative flex items-center bg-(--secondary-accent-color) px-2 py-1"
            >
              <Search />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/search/${input}`);
                    setInput("");
                  }
                }}
                className="w-full outline-none ml-2 text-sm"
                placeholder="Search for products..."
              />
              {input && searchProducts.length > 0 && (
                <div className="absolute top-full w-full bg-white shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchProducts.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                        setInput("");
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex gap-2">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-16 h-16 object-contain"
                        />
                        <p>{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => setOpenMenu(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* SIDE DRAWER */}
      {openMenu && (
        <div className="fixed top-0 right-0 w-3/4 h-full bg-white z-50 shadow-lg p-5 overflow-y-auto">
          <div className="flex justify-between border-b py-2">
            <h1 className="font-semibold">Categories</h1>
            <button onClick={() => setOpenMenu(false)}>
              <X />
            </button>
          </div>

          {/* Main */}
          <div className="mt-2 flex flex-col gap-2">
            {MAIN_NAV.map((item) => (
              <NavLink
                key={item.key}
                to={`/products/${item.key}`}
                onClick={() => setOpenMenu(false)}
                className="hover:text-(--secondary-text-color) hover:font-semibold"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* More */}
          <div className="flex flex-col gap-2">
            {MORE_NAV.map((item) => (
              <NavLink
                key={item.key}
                to={`/products/${item.key}`}
                onClick={() => setOpenMenu(false)}
                className="hover:text-(--secondary-text-color) hover:font-semibold"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM NAV (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex items-center justify-around py-2 md:hidden z-40">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-(--secondary-text-color) border-none" : ""
          }
        >
          <Home />
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "text-(--secondary-text-color) border-none" : ""
          }
        >
          <Heart />
        </NavLink>
        <NavLink to="/cart">
          <div className="relative flex flex-col items-center">
            <Handbag size={18} />

            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}

            <p className="text-xs font-semibold">Bag</p>
          </div>
        </NavLink>

        {user ? (
          <div className="flex items-center gap-1">
            <img src={user.picture} className="w-6 h-6 rounded-full" />

            <button
              onClick={() =>
                logout({
                  logoutParams: { returnTo: window.location.origin },
                })
              }
              className=" bg-red-700 px-1 py-1 cursor-pointer text-white rounded text-xs tracking-tighter active:scale-95"
            >
              Logout
            </button>
          </div>
        ) : (
          <div onClick={() => loginWithRedirect()} className="cursor-pointer">
            <User />
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
