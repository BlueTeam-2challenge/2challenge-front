import React, { useState, useRef } from "react";
import styles from "./ModalInsert.module.css";
import { Logo } from "../Logo";
import { ModalInsertProps } from "./types";
import { useAnimalForm } from "@app/hooks/useForms";
import { toast } from "react-toastify";
import { AnimalSchema } from "@app/schemas/animalFormSchema";
import { useNavigate } from "react-router-dom";
import MapComponent from "../Map/MapComponent";
import { StandaloneSearchBox } from "@react-google-maps/api";

const categories = ["Dog", "Cat", "Bird", "Fish", "Reptile", "Other"];

const ModalInsert: React.FC<ModalInsertProps> = ({
  isOpen = true,
  onClose,
  onConfirm,
}) => {
  const navigate = useNavigate();
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const { register, handleSubmit, errors, setValue } = useAnimalForm();
  const [address, setAddress] = useState("");

  const onLoad = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const formattedAddress = place.formatted_address || "";
        setAddress(formattedAddress);
        setValue("address", formattedAddress); // Update the form value
      }
    } else {
      console.log("SearchBox is not loaded yet!");
    }
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    setValue("address", event.target.value);
  };

  const onSubmit = async (data: AnimalSchema) => {
    try {
      console.log(data);
      toast.success("SignUp in successfully!", {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  if (!isOpen) return null;
  return (
    <div className={styles.containerOverlay}>
      <div className={styles.containerModal}>
        <div className={styles.logo}>
          <Logo variant="default" />
        </div>
        <div className={styles.containerInput}>
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
            <StandaloneSearchBox
              onLoad={onLoad}
              onPlacesChanged={onPlacesChanged}
            >
              <input
                type="text"
                id="address"
                placeholder="Enter animal address"
                value={address}
                onChange={handleAddressChange}
              />
            </StandaloneSearchBox>
            {errors.address && <small>{errors.address.message}</small>}
            <div className={styles.mapContainer}>
              <MapComponent address={address} />
            </div>
          </form>
        </div>
        <div className={styles.btnModal}>
          <button
            onClick={onClose}
            className={`${styles.modelBtn} ${styles.reset}`}
            type="reset"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className={`${styles.modelBtn} ${styles.add}`}
          >
            ADD NEW ANIMAL
            <img src="src/assets/images/paw-btn.png" alt="paw-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInsert;
