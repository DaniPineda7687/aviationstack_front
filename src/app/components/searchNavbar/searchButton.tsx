import React from "react";
import useSearchStore from "@/app/store/useSearchStore";
import { useRouter } from "next/navigation";

interface SearchButtonProps {
  variant?: "default" | "small";
}

const SearchButton: React.FC<SearchButtonProps> = ({ variant = "default" }) => {
  const { searchQuery } = useSearchStore();
  const router = useRouter();

  const handleSearch = () => {
    if(searchQuery === "") {
      router.push("/airports");
      return;
    };
    router.push(`/airports?name=${searchQuery}`);
  };

  const baseClasses =
    "border border-white cursor-pointer font-semibold rounded-xl bg-gradient-to-r from-[#006AFF] to-[#00F9FF] hover:opacity-80 transition-all shadow-md flex items-center gap-2";

  const defaultClasses = "px-16 py-2 text-white text-sm sm:text-lg";
  const smallClasses = "px-4 text-white text-xs sm:text-sm";

  const variantClasses = variant === "default" ? defaultClasses : smallClasses;

  return (
    <button onClick={handleSearch} className={`${baseClasses} ${variantClasses}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>
      Buscar
    </button>
  );
};

export default SearchButton;