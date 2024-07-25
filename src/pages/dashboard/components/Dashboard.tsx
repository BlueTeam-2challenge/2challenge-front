
import { Logo } from "../../../components/Logo"
import NavButton from "../../../components/NavButton"
import UserProfile from "../../../components/UserProfile"
import CardPage from "./CardPage"
import './Dashboard.css'

const Dashboard = () => {
    return (
        <div>
            <aside className="container-options">
                <Logo variant="default" />
                <UserProfile name="John Doe" />
                <NavButton to="/" label="Home" icon="src\assets\images\Home-icon.png" />
                <NavButton to="/Animais" label="Animais" icon="src\assets\images\Animals-icon.png" />
                <button>Logout <img src="src\assets\images\sign-out-alt.png" alt="leave-button" /></button>
            </aside>
            <section className="container-searchbar">
                <img src="src\assets\images\caret-circle-down.png" alt="caret-circle-down" />
                <input type="text" placeholder="Search" /><img src="src\assets\images\search.png" alt="search" />
            </section>
            <section className="container-cards">
                <CardPage />
            </section>
        </div>
    )
}

export default Dashboard