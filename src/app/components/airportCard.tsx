import Image from "next/image";
import { Airport } from "@/app/store/airportStore";
import Title from "./title";
import { useRouter } from "next/navigation";

interface AirportCardProps {
  airport: Airport;
}

const AirportCard: React.FC<AirportCardProps> = ({ airport }) => {
  const router = useRouter();
  return (
    <div className="cursor-pointer relative rounded-lg shadow-md border border-white overflow-hidden p-8 transition-all duration-300 hover:brightness-70 hover:shadow-xl" onClick={() => router.push(`/airports/${airport.iata_code}`)}>
      <div className="block sm:hidden absolute inset-0 bg-gradient-to-r from-[#363F53] to-[#1B2439]" />
      <div className="hidden sm:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#363F53] to-[#1B2439]" />
      <div
        className="hidden sm:block absolute inset-y-0 right-0 w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/plane_card.jpeg')" }}
      >
        <div className="absolute inset-0 bg-[#1B2439] opacity-90" />
      </div>
      <div className="relative flex justify-between">
        <div>
          <h2 className="text-lg text-white font-semibold">
            {airport.airport_name}
          </h2>
          <p className="text-white font-light text-md">
            {airport.country_name}
          </p>
        </div>
        <div>
          <Image src="/plane_icon.png" alt="" width={30} height={30} />
        </div>
      </div>

      <div className="relative mt-8">
        <Title variant="medium" className="font-extrabold">
          {airport.iata_code}
        </Title>
      </div>
    </div>
  );
};

export default AirportCard;