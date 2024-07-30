import SideMenu from "../../components/SideMenu/SideMenu";
import CardPage from "./components/CardPage";
import styles from "./Dashboard.module.css";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <div className={styles.aside}>
      <SideMenu />
      <div className={styles.notAside}>
        <Header />
        <section className={styles.containerCards}>
          <CardPage
            icon="src\assets\images\icone-pata.png"
            title="Animals"
            quantity={236}
            color="#F0F9FF"
          />
          <CardPage
            icon="src\assets\images\cat-icon.png"
            title="Animals Without Owners"
            quantity={18}
            color="#FEF6FB"
          />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
