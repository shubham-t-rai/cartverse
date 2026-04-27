import React, { useEffect } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const Home = () => {
  const { loading, error, fetchAllProducts } = useProducts();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Hero />
      <ProductCard />
    </>
  );
};

export default Home;
