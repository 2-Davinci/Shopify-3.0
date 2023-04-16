import React, { useState } from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Loader from "../../components/loader/Loader";
import { GoogleAuthProvider } from "firebase/auth";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setIsLoading(false);
      });
  };
  const provider = new GoogleAuthProvider();
  const signInwithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="loginLogo " width="300px" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2 className="--color-danger ">Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="--btn --btn-primary --btn-block"
                type="submit ">
                Login
              </button>
              <div className={styles.links}>
                <Link to={"/reset"}>Reset Password</Link>
              </div>
              <p>-- or -- </p>
            </form>
            <button
              onClick={signInwithGoogle}
              className="--btn --btn-danger --btn-block --flex-center">
              <FaGoogle color="#fff" style={{ marginRight: "5px" }} /> Login
              with Google
            </button>
            <span className={styles.register}>
              <p>
                Don't have an account? <Link to={"/register"}>Register</Link>
              </p>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
