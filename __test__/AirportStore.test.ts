import useAirportStore from '../src/app/store/airportStore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Pruebas de integración para airportStore', () => {
  let mock: MockAdapter;

  const mockResponse = {
    pagination: {
      offset: 0,
      limit: 6,
      count: 6,
      total: 6710
    },
    data: [
      {
        id: "3158311",
        gmt: "-10",
        airport_id: "1",
        iata_code: "AAA",
        city_iata_code: "AAA",
        icao_code: "NTGA",
        country_iso2: "PF",
        geoname_id: "6947726",
        latitude: "-17.05",
        longitude: "-145.41667",
        airport_name: "Anaa",
        country_name: "French Polynesia",
        phone_number: null,
        timezone: "Pacific/Tahiti"
      },
      {
        id: "3158312",
        gmt: "10",
        airport_id: "2",
        iata_code: "AAB",
        city_iata_code: "AAB",
        icao_code: "YARY",
        country_iso2: "AU",
        geoname_id: "7730796",
        latitude: "-26.7",
        longitude: "141.04167",
        airport_name: "Arrabury",
        country_name: "Australia",
        phone_number: null,
        timezone: "Australia/Brisbane"
      },
      {
        id: "3158313",
        gmt: "2",
        airport_id: "3",
        iata_code: "AAC",
        city_iata_code: "AAC",
        icao_code: "HEAR",
        country_iso2: "EG",
        geoname_id: "6297289",
        latitude: "31.133333",
        longitude: "33.75",
        airport_name: "El Arish International Airport",
        country_name: "Egypt",
        phone_number: null,
        timezone: "Africa/Cairo"
      },
      {
        id: "3158314",
        gmt: "1",
        airport_id: "4",
        iata_code: "AAE",
        city_iata_code: "AAE",
        icao_code: "DABB",
        country_iso2: "DZ",
        geoname_id: "2570559",
        latitude: "36.821392",
        longitude: "7.811857",
        airport_name: "Les Salines",
        country_name: null,
        phone_number: null,
        timezone: "Africa/Algiers"
      },
      {
        id: "3158315",
        gmt: "-5",
        airport_id: "5",
        iata_code: "AAF",
        city_iata_code: "AAF",
        icao_code: "KAAF",
        country_iso2: "US",
        geoname_id: "4146153",
        latitude: "29.733334",
        longitude: "-84.98333",
        airport_name: "Apalachicola Regional",
        country_name: "United States",
        phone_number: null,
        timezone: "America/New_York"
      },
      {
        id: "3158316",
        gmt: "-3",
        airport_id: "6",
        iata_code: "AAG",
        city_iata_code: "AAG",
        icao_code: "SSYA",
        country_iso2: "BR",
        geoname_id: "3471795",
        latitude: "-24.103611",
        longitude: "-49.79",
        airport_name: "Arapoti",
        country_name: "Brazil",
        phone_number: null,
        timezone: "America/Sao_Paulo"
      }
    ]
  };

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    useAirportStore.getState().clearAirports();
  });

  afterAll(() => {
    mock.restore();
  });

  test('fetchAirports actualiza el estado correctamente con la respuesta de la API', async () => {
    mock.onGet(process.env.NEXT_PUBLIC_AVIATIONSTACK_BASE_URL || '').reply(200, mockResponse);

    await useAirportStore.getState().fetchAirports({ offset: 0, limit: 6 });

    const state = useAirportStore.getState();

    expect(state.pages[0]).toEqual(mockResponse.data);
    expect(state.pagination).toEqual(mockResponse.pagination);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('fetchAirports maneja errores correctamente', async () => {
    const errorMessage = 'Network Error';
    mock.onGet(process.env.NEXT_PUBLIC_AVIATIONSTACK_BASE_URL || '').networkError();

    await useAirportStore.getState().fetchAirports({ offset: 0, limit: 6 });

    const state = useAirportStore.getState();
    expect(state.error).toEqual(errorMessage);
    expect(state.loading).toBe(false);
  });
});