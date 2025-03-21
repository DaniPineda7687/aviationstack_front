import { Card } from "@/app/types/tab";
import AirportInformationCard from "../airportInformationCard";
interface TabsProps {
  cards: Card[];
}

const TabContent: React.FC<TabsProps> = ({ cards }) => {
  return (
    <div>
      {cards.map((card, index) => {
        return <AirportInformationCard key={index} information={card} />;
      })}
    </div>
  );
};

export default TabContent;
