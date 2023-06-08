import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { signin, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const yupSchema = yup.object({
    email: yup
      .string()
      .email("Use a valid email")
      .required("This field must not be empty"),
    password: yup.string().required("This field must not be empty"),
  });

  //Create the password and eye tag
  const [eye, setEye] = useState();
  const [eyeoff, setEyeOff] = useState();
  const [passwordField, setPasswordField] = useState();

  //By using useEffect im sure that the react as finish loading and actualising it every time the ClickPasswordOn/Off is call
  useEffect(() => {
    setEye(document.querySelector(".fa-eye"));
    setEyeOff(document.querySelector(".fa-eye-slash"));
    setPasswordField(document.querySelector("#password"));
    document.querySelector(".fa-eye").classList.add("dblock");
    document.querySelector(".fa-eye-slash").classList.add("dnone");
    console.log(user);
    // eslint-disable-next-line
  }, []);

  //If you click on the eye change the input password to text to be visible by user
  function clickPasswordOn() {
    eye.classList.add("dnone");
    eye.classList.remove("dblock");
    eyeoff.classList.add("dblock");
    eyeoff.classList.remove("dnone");
    passwordField.type = "text";
  }
  //If you click on the close eye change the input password to password to be invisible by user
  function clickPasswordOff() {
    eye.classList.add("dblock");
    eye.classList.remove("dnone");
    eyeoff.classList.add("dnone");
    eyeoff.classList.remove("dblock");
    passwordField.type = "password";
  }
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    console.log(values);
    try {
      clearErrors();
      await signin(values);
      navigate("/", { replace: true });
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  }
  return (
    <>
      <div className="m10">
        <form className={`d-flex flex-column`} onSubmit={handleSubmit(submit)}>
          <div className={`${styles.Login}`}>
            <div>
              <h2 className={`my20`}>Login in</h2>
            </div>
            <div className={`d-flex flex-column`}>
              <label className="mb5" htmlFor="email">
                Email :
              </label>
              <input
                className={`my20 p20 ${styles.Email}`}
                type="email"
                id="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors?.email && (
                <p className="form-error-light">{errors.email.message}</p>
              )}
              <label className="mb5" htmlFor="password">
                Password :
              </label>
              <div className={`d-flex flex-column`}>
                <div className={`d-flex align-items-center`}>
                  <input
                    className={`my20 p20 ${styles.Password}`}
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                  <i
                    onClick={() => clickPasswordOn()}
                    className={"fa-regular fa-eye m5"}
                  ></i>
                  <i
                    onClick={() => clickPasswordOff()}
                    className="fa-regular fa-eye-slash m5"
                  ></i>
                </div>
                {errors?.password && (
                  <p className="form-error-light">{errors.password.message}</p>
                )}
              </div>
            </div>
          </div>
          {errors.generic && (
            <p className="form-error">{errors.generic.message}</p>
          )}
          <div className={`d-flex justify-content-end ${styles.Btn}`}>
            <NavLink to={"../"}>
              <button type="button" className={`m5 btn btn-primary-reverse`}>
                Cancel
              </button>
            </NavLink>
            <button className={`m5 btn btn-primary`}>Log in</button>
          </div>
        </form>
      </div>
    </>
  );
}
