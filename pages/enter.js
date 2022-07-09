import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context';
import styles from '../styles/Home.module.scss'
import toast from 'react-hot-toast';
import { Button, ButtonGroup, CircularProgress } from '@chakra-ui/react'
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';

export default function Enter(props) {
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

  return (
    <div className={styles.main}>
      {user ?
        !username
          ? <UsernameForm />
          : <SignOutButton />
        : <SignInButton />}
    </div>
  );


  // Sign in with Google button
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
  function signOutNow() {
    signOut(auth);
    // toast.success('logout sucess!')
    setlog(true);
    router.reload();
  }
  // Sign out button
  function SignOutButton() {
    return <Button style={{ marginRight: "2rem" }}
      colorScheme='red'
      variant='solid'
      onClick={signOutNow}>
      Logout
    </Button>
  }



  // Username form
  function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    const onSubmit = async (e) => {
      e.preventDefault();

      // Create refs for both documents
      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${formValue}`);

      // Commit both docs together as a batch write.
      const batch = firestore.batch();
      batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
    };

    const onChange = (e) => {
      // Force form value typed in form to match correct format
      const val = e.target.value.toLowerCase();
      const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

      // Only set form value if length is < 3 OR it passes regex
      if (val.length < 3) {
        setFormValue(val);
        // setLoading(false);
        // setIsValid(false);
      }

      if (re.test(val)) {
        setFormValue(val);
        setLoading(true);
        setIsValid(false);
      }
    };

    //

    useEffect(() => {
      checkUsername(formValue);
    }, [formValue]);

    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = useCallback(
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`usernames/${username}`);
          const { exists } = await ref.get();
          console.log('Firestore read executed!');
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
      []
    );

    return (
      !username && (
        <div className={styles.form}>
          <h3>Choose Username</h3>
          <form onSubmit={onSubmit}>
            <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
            <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
            <button type="submit" style={{ marginTop: "2rem"}} className='btn btn-success mb-2' disabled={!isValid}>
              Choose
            </button>
            <h3>Debug State</h3>
            <div>
              Username: {formValue}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div>
          </form>
        </div>
      )
    );
  }

  function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Checking... <CircularProgress isIndeterminate color='green.300' /></p>;
    } else if (isValid) {
      return <p style={{color:"green"}}>{username} is available!</p>;
    } else if (username && !isValid) {
      return <p style={{color:"red"}}>That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }
}