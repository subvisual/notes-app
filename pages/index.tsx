import Head from "next/head";
import Connect from "../components/connect";
import Menu from "../components/menu";
import NoteEditor from "../components/note-editor";
import Logo from "../components/logo";
import { Theme, useStore } from "../lib/store";

export default function Home() {
  const {
    session: { isConnected },
    preferences: { theme },
  } = useStore();

  return (
    <div
      className={`h-full antialiased ${
        theme === Theme.Dark ? "dark" : "light"
      }`}
    >
      <Head>
        <title>Notes App</title>
        <meta name="description" content="secure notes app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full bg-light-1 font-studio font-light text-dark-1 dark:bg-dark-1 dark:text-light-2">
        {isConnected ? (
          <>
            <Menu />
            <NoteEditor />
          </>
        ) : (
          <div className="mx-auto mt-44 text-center">
            <Logo />
            <Connect />
          </div>
        )}
      </main>
    </div>
  );
}
