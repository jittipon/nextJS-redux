import '../styles/globals.scss'
import store from '../redux/store'
import { Provider } from 'react-redux'
import Navbar from '../components/Navbar';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast';


function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <ChakraProvider>
      <Provider store={store}>
        <UserContext.Provider value={userData}>
          <Navbar />
          <Component {...pageProps} />
          <Toaster />
        </UserContext.Provider>
      </Provider>
    </ChakraProvider>

  )
}

export default MyApp
