import Title from "./title";
import { Card } from "../types/tab";

interface AirportInformationCardProps {
  information: Card;
}

const AirportInformationCard: React.FC<AirportInformationCardProps> = ({
  information,
}) => {
  return (
    <div className="cursor-pointer relative my-4 rounded-lg shadow-md border border-white overflow-hidden p-8 transition-all duration-300 hover:brightness-70 hover:shadow-xl">
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
            <div className="flex gap-2 mb-7 items-center">
            <div>{information.icon}</div>
          <Title variant="medium" className="font-extrabold">
            {information.label}
          </Title>

            </div>
          <div>
            
            {Object.keys(information).map((key, index) => {
              if (key === "label" || key === "icon") return null;
              return (
                <p className="text-white" key={index}>
                    <span className="text-gray-400 font-extrabold">{key}: </span>{information[key]}
                </p>
              );
            })}

          </div>
        </div>
      </div>
        

      <div className="relative mt-8"></div>
    </div>
  );
};

export default AirportInformationCard;
