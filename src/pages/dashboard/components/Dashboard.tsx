
import { Logo } from "../../../components/Logo"
import NavButton from "../../../components/NavButton"
import UserProfile from "../../../components/UserProfile"
import CardPage from "./CardPage"
import './Dashboard.css'

const Dashboard = () => {
    return (
        <div>
            <aside className="container-options">
                <div className="content">
                    <Logo variant="small" />

                    <UserProfile name="John Doe" />
                    <NavButton to="/home" label="Home" icon="src\assets\images\Home-icon.png" />
                    <NavButton to="/Animais" label="Animais" icon="src\assets\images\Animals-icon.png" />

                    <button className="logout">Logout <img src="src\assets\images\sign-out-alt.png" alt="leave-button" /></button>
                </div>
            </aside>
            <div className="not-aside">
                <header className="container-searchbar">
                    <img src="src\assets\images\caret-circle-down.png" alt="caret-circle-down" className="image" />
                    <div className="container-input">
                        <input type="text" placeholder="Search" className="input-search-bar" />
                        <img src="src\assets\images\search.png" alt="search" className="input-icon" />
                    </div>
                </header>
                <section className="container-cards">
                    <CardPage icon="src\assets\images\icone-pata.png" title="Animals" quantity={236} color="#F0F9FF" />
                    <CardPage icon="src\assets\images\cat-icon.png" title="Animals Without Owners" quantity={18} color="#FEF6FB" />
                </section>
            </div>
        </div>
    )
}

export default Dashboard