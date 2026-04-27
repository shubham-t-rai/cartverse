import { useSelector } from "react-redux";

const useWishlist = (productId) => {
  const items = useSelector((state) => state.wishlist.items);

  const isWishlisted = items.some(
    (item) => item.id === productId
  );

  return { isWishlisted, items };
};

export default useWishlist;