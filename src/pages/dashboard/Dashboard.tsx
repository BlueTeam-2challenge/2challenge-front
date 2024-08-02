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

  const animalCount = data.length;

  return (
    <div className={styles.aside}>
      <SideMenu menu={menu} />
      <div className={styles.notAside}>
        <div className={styles.header}>
          <Header searchPlaceholder="Search..." action={toggleMenu} />
        </div>
        <section className={styles.containerCards}>
          <CardPage
            icon="src/assets/images/icone-pata.png"
            title="Animals"
            quantity={animalCount}
            color="#8bacc2"
          />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
