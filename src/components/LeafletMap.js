import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = ({ address }) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    // Geocoding using OpenStreetMap's Nominatim API to convert address to lat/lon
    const fetchCoordinates = async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await res.json();
      if (data && data[0]) {
        setCoordinates([data[0].lat, data[0].lon]);
      }
    };

    if (address) {
      fetchCoordinates();
    }
  }, [address]);

  return (
    // <a href={`https://www.google.com/maps/search/?q=${address}`}>
    <div style={{ width: "100%", height: "300px" }}>
      {coordinates ? (
        <MapContainer
          center={coordinates || [-31.9523, 115.8613]}
          zoom={coordinates ? 13 : 2}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={coordinates}
            icon={
              new L.Icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", // URL to default marker icon
                iconSize: [25, 41], // Size of the marker
                iconAnchor: [12, 41], // Point where the marker's anchor should be
                popupAnchor: [0, -41], // Offset the popup
              })
            }
          >
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p className="animate-pulse h-[300px] w-full bg-gray-200">&nbsp;</p>
      )}
      <a
        href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(
          address
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginTop: "10px", textAlign: "center" }}
      >
        Open in OpenStreetMap
      </a>
    </div>
    // </a>git
  );
};

export default LeafletMap;
