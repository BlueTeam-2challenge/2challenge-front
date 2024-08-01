import React, { useEffect, useState } from "react";
import UserProfile from "@components/UserProfile";
import styles from "./Table.module.css";
import { Pen, Trash, PawPrint } from "lucide-react";
import { Animal } from "./types";
import ModalInsert from "@components/modalInsert/ModalInsert";
import ModalRemove from "@components/modalRemove/ModalRemove";

export default function Table() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    async function loadAnimals() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/animals`
        );
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error("Error loading animals:", error);
      }
    }

    loadAnimals();
  }, []);

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
        await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/animals/${selectedAnimal.id}`,
          {
            method: "DELETE",
          }
        );
        setAnimals((prev) =>
          prev.filter((animal) => animal.id !== selectedAnimal.id)
        );
      } catch (error) {
        console.error("Error deleting animal:", error);
      }
      handleCloseRemoveModal();
    }
  };

  const handleEdit = (animal: Animal) => {
    console.log("Edit", animal);
    // Implemente a lógica para editar o animal aqui
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
              <th>Breed</th>
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
                <td>{animal.breed}</td>
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
        onConfirm={() => {
          console.log("Confirm");
          setOpenModal(false);
        }}
      />

      <ModalRemove
        isOpen={openRemoveModal}
        onClose={handleCloseRemoveModal}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
}
