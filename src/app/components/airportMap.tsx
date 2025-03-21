"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface AirportMapProps {
  position: [number, number];
}

const AirportMap: React.FC<AirportMapProps> = ({ position }) => {
  const markerImageUrl = "/plane_icon.png";

  const markerIcon = new L.Icon({
    iconUrl: markerImageUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={markerIcon}>
      </Marker>
    </MapContainer>
  );
};

export default AirportMap;
