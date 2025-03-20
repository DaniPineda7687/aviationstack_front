"use client"
import useSearchStore from "@/app/store/useSearchStore";
import React from "react";

const SearchInput: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="bg-white text-blue-500 py-4 px-6 text-lg focus:outline-none rounded-full w-10/12 sm:text-xl"
      placeholder="Buscar aeropuertos..."
    />
  );
};

export default SearchInput;