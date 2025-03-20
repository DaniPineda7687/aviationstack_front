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
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  fetchAirports: (params?: { offset?: number; limit?: number }) => Promise<void>;
  clearAirports: () => void;
}

const useAirportStore = create<AirportStore>((set, get) => ({
  pages: {},
  pagination: { offset: 0, limit: 6, count: 0, total: 0 },
  loading: false,
  error: null,
  fetchAirports: async (params = {}) => {
    const { offset = 0 } = params;
    // Si ya se ha consultado esa página, no volvemos a pedirla
    if (get().pages[offset]) return;

    set({ loading: true, error: null });
    try {
      const defaultParams = { offset: 0, limit: 6 };
      const response = await axios.get("https://api.aviationstack.com/v1/airports", {
        params: {
          access_key: process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY,
          ...defaultParams,
          ...params,
        },
      });
      set((state) => ({
        pages: { ...state.pages, [offset]: response.data.data },
        pagination: response.data.pagination,
        loading: false,
      }));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "An error occurred",
        loading: false,
      });
    }
  },
  clearAirports: () => set({ pages: {} }),
}));

export default useAirportStore;