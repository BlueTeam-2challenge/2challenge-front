import { Logo } from "../Logo"
import NavButton from "../NavButton/NavButton"
import UserProfile from "../UserProfile"
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './SideMenu.module.css'
import { X, Menu, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { SideMenuProps } from "./types";

const SideMenu = ({toggleHamburger, toggleMenu}: SideMenuProps) => {
  const [hamburger, setHamburger] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)

  toggleHamburger = () => {
    setHamburger(!hamburger)
  }

  toggleMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    const isMobile = () => {
      if(window.innerWidth <= 685){
        setHamburger(true);
        setMenu(false);
      }else{
        setHamburger(false)
      }
    };

    isMobile();

    window.addEventListener('resize', isMobile);
  }, []);

  return (
    <Router>
      <div className={`${styles.sidebar} ${hamburger ? styles.nav : styles.side} ${menu ? styles.sideHide : ''}`}>
      <div className={`${styles.sideContent} ${hamburger ? styles.hide : ''} ${menu ? styles.contentHide : ''}`}>
          <Logo variant="small" />
          <UserProfile name="Karthi Madesh" />
          <div className={styles.navbar}>
          <NavButton to="/" label="Home" icon="src\assets\images\Home-icon.png" />
          <NavButton to="/Animais" label="Animals" icon="src\assets\images\Animals-icon.png" />
          </div>
        </div>
        <div className={styles.logout}><NavButton to="/" label="Logout" icon="src\assets\images\logout-icon.png" /></div>
        <div className={`${styles.openMenu} `} onClick={toggleMenu}>
          {menu ? <ChevronRight /> : <ChevronLeft />}
        </div>
    </div>
    <div className={styles.menuIcon} onClick={toggleHamburger}>
      {hamburger ? <Menu /> : <X />}
    </div>
    </Router>
  )
}

export default SideMenu