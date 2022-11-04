import { useState } from "react";
import styles from "../styles/Home.module.css";
export function ImageUpload() {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  async function handleWidgetClick() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhpp7gaty",
        uploadPreset: "my upload",
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setIsImageUploaded(true);
        } else if (error) {
          console.log(error);
        }
      }
    );
    widget.open();
  }

  return (
    <div className={styles.container}>
      <div className={styles.vertical}>
        <button
          className={styles.button}
          type="button"
          onClick={handleWidgetClick}
        >
          Upload image
        </button>
      </div>

      {isImageUploaded ? (
        <>
          <div>Successfully uploaded</div>
        </>
      ) : null}
    </div>
  );
}
