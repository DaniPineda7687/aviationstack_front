"use client"
import React from "react";
import useSearchStore from "@/app/store/useSearchStore";
import { useSearchParams } from "next/navigation";

interface SearchInputProps {
  variant?: "default" | "small";
}

const SearchInput: React.FC<SearchInputProps> = ({ variant = "default" }) => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const params = useSearchParams();
  const querySearch = params.get("name") || "";

  const baseClasses =
    "bg-white text-blue-500 focus:outline-none rounded-full w-10/12";

  const defaultClasses = "py-4 px-6 text-lg sm:text-xl";
  const smallClasses = "py-2 px-3 text-md sm:text-md";

  const variantClasses = variant === "default" ? defaultClasses : smallClasses;

  return (
    <input
      type="text"
      value={searchQuery || querySearch}
      onChange={(e) => setSearchQuery(e.target.value)}
      className={`${baseClasses} ${variantClasses}`}
      placeholder="Buscar aeropuertos..."
    />
  );
};

export default SearchInput;