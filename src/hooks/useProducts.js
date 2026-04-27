import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setSearchLoading,
  setProducts,
  setError,
  setSearchProducts,
  setSingleProduct,
} from "../redux/features/productSlice";
import {
  getAllProducts,
  getProductsByCategory,
  getProductsBySearch,
  getProductById,
} from "../services/products.api";
import { CATEGORY_GROUPS } from "../constants/categoryGroups";

export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, searchProducts, singleProduct, loading, searchLoading, error } =
    useSelector((state) => state.products);

  const fetchAllProducts = async () => {
    try {
      dispatch(setLoading());
      const data = await getAllProducts();
      dispatch(setProducts(data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const fetchByCategory = async (cat) => {
    try {
      dispatch(setLoading());
      const data = await getProductsByCategory(cat);
      dispatch(setProducts(data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const fetchGroupCategory = async (groupKey) => {
    try {
      dispatch(setLoading());

      const group = CATEGORY_GROUPS[groupKey];

      if (!group) return;

      const results = await Promise.all(
        group.map((cat) => getProductsByCategory(cat)),
      );

      const merged = results.flat();

      dispatch(setProducts(merged));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const fetchSearchProducts = async (query) => {
    try {
      dispatch(setSearchLoading());

      const data = await getProductsBySearch(query);
      dispatch(setSearchProducts(data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const fetchSingleProduct = async (id) => {
    try {
      dispatch(setLoading());
      const data = await getProductById(id);
      dispatch(setSingleProduct(data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return {
    products,
    searchProducts,
    singleProduct,
    loading,
    searchLoading,
    error,
    fetchAllProducts,
    fetchByCategory,
    fetchGroupCategory,
    fetchSearchProducts,
    fetchSingleProduct,
  };
};
