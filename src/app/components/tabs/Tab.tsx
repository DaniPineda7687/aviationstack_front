interface TabProps {
    index: number;
    label: string;
    isActive: boolean;
    onClick: (index: number) => void;
  }
  
  const Tab: React.FC<TabProps> = ({ index, label, isActive, onClick }) => {
    return (
      <div
        onClick={() => onClick(index)}
        className={`tab cursor-pointer font-bold text-center px-4 py-2 transition-all duration-300 rounded-lg ${
          isActive ? "bg-blue-600 text-white" : "text-[#727478]"
        }`}
      >
        {label}
      </div>
    );
  };
  
  export default Tab;