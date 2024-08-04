import React, { useContext, useEffect, useState } from "react";
import UserProfile from "@components/UserProfile";
import styles from "./Table.module.css";
import { Pen, Trash, PawPrint } from "lucide-react";
import { Animal } from "./types";
import ModalInsert from "@components/modalInsert/ModalInsert";
import ModalRemove from "@components/modalRemove/ModalRemove";
import { AuthContext } from "@app/contexts/AuthContext";
import {
  createAnimal,
  deleteAnimal,
  getAllAnimalsByUserId,
  getAllAnimals,
} from "@services/animalService";
import { animalFormSchema, AnimalSchema } from "@app/schemas/animalFormSchema";
import { MapContainer } from "react-leaflet/MapContainer";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useAnimalForm } from "@app/hooks/useForms";
import { useNavigate } from "react-router-dom";
import useGetLocation from "@app/hooks/useGetLocation";
import { toast } from "react-toastify";
import axios from "axios";
import { Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Table() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const categories = ["Dog", "Cat", "Bird", "Fish", "Reptile", "Other"];
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(animalFormSchema),
    defaultValues: {
      petName: "",
      category: "",
      description: "",
      address: "",
      location: {
        lat: 0,
        lng: 0,
      },
      createdBy: "",
    },
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadAnimals() {
      if (user?.uid) {
        try {
          const response = await getAllAnimals();
          if (!response) {
            setAnimals([]);
          } else {
            setAnimals(response);
          }
        } catch (error) {
          console.error("Error loading animals:", error);
        }
      }
    }
    document.title = "Animals List 🐶 - Challenge Compass";
    loadAnimals();
  }, [user]);

  const navigate = useNavigate();
  const { coords } = useGetLocation();

  if (!coords) {
    return <h1>Getting localization ...</h1>;
  }

  const onSubmit = async (data: AnimalSchema) => {
    console.log(data);
    try {
      await createAnimal(data);
      toast.success("Animal added successfully!", {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            latlng: `${lat},${lng}`,
            key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          },
        }
      );
      const address = response.data.results[0]?.formatted_address;
      if (address) {
        setValue("address", address);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Failed to fetch address. Please try again.");
    }
  };

  const MapChanges = () => {
    useMapEvents({
      click(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;
        const newPosition = { lat, lng };
        setPosition(newPosition);
        setValue("location", newPosition);
        fetchAddress(lat, lng);
      },
    });
    return null;
  };
  const CreatedChanges = () => {
    if (user) {
      setValue("createdBy", user.uid);
    }
    return null;
  };
  const handleEdit = (animal: Animal) => {
    console.log("Edit", animal);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <h1 className={styles.title}>Animals List</h1>
        <button className={styles.addButton} onClick={() => setOpenModal(true)}>
          ADD NEW PET
          <PawPrint />
        </button>
      </div>
      <hr />
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th colSpan={2}>Name</th>
              <th>Description</th>
              <th>Address</th>
              <th>Category</th>
              <th>Date of include</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td>
                  <UserProfile name={animal.petName} variant="small" />
                </td>
                <td>{animal.petName}</td>
                <td>{animal.description}</td>
                <td>{animal.address}</td>
                <td>{animal.category}</td>
                <td>
                  {new Date(animal.createdAt).toLocaleDateString("pt-BR")}
                </td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(animal)}
                  >
                    <Pen />
                  </button>
                  <button className={styles.deleteButton} onClick={() => {}}>
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalInsert isOpen={openModal} onClose={() => setOpenModal(!open)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="name"
            placeholder="Enter animal name"
            {...register("petName")}
          />
          {errors.petName && <small>{errors.petName.message}</small>}
          <select
            id="category"
            {...register("category")}
            defaultValue=""
            className={styles.select}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <small>{errors.category.message}</small>}
          <textarea
            id="description"
            placeholder="Enter animal description"
            {...register("description")}
          />
          {errors.description && <small>{errors.description.message}</small>}
          <input
            type="text"
            id="address"
            placeholder="Enter animal address"
            {...register("address")}
          />
          {errors.address && <small>{errors.address.message}</small>}
          <div className={styles.mapContainer}>
            <MapContainer
              center={
                {
                  lat: coords[0],
                  lng: coords[1],
                } as LatLngExpression
              }
              zoom={20}
              style={{
                width: "100%",
                height: "250px",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* <MapChanges /> */}
              <MapChanges />
              {position && (
                <Marker position={position}>
                  <Popup>A new animal is located here!</Popup>
                </Marker>
              )}
            </MapContainer>
            <input type="hidden" {...register("location")} />
            <CreatedChanges />
            <input type="hidden" {...register("createdBy")} />
          </div>
          <div className={styles.btnModal}>
            <button
              onClick={() => setOpenModal(false)}
              className={`${styles.modelBtn} ${styles.reset}`}
              type="reset"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className={`${styles.modelBtn} ${styles.add}`}
            >
              ADD NEW PET
              <img src="src/assets/images/paw-btn.png" alt="paw-icon" />
            </button>
          </div>
        </form>
      </ModalInsert>
    </div>
  );
}
