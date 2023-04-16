import React, { useState } from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import forgottenImg from "../../assets/forgot.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("check your email for a reset link");
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={forgottenImg} alt="loginLogo " width="300px" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2 className="--color-danger ">Login</h2>
            <form onSubmit={resetPassword}>
              <input
                type="email"
                placeholder="Email"
                alue={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit "
                className="--btn --btn-primary --btn-block">
                Reset Password
              </button>
              <div className={styles.links}>
                <p>
                  <Link to={"/login"}>-Login</Link>
                </p>
                <p>
                  <Link to={"/register"}>-Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
