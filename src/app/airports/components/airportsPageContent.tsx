"use client";
import Pagination from "@/app/components/pagination";
import SearchInput from "@/app/components/searchNavbar/searchInput";
import Title from "@/app/components/title";
import useAirportStore, { Airport } from "@/app/store/airportStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AirportsGrid from "./airportsGrid";
import SearchButton from "@/app/components/searchNavbar/searchButton";

const AirportsPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchParam = searchParams.get("name") || "";

  const { airports, loading, error, fetchAirports, pagination } = useAirportStore();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = pagination.limit || 6;

  useEffect(() => {
    if (!searchParam && airports.length === 0) {
      fetchAirports({ offset: 0, limit: pageSize });
    }
    setCurrentPage(1);
  }, [searchParam]);

  const filteredAirports: Airport[] = searchParam
    ? airports.filter(
        (airport) =>
          airport.airport_name.toLowerCase().includes(searchParam.toLowerCase()) ||
          airport.iata_code.toLowerCase().includes(searchParam.toLowerCase())
      )
    : airports;

  const displayedAirports = filteredAirports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = async (newPage: number) => {
    if (
      !searchParam &&
      (newPage - 1) * pageSize >= airports.length &&
      airports.length < pagination.total
    ) {
      await fetchAirports({ offset: airports.length, limit: pageSize });
    }
    setCurrentPage(newPage);
  };

  const totalItems = searchParam ? filteredAirports.length : pagination.total;

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

export default AirportsPageContent;