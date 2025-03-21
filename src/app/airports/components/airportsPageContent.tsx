"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AirportsGrid from "../components/airportsGrid";
import useAirportStore, { Airport } from "@/app/store/airportStore";
import Title from "@/app/components/title";
import SearchInput from "@/app/components/searchNavbar/searchInput";
import SearchButton from "@/app/components/searchNavbar/searchButton";
import Pagination from "@/app/components/pagination";

const AirportsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchParam = searchParams.get("name") || "";
  
  const { pages, loading, error, fetchAirports, pagination } = useAirportStore();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = pagination.limit || 6;
  const currentOffset = (currentPage - 1) * pageSize;
  
  useEffect(() => {
    setCurrentPage(1);
    if (!searchParam && !pages[0]) {
      fetchAirports({ offset: 0, limit: pageSize });
    }
  }, [searchParam]);

  let displayedAirports: Airport[] = [];
  if (searchParam) {
    const allAirports = Object.values(pages).flat();
    displayedAirports = allAirports.filter(
      (airport) =>
        airport.airport_name.toLowerCase().includes(searchParam.toLowerCase()) ||
        airport.iata_code.toLowerCase().includes(searchParam.toLowerCase())
    );
  } else {
    displayedAirports = pages[currentOffset] || [];
  }

  const totalItems = searchParam ? displayedAirports.length : pagination.total;

  const handlePageChange = async (newPage: number) => {
    const newOffset = (newPage - 1) * pageSize;
    if (!searchParam && !pages[newOffset] && newOffset < pagination.total) {
      await fetchAirports({ offset: newOffset, limit: pageSize });
    }
    setCurrentPage(newPage);
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 gap-2 grid-rows-2 md:grid-cols-6">
        <div className="col-span-1 md:col-span-3 justify-self-center md:justify-self-start">
          <Title variant="medium" onClick={() => router.push("/")}>
            SkyConnect Explorer
          </Title>
        </div>
        <div className="row-start-2 md:row-start-1 md:col-start-4 md:col-span-3 gap-2 flex justify-end">
          <SearchInput variant="small" />
          <SearchButton variant="small" />
        </div>
      </div>
      <AirportsGrid filteredAirports={displayedAirports} loading={loading} />
      <br/>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
    </div>
  );
};

export default AirportsPage;