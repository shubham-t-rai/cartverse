import React, { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useParams } from "react-router";
import { CATEGORY_GROUPS } from "../constants/categoryGroups";
import SingleCard from "./SingleCard";

const ProductCard = () => {
  const { category } = useParams();

  const { loading, products, fetchGroupCategory, fetchByCategory } =
    useProducts();

  useEffect(() => {
    if (!category) return;

    if (CATEGORY_GROUPS[category]) {
      fetchGroupCategory(category);
    } else {
      fetchByCategory(category);
    }
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-15 h-15 border-[6px] border-gray-300 border-t-(--primary-button-color) rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5 px-4 sm:px-6 md:px-10 py-4 auto-rows-fr mb-5">
      {products.map((product) => (
        <SingleCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductCard;
