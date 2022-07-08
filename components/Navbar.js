import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import styles from '../styles/Home.module.scss'
import { firestore, googleAuthProvider } from '../lib/firebase';
import { Button, ButtonGroup } from '@chakra-ui/react'

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
      <div className={styles.googleBtn} onClick={signInWithGoogle}>
        <div className={styles.wrapper}>
          <img className={styles.icon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
        </div>
        <p className={styles.btn}><b>Sign in with google</b></p>
      </div>
    );
  }

  function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
  }

  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/">
          <button className={styles.btnLogo}>JITTIPON</button>
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* user is signed-in and has username */}
        {username && (
          <>
            <Button style={{marginRight:"2rem"}} colorScheme='red' variant='solid' onClick={signOutNow}>
              Logout
            </Button>
            {/* <button style={{marginRight:"0.5rem"}} onClick={signOutNow}>Sign Out</button> */}
            <Link href={`/`}>
              <img src={user?.photoURL || '/hacker.png'} width="40px" height="30px" />
            </Link>
          </>
        )}
        {/* user is not signed OR has not created username */}
        {!username && (
          <SignInButton />
        )}
      </div>
    </nav>
  );
}