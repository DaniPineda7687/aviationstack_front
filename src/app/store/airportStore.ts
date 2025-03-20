// store/airportStore.ts

import axios from 'axios';
import { create } from 'zustand';

interface Airport {
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

interface AirportStore {
  airports: Airport[];
  loading: boolean;
  error: string | null;
  fetchAirports: (params?: object) => Promise<void>;
}

const useAirportStore = create<AirportStore>((set) => ({
  airports: [],
  loading: false,
  error: null,
  fetchAirports: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('https://api.aviationstack.com/v1/airports', {
        params: {
          access_key: process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY,
          ...params,
        },
      });
      set({ airports: response.data.data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'An error occurred',
        loading: false,
      });
    }
  },
}));

export default useAirportStore;