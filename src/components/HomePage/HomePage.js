import React from "react";
import Homepageimage from "./Homepageimage.jpg";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className={styles.homepage}>
      <div>
        <h1 className={styles.title}>
          Welcome to <br /> chatvu.
        </h1>
        <div className={styles.desc}>
          <p>Join the conversation</p>
          {/* <p>Share your thoughts</p> */}
          <p>Start using chatvu today.</p>
        </div>
        <Link to="/signup">
          <button className={`btn ${styles.btn}`}>Sign up</button>
        </Link>
        <Link to="/signin">
          <button className={`btn btn-outline ${styles.login}`}>Login</button>
        </Link>
      </div>

      <img src={Homepageimage}  className={styles.image} alt="chat Image" />
    </div>
  );
}
