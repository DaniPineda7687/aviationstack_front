"use client";

import React, { useEffect, useState } from "react";
import useAirportStore from "@/app/store/airportStore";
import Title from "@/app/components/title";
import Tabs from "@/app/components/tabs/Tabs";
import { createTabs } from "@/app/utils/utils";
import Loader from "@/app/components/loader";

export default function AirportDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { setSelectedAirport, selectedAirport, loading } =
    useAirportStore();
  
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
        <p className="text-white text-center text-lg my-8">No se encontró el aeropuerto</p>
      )}
    </div>
  );
}