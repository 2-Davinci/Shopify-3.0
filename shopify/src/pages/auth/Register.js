import React, { useState } from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      alert("Password do not match");
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        alert(error.message);
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2 className="--color-danger ">Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password at least 8 character"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>
                Already have an account? <Link to={"/login"}>Login</Link>
              </p>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="loginLogo " width="300px" />
        </div>
      </section>
    </>
  );
};

export default Register;
