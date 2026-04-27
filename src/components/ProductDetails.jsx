import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useProducts } from "../hooks/useProducts";
import { Handbag, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../redux/features/wishlistSlice";
import useWishlist from "../hooks/useWishlist";
import { addToCart } from "../redux/features/cardSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { fetchSingleProduct, singleProduct, loading } = useProducts();

  const dispatch = useDispatch();

  const { isWishlisted } = useWishlist(singleProduct?.id);

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-14 h-14 border-[6px] border-gray-300 border-t-(--primary-button-color) rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-6 mb-5">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3">
          {singleProduct?.images?.map((img, index) => (
            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={img}
                alt={singleProduct?.title}
                className="w-full h-40 sm:h-52 md:h-64 object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div>
            <p className="text-sm sm:text-base text-gray-500 uppercase font-medium">
              {singleProduct?.brand}
            </p>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">
              {singleProduct?.title}
            </h1>

            <p className="mt-2 text-sm sm:text-base">
              ⭐ {singleProduct?.rating}
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold">
            ${singleProduct?.price}
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {singleProduct?.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button 
            onClick={()=>dispatch(addToCart(singleProduct))}
            className="w-full sm:w-auto bg-(--secondary-text-color) text-white px-5 py-3 text-sm sm:text-base uppercase font-semibold flex items-center justify-center gap-2 rounded active:scale-95 transition">
              <Handbag size={18} />
              Add to Bag
            </button>

            <button
              disabled={!singleProduct?.id}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToWishlist(singleProduct));
              }}
              className="w-full sm:w-auto bg-white text-black border border-(--primary-accent-color) px-5 py-3 text-sm sm:text-base uppercase font-semibold flex items-center justify-center gap-2 rounded active:scale-95 transition"
            >
              <Heart
                size={18}
                fill={isWishlisted ? "red" : "none"}
                color={isWishlisted ? "red" : "black"}
              />
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
