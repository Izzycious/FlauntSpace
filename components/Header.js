import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const handleSignin = (e) => {
    e.preventDefault();
    {
      /**This handle the buttons of the login and signout */
    }
    signIn();
  };

  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  const { data: session } = useSession();

  return (
    <div className="header">
      <Link href="/">
        <a className="logo">FlauntSpace</a>
      </Link>
      {session && (
        <a href="#" onClick={handleSignout} className="btn-signin">
          SIGN OUT
        </a>
      )}
      {!session && (
        <a href="#" onClick={handleSignin} className="btn-signin">
          SIGN IN
        </a>
      )}
    </div>
  );
}
