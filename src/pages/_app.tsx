import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import MuiTheme from 'config/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={MuiTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
