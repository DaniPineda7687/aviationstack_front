"use client";

import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import useAirportStore from "@/app/store/airportStore";
import { useEffect, useState } from "react";
import Loader from "../components/loader";

export default function LayoutAirports({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { pages, loading, error, fetchAirports, pagination } = useAirportStore();

  const [storedData] = useLocalStorage("airportData", {
    pages: {},
    pagination: { offset: 0, limit: 6, count: 0, total: 0 },
    selectedAirport: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  console.log(storedData);
  useEffect(() => {
    console.log(1);
    if (storedData.pages && Object.keys(storedData.pages).length && storedData.pagination) {
      useAirportStore.setState({
        pages: storedData.pages,
        pagination: storedData.pagination,
      });
      if (storedData.selectedAirport) {
        useAirportStore.setState({ selectedAirport: storedData.selectedAirport });
      }
    }
    setIsLoading(false); 
  }, [storedData]);

  if (isLoading) {
    return <div className="flex justify-center items-center">
      <Loader />;
      
      </div>
  }

  return <div>{children}</div>;
}