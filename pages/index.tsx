import Head from "next/head";
import Connect from "../components/connect";
import { useStore } from "../lib/store";
import Menu from "../components/menu";
import NoteEditor from "../components/note-editor";

export default function Home() {
  const {
    session: { isConnected },
  } = useStore();

  return (
    <div className="h-full">
      <Head>
        <title>Notes App</title>
        <meta name="description" content="secure notes app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full">
        {isConnected ? (
          <>
            <Menu />
            <NoteEditor />
          </>
        ) : (
          <Connect />
        )}
      </main>
    </div>
  );
}
