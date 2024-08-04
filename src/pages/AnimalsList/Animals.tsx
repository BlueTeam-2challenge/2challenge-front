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
        <SideMenu menu={menu} toggleMenu={toggleMenu} />
        <div className={styles.notAside}>
          <section className={styles.content}>
            <div className={styles.header}>
              <Header searchPlaceholder="Search..." action={toggleMenu} />
            </div>
            <Table />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Animals;
