import React, { useContext, useEffect, useState } from "react";
import UserProfile from "@components/UserProfile";
import styles from "./Table.module.css";
import { Pen, Trash, PawPrint } from "lucide-react";
import { Animal } from "./types";
import Modal from "@components/Modal/Modal";
import { AuthContext } from "@app/contexts/AuthContext";
import {
  createAnimal,
  deleteAnimal,
  getAllAnimalsByUserId,
  updateAnimal,
} from "@services/animalService";
import { AnimalSchema } from "@app/schemas/animalFormSchema";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import useGetLocation from "@app/hooks/useGetLocation";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useAnimalForm } from "@app/hooks/useForms";

export default function Table() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [animalsToEdit, setAnimalsToEdit] = useState<Animal | null>(null);
  const [animalsToDelete, setAnimalsToDelete] = useState<Animal | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const categories = ["Dog", "Cat", "Bird", "Fish", "Reptile", "Other"];

  const { register, handleSubmit, errors, setValue, reset } = useAnimalForm();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadAnimals() {
      if (!user) {
        return;
      }
      const response = await getAllAnimalsByUserId(user?.uid);
      setAnimals(response);
    }
    document.title = "Animals List 🐶 - Challenge Compass";
    loadAnimals();
  }, [updateCounter]);

  const onSubmit = async (data: AnimalSchema) => {
    console.log(data);
    try {
      if (animalsToEdit) {
        await updateAnimal(animalsToEdit.id, data);
        toast.success("Animal updated successfully!", {
          position: "top-center",
          autoClose: 1500,
        });
      } else {
        await createAnimal(data);
        toast.success("Animal added successfully!", {
          position: "top-center",
          autoClose: 1500,
        });
      }
      setOpenCreateModal(false);
      setAnimalsToEdit(null);
      setUpdateCounter(updateCounter + 1);
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  const onDelete = async () => {
    if (animalsToDelete) {
      try {
        await deleteAnimal(animalsToDelete.id);
        toast.success("Animal deleted successfully!", {
          position: "top-center",
          autoClose: 1500,
        });
        setOpenDeleteModal(false);
        setAnimalsToDelete(null);
        setUpdateCounter(updateCounter + 1);
      } catch (error) {
        toast.error("An error occurred. Please try again.", {
          position: "bottom-center",
        });
      }
    }
  };

  const { coords } = useGetLocation();

  if (!coords) {
    return <h1>Getting localization ...</h1>;
  }
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
    setAnimalsToEdit(animal);
    setValue("petName", animal.petName);
    setValue("category", animal.category);
    setValue("description", animal.description);
    setValue("address", animal.address);
    setValue("location", animal.location);
    setPosition(animal.location);
    setOpenCreateModal(true);
  };

  const handleDelete = (animal: Animal) => {
    setAnimalsToDelete(animal);
    setOpenDeleteModal(true);
  };

  const clearFields = () => {
    reset();
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.tableHeader}>
        <h1 className={styles.title}>Animals List</h1>
        <button
          className={styles.addButton}
          onClick={() => {
            clearFields(), setOpenCreateModal(true);
          }}
        >
          <span>ADD NEW PET</span>
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
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      handleDelete(animal);
                    }}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formCreate}>
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
            disabled
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
              zoom={13}
              style={{
                width: "100%",
                height: "250px",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
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
              onClick={() => {
                setOpenCreateModal(false),
                  clearFields(),
                  setAnimalsToEdit(null);
              }}
              className={`${styles.modelBtn} ${styles.reset}`}
              type="reset"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className={`${styles.modelBtn} ${styles.add}`}
            >
              {animalsToEdit ? "UPDATE PET" : "ADD NEW PET"}
              <img src="src/assets/images/paw-btn.png" alt="paw-icon" />
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <div>
          <h2>Do you really want to remove this Pet?</h2>
          <div className={styles.btnModal}>
            <button
              className={`${styles.modelBtn} ${styles.reset}`}
              type="button"
              onClick={() => setOpenDeleteModal(false)}
            >
              No
            </button>
            <button
              type="button"
              className={`${styles.modelBtn} ${styles.add}`}
              onClick={onDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
