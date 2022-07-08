import '../styles/globals.scss'
import store from '../redux/store'
import { Provider } from 'react-redux'
import Navbar from '../components/Navbar';
import { UserContext  } from '../lib/context';
import { useUserData } from '../lib/hooks';


function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <Provider store={store}>
      <UserContext.Provider value={userData}>

        <Navbar />
        <Component {...pageProps} />
      </UserContext.Provider>

    </Provider>

  )






}

export default MyApp
