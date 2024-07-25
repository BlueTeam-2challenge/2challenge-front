import { Logo } from "../Logo"
import NavButton from "../NavButton"
import UserProfile from "../UserProfile"
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './SideMenu.module.css'

const Menu = () => {
  return (
    <Router>
    <div className={styles.sidebar}>
        <div>
          <Logo variant="small" />
          <UserProfile name="Karthi Madesh" />
          <div className={styles.navbar}>
          <NavButton to="/" label="Home" icon="src\assets\images\Home-icon.png" />
          <NavButton to="/Animais" label="Animals" icon="src\assets\images\Animals-icon.png" />
          </div>
        </div>
        <div className={styles.logout}><NavButton to="/" label="Logout" icon="src\assets\images\logout-icon.png" /></div>
    </div>
    </Router>
  )
}

export default Menu