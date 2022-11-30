import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { ImageUpload } from "../components/uploadWidget";
import { Post } from "../components/post";
import { getXataClient, XataClient } from "../src/xata";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>FlauntSpace</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
      </div>
      <main className={styles.main}>
        <div className={styles.user}>
          {loading && <div className={styles.title}>Loading...</div>}{" "}
          {/*authentication process */}
          {/**Renders the home page after authentication passed of third-party */}
          {session && (
            <div className={styles.content}>
              <div className={styles.profile}>
                <>
                  <p>
                    You're logged in as
                    {/**Get's the name and mail from the third-party nextauth and display it as the user name on the home page */}
                    {session.user.name ?? session.user.email}
                  </p>
                  {/**SPLIT spage to two section where one is for the upload preset and the other is for posting blog post */}
                  <form className={styles.post}>
                    <Post />
                  </form>
                </>
              </div>
              <div className={styles.uploadsec}>
                <img
                  src="https://res.cloudinary.com/dhpp7gaty/image/upload/v1667560004/Profile-uploads/jnbkgndxzlnhapxv8eed.jpg"
                  alt="upload here"
                  className={styles.imageCloud}
                />
                <ImageUpload />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
{
  /**Connecting the xata to our app */
}
const xata = new XataClient();
export const getServerSideProps = async () => {
  const FlauntSpace = await xata.db.items.getAll();
  return {
    props: {
      FlauntSpace,
    },
  };
};
