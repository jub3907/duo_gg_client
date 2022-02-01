import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import MuiTheme from 'config/theme';
import { Provider } from 'react-redux';
import store from 'store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
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
