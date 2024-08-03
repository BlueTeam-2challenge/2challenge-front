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
} from "@services/animalService";
import { AnimalSchema } from "@app/schemas/animalFormSchema";

export default function Table() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadAnimals() {
      if (user?.uid) {
        try {
          const response = await getAllAnimalsByUserId(user.uid);
          if (!response) {
            setAnimals([]);
          }
          setAnimals(response);
        } catch (error) {
          console.error("Error loading animals:", error);
        }
      }
    }
    document.title = "Animals List 🐶 - Challenge Compass";
    loadAnimals();
  }, [user]);

  const handleOpenRemoveModal = (animal: Animal) => {
    setSelectedAnimal(animal);
    setOpenRemoveModal(true);
  };

  const handleCloseRemoveModal = () => {
    setOpenRemoveModal(false);
    setSelectedAnimal(null);
  };

  const handleConfirmRemove = async () => {
    if (selectedAnimal) {
      try {
        await deleteAnimal(selectedAnimal.id);
        setAnimals((prev) =>
          prev.filter((animal) => animal.id !== selectedAnimal.id)
        );
      } catch (error) {
        console.error("Error deleting animal:", error);
      }
      handleCloseRemoveModal();
    }
  };

  const handleAddAnimal = async (newAnimal: AnimalSchema) => {
    try {
      const response = await createAnimal(newAnimal);
      setAnimals([...animals, response.data]);
      setOpenModal(false);
    } catch (error) {
      console.error("Error adding animal:", error);
    }
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
                  <UserProfile name={animal.name} variant="small" />
                </td>
                <td>{animal.name}</td>
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
                    onClick={() => handleOpenRemoveModal(animal)}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalInsert
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleAddAnimal}
      />

      <ModalRemove
        isOpen={openRemoveModal}
        onClose={handleCloseRemoveModal}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
}
