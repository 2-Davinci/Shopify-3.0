import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);
const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart <FaShoppingCart size={20} />
      <p className="">0</p>
    </Link>
  </span>
);
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : ` `);
  const navigate = useNavigate();
  const logOutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Succesfully ");
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user.displayName);
        setDisplayName(user.displayName);
      } else {
        setDisplayName("");
      }
    });
  }, []);

  return (
    <>
      <header>
        <div className={styles.header}>
          {logo}
          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }>
            <div
              onClick={hideMenu}
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : ` ${styles["nav-wrapper"]}`
              }></div>
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo} <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact us{" "}
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <NavLink className={activeLink} to="/login">
                  Login
                </NavLink>

                <NavLink className={activeLink} to="/register">
                  Register
                </NavLink>
                <NavLink className={activeLink} to="/order-history">
                  My order
                </NavLink>
                <NavLink onClick={logOutUser} to="/">
                  Logout
                </NavLink>
                <NavLink
                  href="#"
                  style={{ display: "flex", alignItems: "center" }}>
                  <FaUserCircle
                    size={22}
                    style={{ marginRight: "5px", color: "#ff7722" }}
                  />
                  Hi, {displayName}
                </NavLink>
              </span>
              {cart}
            </div>
          </nav>
          <div className={styles["menu-icon"]}>
            {cart}
            <FaBars size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
