import React, { useEffect, useState } from "react";
import UserProfile from "../../../../components/UserProfile";
import styles from "./Table.module.css";
import { Pen, Trash, PawPrint } from "lucide-react";
import { TableProps, Animal } from "./types";

export default function Table(props: TableProps) {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    async function loadAnimals() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/animals"`
        );
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error("Error loading animals:", error);
      }
    }

    loadAnimals();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <h1 className={styles.title}>Animals List</h1>
        <button className={styles.addButton}>
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
            {animals.map((animal, index) => (
              <tr key={index}>
                <td>
                  <UserProfile name={animal.name} variant="small" />
                </td>
                <td>{animal.name}</td>
                <td>{animal.description}</td>
                <td>{animal.breed}</td>
                <td>{animal.category}</td>
                <td>{animal.createdAt}</td>
                <td>
                  <button className={styles.editButton} onClick={props.onEdit}>
                    <Pen />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={props.onDelete}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
