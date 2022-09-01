import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/globals.scss";
import { useStore, Theme } from "../lib/store";

function MyApp({ Component, pageProps }: AppProps) {
  const {
    preferences: { theme },
  } = useStore();

  return (
    <div
      className={`h-screen w-screen antialiased ${
        theme === Theme.Dark ? "dark" : "light"
      }`}
    >
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="keywords"
          content="finiam, notes, encryption, secure, metamask"
        />
        <meta name="description" content="secure notes app" />
        <meta name="og:description" content="secure notes app" />
        <meta name="twitter:description" content="secure notes app" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
