"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Tab from "./Tab";
import TabContent from "./TabContent";
import { TabProps } from "@/app/types/tab";

interface TabsProps {
  tabs: TabProps[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabWidth = 100 / tabs.length;
  return (
    <div className="w-10/12">
      <div className="relative">
        <motion.div
          className="lg:absolute lg:bottom-0 lg:left-0 lg:h-1 lg:bg-blue-600 lg:z-10 lg:rounded-t-lg"
          initial={{ width: "0%", left: `${tabWidth * activeTab}%` }}
          animate={{
            width: `${tabWidth}%`,
            left: `${tabWidth * activeTab}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-1 bg-[#374053] p-4 my-2 rounded-lg relative z-0">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              index={index}
              isActive={activeTab === index}
              label={tab.label}
              onClick={handleTabClick}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="tab-content"
      >
        <TabContent cards={tabs[activeTab].cards} />
      </motion.div>
    </div>
  );
};

export default Tabs;
