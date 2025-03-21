import {
  IconGeneral,
  IconLocation,
  IconTime,
  IconTimezone,
} from "../icons/icons";

export const getLocalTime = (timezone?: string): string => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTabs = (selectedAirport: any) => [
  {
    label: "General",
    cards: [
      {
        label: "General",
        "Código IATA": selectedAirport?.iata_code,
        "Código ICAO": selectedAirport?.icao_code,
        País: selectedAirport?.country_name,
        Ciudad: selectedAirport?.city_iata_code,
        Teléfono: selectedAirport?.phone_number,
        icon: IconGeneral,
      },
    ],
  },
  {
    label: "Ubicación",
    cards: [
      {
        label: "Ubicación",
        Latitud: selectedAirport?.latitude,
        Longitud: selectedAirport?.longitude,
        "Geoname ID": selectedAirport?.geoname_id,
        icon: IconLocation,
        isMap: true,
      },
    ],
  },
  {
    label: "Zona Horaria",
    cards: [
      {
        label: "Zona Horaria",
        "Zona Horaria": selectedAirport?.timezone,
        GMT: selectedAirport?.geoname_id,
        icon: IconTimezone,
      },
      {
        label: "Hora",
        Hora: getLocalTime(selectedAirport?.timezone),
        icon: IconTime,
      },
    ],
  },
  {
    label: "Estadísticas",
    cards: [
      {
        label: "Estadísticas",
        "Número de vuelos": 0,
        "Número de rutas": 0,
        "Número de aerolíneas": 0,
      },
    ],
  },
];
