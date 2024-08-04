import { useState, useEffect } from "react";

const defaultCoords = [-25.425312, -49.265686];

export default function useGetLocation() {
  const [coords, setCoords] = useState<number[] | null>(null);

  useEffect(() => {
    function onSuccess(position: GeolocationPosition) {
      setCoords([position.coords.latitude, position.coords.longitude]);
    }
    function onError() {
      console.log("error getting location");
      setCoords(defaultCoords);
    }
    try {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } catch (error) {
      setCoords(defaultCoords);
    }
  }, []);

  return { coords };
}
