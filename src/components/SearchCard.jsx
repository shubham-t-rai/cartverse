import { Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../redux/features/wishlistSlice";
import useWishlist from "../hooks/useWishlist";

const SearchCard = ({product}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isWishlisted } = useWishlist(product.id);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="hover:shadow-xl md:hover:shadow-2xl p-3 md:p-4 bg-white rounded flex flex-col h-full transition"
    >
      <div className="w-full h-32 sm:h-40 md:h-48 flex items-center justify-center bg-gray-100 rounded">
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h1 className="mt-2 text-xs sm:text-sm md:text-base font-semibold line-clamp-2 min-h-10 sm:min-h-12">
        {product?.title}
      </h1>

      <div className="mt-auto">
        <p className="mt-1 text-sm md:text-base font-bold">${product?.price}</p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToWishlist(product));
          }}
          className="mt-2 md:mt-3 w-full bg-white text-black border border-(--primary-accent-color) py-1.5 md:py-2 text-xs sm:text-sm uppercase font-semibold flex items-center justify-center gap-2 active:scale-95 transition rounded"
        >
          <Heart
            size={14}
            fill={isWishlisted ? "red" : "none"}
            color={isWishlisted ? "red" : "black"}
          />
          wishlist
        </button>
      </div>
    </div>
  );
};

export default SearchCard;
