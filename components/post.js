import { useState } from "react";
import styles from "../styles/Home.module.css";

export function Post() {
  return (
    <form action="api/form" method="post">
      <label htmlFor="body-content">Body</label>
      <input
        className="bodyText"
        type="text"
        id="body-content"
        name="body-content"
        required
      />

      <button type="submit">Post</button>
    </form>
  );
}
