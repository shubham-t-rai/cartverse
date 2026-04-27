import { Handbag, Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../redux/features/wishlistSlice";
import useWishlist from "../hooks/useWishlist";
import { addToCart } from "../redux/features/cardSlice";

const Hero = () => {
  const { products } = useProducts();

  const [currentIndex, setCurrentIndex] = useState(0);
  const product = products.slice(0, 5);
  const currentProduct = product[currentIndex];

  const { isWishlisted } = useWishlist(currentProduct?.id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === product.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [product.length]);

  return (
    <section
      onClick={() => navigate(`/product/${currentProduct.id}`)}
      className="bg-black text-white py-10 md:h-[75vh] flex items-center"
    >
      <div className="w-full flex md:flex-row items-center justify-between px-5 md:px-10 lg:px-20 gap-8">
        <div className="w-full md:max-w-xl">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold line-clamp-2">
            {currentProduct?.title}
          </h1>

          <p className="text-xs sm:text-sm mt-2 text-gray-300 line-clamp-3">
            {currentProduct?.description}
          </p>

          <p className="mt-2 text-sm">⭐ {currentProduct?.rating}</p>
          <p className="mt-1 text-lg font-semibold">${currentProduct?.price}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart(currentProduct));
              }}
              className="bg-(--secondary-text-color) px-4 py-2 text-xs sm:text-sm md:text-base uppercase font-semibold flex items-center gap-2 rounded active:scale-95 transition"
            >
              <Handbag size={16} />
              Add to bag
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToWishlist(currentProduct));
              }}
              className="bg-white text-black border border-(--primary-accent-color) px-4 py-2 text-xs sm:text-sm md:text-base uppercase font-semibold flex items-center gap-2 rounded active:scale-95 transition"
            >
              <Heart
                size={16}
                fill={isWishlisted ? "red" : "none"}
                color={isWishlisted ? "red" : "black"}
              />
              Wishlist
            </button>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-72 md:h-72 lg:w-96 lg:h-96 flex items-center justify-center bg-white/10 rounded-xl">
            <img
              src={currentProduct?.thumbnail}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
