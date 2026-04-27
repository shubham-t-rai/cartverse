import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_DUMMY_JSON,
});

export const getAllProducts = async () => {
  const res = await api.get(`/products`);
  return res.data.products;
};

export const getProductsByCategory = async (query) => {
  const res = await api.get(`/products/category/${query}`);
  return res.data.products;
};

export const getProductsBySearch = async (query) => {
  const res = await api.get(`/products/search?q=${query}`);
  return res.data.products;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
}