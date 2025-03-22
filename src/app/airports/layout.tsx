"use client";

import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import useAirportStore from "@/app/store/airportStore";
import { Suspense, useEffect, useState } from "react";
import Loader from "../components/loader";

export default function LayoutAirports({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [storedData] = useLocalStorage("airportData", {
    pages: {},
    pagination: { offset: 0, limit: 6, count: 0, total: 0 },
    selectedAirport: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (storedData.pages && Object.keys(storedData.pages).length && storedData.pagination) {
      setIsLoading(true);
      useAirportStore.setState({
        pages: storedData.pages,
        pagination: storedData.pagination,
      });
      if (storedData.selectedAirport) {
        useAirportStore.setState({ selectedAirport: storedData.selectedAirport });
      }
      setIsLoading(false); 
    }
  }, [storedData]);

  if (isLoading) {
    return <div className="flex justify-center items-center">
        <Loader />;
      </div>
  }

  return <Suspense>{children}</Suspense>;
}