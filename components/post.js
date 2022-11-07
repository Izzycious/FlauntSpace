import { useState } from "react";
import styles from "../styles/Home.module.css";

export function Post() {
  return (
    <form action="api/form" method="post">
      <label htmlFor="body-content" className={styles.flauntText}>
        Flaunt
      </label>
      <input
        className={styles.bodyText}
        type="text"
        id="body-content"
        name="body-content"
        required
      />
      <br />
      <button type="submit">Post</button>
    </form>
  );
}
