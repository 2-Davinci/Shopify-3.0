import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnlogin, { ShowOnlogOut } from "../hiddenlink/HiddenLink";

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
  const dispatch = useDispatch();
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
        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);

          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userId: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

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
                <ShowOnlogOut>
                  <NavLink className={activeLink} to="/login">
                    Login
                  </NavLink>
                </ShowOnlogOut>
                <ShowOnlogOut>
                  <NavLink className={activeLink} to="/register">
                    Register
                  </NavLink>
                </ShowOnlogOut>

                <ShowOnlogin>
                  <NavLink className={activeLink} to="/order-history">
                    My order
                  </NavLink>
                </ShowOnlogin>

                <ShowOnlogin>
                  <NavLink onClick={logOutUser} to="/">
                    Logout
                  </NavLink>
                </ShowOnlogin>
              </span>
              {cart}
            </div>
            <ShowOnlogin>
              <a
                href="#home"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                }}>
                <FaUserCircle
                  size={22}
                  style={{ marginRight: "5px", color: "#ff7722" }}
                />
                Hi, {displayName}
              </a>
            </ShowOnlogin>
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
