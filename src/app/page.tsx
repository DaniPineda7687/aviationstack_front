"use client";
import SearchInput from "./components/searchNavbar/searchInput";
import SearchButton from "./components/searchNavbar/searchButton";
import Title from "./components/title";
import HistoryButton from "./components/searchNavbar/historyButton";

export default function Home() {
  return (
    <div className="p-2">
      <div className="flex flex-col items-center">
        <div className="my-24 sm:my-32">
          <Title variant="large" className="text-center">
            SkyConnect Explorer
          </Title>
        </div>
        <SearchInput />
        <br />
        <div className="flex gap-2 flex-wrap justify-center">
          <SearchButton />
          <HistoryButton />
        </div>
      </div>
    </div>
  );
}
