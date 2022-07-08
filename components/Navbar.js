import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import styles from '../styles/Home.module.scss'
import { firestore, googleAuthProvider } from '../lib/firebase';

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOutNow = () => {
    signOut(auth);
    router.reload();
  }

  function SignInButton() {
    const signInWithGoogle = async () => {
      await auth.signInWithPopup(googleAuthProvider);
    };
  
    return (
        <button className="btn-google" onClick={signInWithGoogle}>
          <img src={'../assets/google.png'} width="30px" /> Sign in with Google
        </button>
    );
  }

  function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
  }

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <button className={styles.btnLogo}>NXT</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className={styles.logoutBtn}>
              <button onClick={signOutNow}>Sign Out</button>
            </li>
            <li>
              {/* <Link href={`/${username}`}> */}
              <Link href={`/`}>
                <img src={user?.photoURL || '/hacker.png'} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <SignInButton/>
        )}
      </ul>
    </nav>
  );
}