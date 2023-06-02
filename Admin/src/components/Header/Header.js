import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <div className={`${styles.Header} d-flex justify-content-between align-items-center`}>
      <h1 className="m10">Header</h1>
      <NavLink to={"/login"}>
        <button className="btn btn-primary m10">Login</button>
      </NavLink>
    </div>
  );
}
