import { useRouter } from 'next/navigation';
import AirportCard from '../src/app/components/airportCard';
import { Airport } from '@/app/store/airportStore';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn().mockImplementation((url) => console.log('Navigating to:', url)),
  }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const mockAirport: Airport = {
  airport_name: 'John F. Kennedy International Airport',
  iata_code: 'JFK',
  country_name: 'United States',
  icao_code: 'KJFK',
  latitude: '40.6413',
  longitude: '-73.7781',
  geoname_id: '5110302',
  timezone: 'America/New_York',
  gmt: '-5',
  phone_number: '+1 718-244-4444',
  country_iso2: 'US',
  city_iata_code: 'NYC',
};

describe('AirportCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (customProps: Partial<Airport> = {}) => {
    const airport = { ...mockAirport, ...customProps };
    return render(<AirportCard airport={airport} />);
  };

  it('debería renderizar la información básica del aeropuerto', () => {
    renderComponent();
    
    expect(screen.getByRole('heading', { 
      name: /John F\. Kennedy International Airport/i 
    })).toBeInTheDocument();
    
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('JFK')).toBeInTheDocument();
  });

  it('debería navegar a la URL correcta cuando se hace clic en la tarjeta del aeropuerto', () => {
    renderComponent();
  
    const airportCard = screen.getByTestId('airport-card');
    fireEvent.click(airportCard);
  
    expect(useRouter().push).toHaveBeenCalledWith('/airports/JFK');
  });

  it('debería aplicar el estilo hover correctamente', () => {
    renderComponent();
    const airportCard = screen.getByTestId('airport-card');
    fireEvent.mouseOver(airportCard);
    expect(airportCard).toHaveClass('hover:brightness-70');
  });

  it('debería renderizar el componente Title con el código IATA', () => {
    renderComponent();
    expect(screen.getByText('JFK')).toBeInTheDocument();
  });
});