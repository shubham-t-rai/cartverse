import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useProducts } from "../hooks/useProducts";
import SearchCard from "./SearchCard";

const SearchResults = () => {
  const { search } = useParams();
  const { searchProducts, fetchSearchProducts } = useProducts();

  useEffect(() => {
    fetchSearchProducts(search);
  }, [search]);

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5 px-4 sm:px-6 md:px-10 py-4 auto-rows-fr">
      {searchProducts.map((product) => (
        <SearchCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default SearchResults;
