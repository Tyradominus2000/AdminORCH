import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signout } from "../../apis/logout";

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div
      className={`${styles.Header} d-flex justify-content-between align-items-center`}
    >
      <Link to={"/"}>
        <h1 className="m10">ORCH BackOffice</h1>
      </Link>
      {user ? (
        <>
          <NavLink to={"/component"}>
            <button className="btn btn-primary m10">Component</button>
          </NavLink>
          <button className="btn btn-primary m10" onClick={() => signout()}>
            Logout
          </button>
        </>
      ) : (
        <NavLink to={"/login"}>
          <button className="btn btn-primary m10">Login</button>
        </NavLink>
      )}
    </div>
  );
}
