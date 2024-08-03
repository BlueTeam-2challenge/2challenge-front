import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Libraries,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const libraries: Libraries = ["places"]; // Define libraries array with correct type

interface MapComponentProps {
  address: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ address }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const [location, setLocation] = useState(center);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const geocode = async () => {
      if (!address) return;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ lat, lng });
        if (map) {
          map.panTo({ lat, lng });
        }
      }
    };
    geocode();
  }, [address, map]);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={location} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapComponent;
