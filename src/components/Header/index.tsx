import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import {
  CircleChevronLeft,
  CircleChevronRight,
  Search,
  Menu,
  X,
} from "lucide-react";

interface HeaderProps {
  action: () => void;
  searchPlaceholder: string;
}

function Header(props: HeaderProps) {
  const [menu, setMenu] = useState<boolean>(false);
  const [menuBurger, setHamburger] = useState<boolean>(false);

  useEffect(() => {
    const isMobile = () => {
      if (window.innerWidth <= 685) {
        setHamburger(true);
      } else {
        setHamburger(false);
      }
    };

    isMobile();

    window.addEventListener("resize", isMobile);

    return () => window.removeEventListener("resize", isMobile);
  }, []);

  const toggleMenu = () => {
    setMenu(!menu);
    props.action();
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu} onClick={toggleMenu}>
        <button className={styles.button}>
          {menuBurger ? (
            menu ? (
              <Menu color="#C4C4C4" />
            ) : (
              <X color="#C4C4C4" />
            )
          ) : menu ? (
            <CircleChevronRight color="#C4C4C4" />
          ) : (
            <CircleChevronLeft color="#C4C4C4" />
          )}
        </button>
      </div>
      <form className={styles.search}>
        <input
          type="text"
          placeholder={props.searchPlaceholder}
          className={styles.input}
        />
        <Search color="#c4c4c4" />
      </form>
    </div>
  );
}

export default Header;
