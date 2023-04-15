import React from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
const Login = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="loginLogo " width="400px" />
      </div>
      <div className={styles.form}>
        <h2 className="--color-danger ">Login</h2>
        <form>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" required />
          <button className="--btn --btn-primary --btn-block">Login</button>
          <div className={styles.links}>
            <Link to={"/reset"}>Reset Password</Link>
          </div>
          <p className="c">-- or -- </p>
        </form>
        <button className="--btn --btn-danger --btn-block --flex-center">
          <FaGoogle color="#fff" style={{ marginRight: "5px" }} /> Login with
          Google
        </button>
        <span className={styles.register}>
          <p>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </span>
      </div>
    </section>
  );
};

export default Login;
