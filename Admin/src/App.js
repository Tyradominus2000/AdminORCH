import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <div className={`d-flex flex-fill flex-column justify-content-center ${styles.appContainer}`}>
        <Header />
        <div className={`${styles.childrenContainer}`}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
