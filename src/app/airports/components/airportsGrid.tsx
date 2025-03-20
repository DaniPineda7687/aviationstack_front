import React from "react";
import { Airport } from "@/app/store/airportStore";
import Loader from "@/app/components/loader";
import AirportCard from "@/app/components/airportCard";

interface AirportsGridProps {
  filteredAirports: Airport[];
  loading: boolean;
}

const AirportsGrid: React.FC<AirportsGridProps> = ({ filteredAirports, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px]">
        <Loader />
      </div>
    );
  }

  return filteredAirports.length === 0 ? (
    <div className="flex justify-center items-center h-full min-h-[300px]">
        <p>No se encontraron aeropuertos</p>
    </div>
  ) : (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {filteredAirports.map((airport) => (
        <AirportCard key={`${airport.airport_name}_${airport.iata_code}`} airport={airport} />
      ))}
    </div>
  );
};

export default AirportsGrid;