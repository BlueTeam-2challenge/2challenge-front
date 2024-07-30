import React, { useState } from "react";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import styles from "./Animals.module.css";
import Table from "./components/Table";

function Animals() {
  const [menu, setMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div>
      <div className={styles.aside}>
        <SideMenu menu={menu} />
        <div className={styles.notAside}>
          <div className={styles.header}>
            <Header searchPlaceholder="Search..." action={toggleMenu} />
          </div>
          <section className={styles.content}>
            <Table />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Animals;
