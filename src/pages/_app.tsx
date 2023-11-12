import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import MuiTheme from 'config/theme';
import { Provider } from 'react-redux';
import store from 'store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL, NODE_ENV, SITE_URL } from 'config/env';

function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('\n---------ENV---------\n');
    console.log(`NODE_ENV`, NODE_ENV);
    console.log(`API_URL`, API_URL);
    console.log(`SITE_URL`, SITE_URL);
  }
  return (
    <Provider store={store}>
      <ThemeProvider theme={MuiTheme}>
        <>
          <Component {...pageProps} />
          <ToastContainer />
        </>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
