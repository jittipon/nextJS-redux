import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import styles from '../styles/Home.module.scss'
import { firestore, googleAuthProvider } from '../lib/firebase';
import { Button, ButtonGroup } from '@chakra-ui/react'
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';



export default function Navbar() {
  const { user, username } = useContext(UserContext);
  const [log, setlog] = useState(false);

  const router = useRouter();

  useEffect(() => {
    console.log(user);

    if (user != null && log == true) {
      toast.success('login sucess!')
      console.log('login sucess!');
      setlog(false);


    } else if (user == null && log == true) {
      toast.success('logout sucess!',
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      console.log('logout sucess!');
      setlog(false);

    }
  }, [user]);

  const signOutNow = () => {
    signOut(auth);
    // toast.success('logout sucess!')
    setlog(true);
    router.reload();
  }

  function SignInButton() {
    const signInWithGoogle = async () => {
      await auth.signInWithPopup(googleAuthProvider)
      setlog(true);
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
            <div className={styles.username}>
              <h1>{username}</h1>
            </div>
            <Button style={{ marginRight: "2rem",width:"10rem" }} colorScheme='red' variant='solid' onClick={signOutNow} leftIcon={<IoIosLogOut />}>
              Logout
            </Button>
            <div style={{ cursor: "pointer",width:"5rem"}}>
              <Link href={"/enter"}>
                <img src={user?.photoURL || '/favicon.ico'} width="40px" height="30px" />
              </Link>
            </div>
          </>
        )}
        {/* user is not signed OR has not created username */}
        {!username && (
          <Link href={"/enter"}>
            <button>login</button>
          </Link>
          // <SignInButton />
        )}
      </div>
    </nav>
  );
}