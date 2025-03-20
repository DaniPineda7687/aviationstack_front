"use client";
import { useEffect } from "react";
import useAirportStore from "./store/airportStore";
import SearchInput from "./components/searchNavbar/searchInput";
import SearchButton from "./components/searchNavbar/searchButton";

export default function Home() {
  const { airports, loading, error, fetchAirports } = useAirportStore();

  useEffect(() => {
    fetchAirports({ limit: 100 });
  }, [fetchAirports]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-2">
      <div className="flex flex-col items-center">
        <h1 className="my-24 text-4xl leading-14 text-center font-extrabold bg-gradient-to-r from-[#006AFF] to-[#00F9FF] bg-clip-text text-transparent sm:text-6xl sm:leading-28 md:text-9xl md:leading-36 sm:my-32">
          SkyConnect Explorer
        </h1>

        <SearchInput />
        <br />
        <SearchButton />
      </div>
    </div>
  );
}
