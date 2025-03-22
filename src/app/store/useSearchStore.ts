import { create } from "zustand";
interface SearchEntry {
  query: string;
  timestamp: string;
}

interface SearchStore {
  searchQuery: string;
  searchHistory: SearchEntry[];
  setSearchQuery: (query: string) => void;
  addSearchToHistory: (query: string) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: "",
  searchHistory: [],
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  addSearchToHistory: (query: string) =>
    set((state) => {
      const entry: SearchEntry = {
        query,
        timestamp: new Date().toISOString(),
      };
      const newHistory = [entry, ...state.searchHistory].slice(0, 5);
      return { searchHistory: newHistory };
    }),
}));

export default useSearchStore;