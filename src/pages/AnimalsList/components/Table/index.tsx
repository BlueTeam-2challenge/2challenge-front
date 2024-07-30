import React from "react";
import UserProfile from "../../../../components/UserProfile";
import styles from "./Table.module.css";
import { Pen, Trash, PawPrint } from "lucide-react";

const animals = [
  {
    name: "Chumbo",
    description: "Weslley Silva",
    breed: "Pit-Monster",
    category: "Dog",
    date: "08-Dec, 2021",
  },
  {
    name: "Karthi",
    description: "karthi@gmmail.com",
    breed: "7305477760",
    category: "1234567305477760",
    date: "08-Dec, 2021",
  },
];
export default function Table() {
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
                <td>{animal.date}</td>
                <td>
                  <button className={styles.editButton}>
                    <Pen />
                  </button>
                  <button className={styles.deleteButton}>
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
