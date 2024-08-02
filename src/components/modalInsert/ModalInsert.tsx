import React, { useState } from "react";
import styles from "./ModalInsert.module.css";
import { Logo } from "../Logo";
import { TextInput } from "../TextInput";
import { ModalInsertProps } from "./types";

const categories = ["Dog", "Cat", "Bird", "Fish", "Reptile", "Other"];

const ModalInsert: React.FC<ModalInsertProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [petName, setPetName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");

  const handleConfirm = () => {
    const formData = { petName, description, address, category };
    onConfirm(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.containerOverlay}>
      <div className={styles.containerModal}>
        <div className={styles.logo}>
          <Logo variant="default" />
        </div>
        <div className={styles.containerInput}>
          <TextInput
            label="Pet Name"
            type="text"
            placeholder="Enter a pet name"
            name="petName"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          <TextInput
            label="Description"
            type="text"
            placeholder="Enter a description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextInput
            label="Address"
            type="text"
            placeholder="Enter an address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className={styles.inputWrapper}>
            <label htmlFor="category" className={styles.inputLabel}>
              Category
            </label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.textInput}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.btnModal}>
          <button
            onClick={onClose}
            className={`${styles.modelBtn} ${styles.reset}`}
          >
            CANCEL
          </button>
          <button
            onClick={handleConfirm}
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
