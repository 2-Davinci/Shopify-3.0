import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <p>&copy; All Rights Reserved {year}</p>
    </div>
  );
};

export default Footer;
