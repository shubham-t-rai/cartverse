import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeFromWishlist } from "../redux/features/wishlistSlice";

const Wishlist = () => {
  const { items } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <section className="px-4 sm:px-6 md:px-10 py-5">
      {/* Empty Wishlist */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h2 className="text-lg sm:text-xl font-semibold">
            Your wishlist is empty 💔
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Save items you like and view them here.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-5 bg-(--secondary-text-color) text-white px-5 py-3 rounded font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((product) => (
            <div
              key={product?.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-lg p-3 sm:p-4 shadow hover:shadow-xl transition cursor-pointer flex flex-col"
            >
              {/* Product Image */}
              <div className="w-full h-32 sm:h-40 md:h-48 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                <img
                  src={product?.thumbnail}
                  alt={product?.title}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition"
                />
              </div>

              {/* Product Title */}
              <h2 className="mt-3 text-xs sm:text-sm md:text-base font-semibold line-clamp-2 min-h-10 sm:min-h-12">
                {product?.title}
              </h2>

              {/* Price */}
              <p className="mt-2 text-sm sm:text-base font-bold">
                ${product?.price}
              </p>

              {/* Buttons */}
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-full bg-(--secondary-text-color) text-white px-4 py-2 text-xs sm:text-sm uppercase font-semibold flex items-center justify-center gap-2 rounded active:scale-95 transition"
                >
                  Add to Bag
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeFromWishlist(product.id));
                  }}
                  className="w-full border border-(--primary-accent-color) px-4 py-2 text-xs sm:text-sm uppercase font-semibold rounded active:scale-95 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
