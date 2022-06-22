import 'normalize.css/normalize.css';
import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import NextHead from '../components/NextHead';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHead />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
