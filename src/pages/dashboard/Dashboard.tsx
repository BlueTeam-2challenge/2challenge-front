import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import CardPage from "./components/CardPage";
import styles from "./Dashboard.module.css";
import Header from "../../components/Header";
import axios from "axios";
import { Animal } from "../AnimalsList/components/Table/types";

const Dashboard = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const [data, setData] = useState<Animal[]>([]);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/animals`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    document.title = "Dashboard 🐶 - Challenge Compass";
  }, []);

  const groupedData = data.reduce((acc, animal) => {
    if (!acc[animal.category]) {
      acc[animal.category] = [];
    }
    acc[animal.category].push(animal);
    return acc;
  }, {} as { [key: string]: Animal[] });

  return (
    <div className={styles.aside}>
      <SideMenu menu={menu} toggleMenu={toggleMenu} />
      <div className={styles.notAside}>
        <div className={styles.header}>
          <Header searchPlaceholder="Search..." action={toggleMenu} />
        </div>
        <section className={styles.containerCards}>
          <CardPage
            icon="src/assets/images/icone-pata.png"
            title="All animals"
            quantity={data.length}
            color="#dfd5bf"
          />
          {Object.keys(groupedData).map((category) => (
            <CardPage
              key={category}
              icon="src/assets/images/icone-pata.png"
              title={category}
              quantity={groupedData[category].length}
              color="#dbe8f1"
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
