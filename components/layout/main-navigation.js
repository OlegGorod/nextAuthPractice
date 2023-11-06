import Link from "next/link";
import classes from "./main-navigation.module.css";
import { signOut, useSession } from "next-auth/client";

function MainNavigation() {
  const [session, loading] = useSession();

  function logOutHandler() {
    signOut();
  }

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div>
          <Link href="/">
            <a>
              <div className={classes.logo}>Yours Logo</div>
            </a>
          </Link>
          {session && <Link href="/catalog">Catalog</Link>}
        </div>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
