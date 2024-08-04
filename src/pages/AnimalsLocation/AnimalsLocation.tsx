import React, { useState, useEffect } from "react";
import styles from "./AnimalsLocation.module.css";
import SideMenu from "@components/SideMenu/SideMenu";
import Header from "@components/Header";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useGetLocation from "@app/hooks/useGetLocation";
import { LatLngExpression } from "leaflet";
import { Animal } from "../AnimalsList/components/Table/types";
import { getAllAnimals } from "@app/services/animalService";

const AnimalsLocation = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const { coords } = useGetLocation();
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    async function loadAnimals() {
      const response = await getAllAnimals();
      setAnimals(response);
    }
    document.title = "Animals Locations 🐶 - Challenge Compass";
    loadAnimals();
  }, []);

  if (!coords) {
    return <h1>Getting localization ...</h1>;
  }

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className={styles.aside}>
      <SideMenu menu={menu} toggleMenu={toggleMenu} />
      <div className={styles.notAside}>
        <div className={styles.header}>
          <Header searchPlaceholder="Search..." action={toggleMenu} />
        </div>
        <section className={styles.content}>
          <div className={styles.container}>
            <h1>Animals Location</h1>
            <MapContainer
              center={
                {
                  lat: coords[0],
                  lng: coords[1],
                } as LatLngExpression
              }
              zoom={10}
              style={{
                width: "100%",
                height: "80vh",
                borderRadius: "10px",
                zIndex: 0,
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {animals.map((animal) => (
                <Marker
                  key={animal.id}
                  position={
                    {
                      lat: animal.location.lat,
                      lng: animal.location.lng,
                    } as LatLngExpression
                  }
                >
                  <Popup>
                    <div>
                      <h3>{animal.petName}</h3>
                      <p>{animal.description}</p>
                      <p>
                        <strong>Address:</strong> {animal.address}
                      </p>
                      <p>
                        <strong>Category:</strong> {animal.category}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnimalsLocation;
