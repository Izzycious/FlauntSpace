import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className={styles.container}>
      <Head>
        <title>FlauntSpace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.user}>
          {loading && <div className={styles.title}>Loading...</div>}
          {session && (
            <>
              <p className={styles.title}>
                You're logged in as, {session.user.name ?? session.user.email}!
              </p>
              <p style={{ marginBottom: "10px" }}> </p> <br />
              <img src="profile-pic.jpg" alt="" className={styles.avatar} />
            </>
          )}
          {!session && (
            <>
              <p className={styles.title}>Please login and flaunt</p>
              <img src="" alt="" className={styles.avatar} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const { isAuthenticated, username } = await authorize(req);

  if (isAuthenticated && username) {
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

    res.end();
    return {};
  }
};
