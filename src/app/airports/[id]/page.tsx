"use client";

import React, { use, useEffect } from "react";
import useAirportStore from "@/app/store/airportStore";
import Title from "@/app/components/title";
import Tabs from "@/app/components/tabs/Tabs";
import {
  IconGeneral,
  IconLocation,
  IconTime,
  IconTimezone,
} from "@/app/icons/icons";
import { getLocalTime } from "@/app/utils/utils";

export default function AirportDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { setSelectedAirport, selectedAirport, loading, error } =
    useAirportStore();
  const tabs = [
    {
      label: "General",
      cards: [
        {
          label: "General",

          "Código IATA": selectedAirport?.iata_code,
          "Código ICAO": selectedAirport?.icao_code,
          País: selectedAirport?.country_name,
          Ciudad: selectedAirport?.city_iata_code,
          Teléfono: selectedAirport?.phone_number,
          icon: <IconGeneral />,
        },
      ],
    },
    {
      label: "Ubicación",
      cards: [
        {
          label: "Ubicación",

          Latitud: selectedAirport?.latitude,
          Longitud: selectedAirport?.longitude,
          "Geoname ID": selectedAirport?.geoname_id,
          icon: <IconLocation />,
        },
      ],
    },
    {
      label: "Zona Horaria",
      cards: [
        {
          label: "Zona Horaria",
          "Zona Horaria": selectedAirport?.timezone,
          GMT: selectedAirport?.geoname_id,
          icon: <IconTimezone />,
        },
        {
          label: "Hora",
          "Hora": getLocalTime(selectedAirport?.timezone),
          icon: <IconTime />,
        },
      ],
    },
    {
      label: "Estadísticas",
      cards: [
        {
          label: "Estadísticas",
          "Número de vuelos": 0,
          "Número de rutas": 0,
          "Número de aerolíneas": 0,
        },
      ],
    },
  ];
  const { id } = use(params);
  useEffect(() => {
    setSelectedAirport(id);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {selectedAirport ? (
        <div>
          <Title variant="large" className="text-center my-6">
            {selectedAirport.airport_name}
          </Title>
          <div className="flex justify-center">
            <Tabs tabs={tabs} />
          </div>
        </div>
      ) : (
        <p>No se encontró el aeropuerto</p>
      )}
    </div>
  );
}
