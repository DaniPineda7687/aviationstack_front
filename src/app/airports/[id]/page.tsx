"use client";

import React, { useEffect, useState } from "react";
import useAirportStore from "@/app/store/airportStore";
import Title from "@/app/components/title";
import Tabs from "@/app/components/tabs/Tabs";
import { createTabs } from "@/app/utils/utils";
import Loader from "@/app/components/loader";
import { useRouter } from "next/navigation";

export default function AirportDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { setSelectedAirport, selectedAirport, loading } = useAirportStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await params;
      if (id) {
        setSelectedAirport(id);
      }
    };

    fetchData();
  }, [params, setSelectedAirport]);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading, selectedAirport]);

  if (isLoading) return <Loader />;

  const tabs = selectedAirport ? createTabs(selectedAirport) : [];

  return (
    <div>
      <div className="pt-4 px-4 cursor-pointer" onClick={() => router.back()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#ffffff"
          className="bi bi-arrow-left-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
      </div>
      {selectedAirport ? (
        <div>
          <Title variant="large" className="text-center my-6">
            {selectedAirport.airport_name}
          </Title>
          <div className="flex justify-center mb-16">
            <Tabs tabs={tabs} />
          </div>
        </div>
      ) : (
        <p className="text-white text-center text-lg my-8">
          No se encontró el aeropuerto
        </p>
      )}
    </div>
  );
}
