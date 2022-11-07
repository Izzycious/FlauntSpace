import { useState } from "react";
import styles from "../styles/Home.module.css";

export function Post() {
  return (
    <form action="api/form" method="post">
      <label htmlFor="body-content" className={styles.flauntText}>
        Flaunt
      </label>
      <textarea rows="4" cols="50" className={styles.bodyText}>
        Enter text here...
      </textarea>
      <br />
      <button type="submit" className={styles.postbut}>
        Post
      </button>
    </form>
  );
}
