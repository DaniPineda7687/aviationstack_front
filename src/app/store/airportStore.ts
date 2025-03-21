// store/airportStore.ts
import axios from "axios";
import { create } from "zustand";

export interface Airport {
  airport_name: string;
  iata_code: string;
  icao_code: string;
  latitude: string;
  longitude: string;
  geoname_id: string;
  timezone: string;
  gmt: string;
  phone_number: string | null;
  country_name: string;
  country_iso2: string;
  city_iata_code: string;
}

export interface Pagination {
  offset: number;
  limit: number;
  count: number;
  total: number;
}

interface AirportStore {
  pages: { [offset: number]: Airport[] };
  selectedAirport: Airport | null;
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  fetchAirports: (params?: { offset?: number; limit?: number }) => Promise<void>;
  setSelectedAirport: (iataCode: string) => void;
  getAirportByIataCode: (iataCode: string) => Airport | undefined;
  clearAirports: () => void;
}

const loadFromStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedData = localStorage.getItem("airportData");
    if (storedData) {
      return JSON.parse(storedData);
    }
  }
  return { pages: {}, pagination: { offset: 0, limit: 6, count: 0, total: 0 }, selectedAirport: null };
};

const useAirportStore = create<AirportStore>((set, get) => {
  const storedState = loadFromStorage();

  return {
    pages: storedState.pages,
    selectedAirport: storedState.selectedAirport,
    pagination: storedState.pagination,
    loading: false,
    error: null,

    fetchAirports: async (params = {}) => {
      const { offset = 0 } = params;

      if (get().pages[offset]) return;

      set({ loading: true, error: null });

      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_AVIATIONSTACK_BASE_URL || '', {
          params: {
            access_key: process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY,
            ...params,
          },
        });

        const newState = {
          pages: { ...get().pages, [offset]: response.data.data },
          pagination: response.data.pagination,
          loading: false,
        };

        set(newState);

        localStorage.setItem("airportData", JSON.stringify(newState));

      } catch (err) {
        set({
          error: err instanceof Error ? err.message : "An error occurred",
          loading: false,
        });
      }
    },

    setSelectedAirport: (iataCode) => {
      const airport = get().getAirportByIataCode(iataCode);
      set({ selectedAirport: airport || null });
    },

    getAirportByIataCode: (iataCode) => {
      const airports = Object.values(get().pages).flat();
      return airports.find((airport) => airport.iata_code === iataCode);
    },

    clearAirports: () => {
      set({ pages: {}, selectedAirport: null });
      localStorage.removeItem("airportData");
    },
  };
});

export default useAirportStore;