import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { ImageUpload } from "../components/uploadWidget";
import { Post } from "../components/post";
import { getXataClient } from "../utils/xata";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  // const [url, updateUrl] = useState();
  // const [error, updateError] = useState();

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
          {loading && <div className={styles.title}>Loading...</div>}
          {session && (
            <div className={styles.content}>
              <div className={styles.profile}>
                <>
                  <p>
                    You're logged in as
                    {session.user.name ?? session.user.email}
                  </p>
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

export const getServerSideProps = async ({ req, res }) => {
  const { isAuthenticated, username } = await authorize(req);

  if (isAuthenticated) {
    const xata = getXataClient();
    const todos = await xata.db.items
      .filter("user.username", username)
      .getMany();

    return {
      props: {
        todos,
      },
    };
  } else {
    res.writeHead(401, {
      "WWW-Authenticate": "Basic realm='This is a private to-do list'",
    });
    return { redirect: { destination: "/", permanent: false } };
  }
};
