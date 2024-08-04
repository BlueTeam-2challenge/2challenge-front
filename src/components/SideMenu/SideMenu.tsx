import { AuthContext } from "@app/contexts/AuthContext";
import { useContext } from "react";
import { Logo } from "../Logo";
import NavButton from "../NavButton/NavButton";
import UserProfile from "../UserProfile";
import styles from "./SideMenu.module.css";
import { SideMenuProps } from "./types";
import { logout } from "@app/services/firebaseServices";

const SideMenu = ({ menu }: SideMenuProps) => {
  const { user } = useContext(AuthContext);
  const displayName = user?.displayName ?? user?.email ?? undefined;
  return (
    <>
      <div className={`${styles.sidebar} ${menu ? styles.sideHide : ""}`}>
        <div
          className={`${styles.sideContent} ${menu ? styles.contentHide : ""}`}
        >
          <Logo variant="small" />
          <UserProfile variant="default" name={displayName} />
          <div className={styles.navbar}>
            <NavButton
              to="/"
              label="Home"
              icon="src\assets\images\Home-icon.png"
            />
            <NavButton
              to="/animals"
              label="Animals"
              icon="src\assets\images\Animals-icon.png"
            />
            <NavButton
              to="/locations"
              label="Locations"
              icon="src\assets\images\Animals-icon.png"
            />
          </div>
        </div>
        <div className={styles.logout}>
          <NavButton
            to="/login"
            label="Logout"
            onClick={logout}
            icon="src\assets\images\logout-icon.png"
          />
        </div>
      </div>
    </>
  );
};

export default SideMenu;
