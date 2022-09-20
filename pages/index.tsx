import Head from "next/head";
import Link from "next/link";
import Connect from "../components/connect";
import Menu from "../components/menu";
import NoteEditor from "../components/note-editor";
import Logo from "../components/logo";
import { useStore } from "../lib/store";
import StatusBar from "../components/status-bar";

export default function Home() {
  const {
    session: { isConnected, openNote },
  } = useStore();

  return (
    <>
      <Head>
        <title>Notes App</title>
      </Head>

      <main className="h-full bg-light-1 font-studio font-light text-dark-1 dark:bg-dark-1 dark:text-light-2">
        {isConnected ? (
          <div className="sm:grid sm:grid-cols-[max(15rem,_30%),_1fr] lg:grid-cols-[20rem,_1fr]">
            <div className={`${openNote && "hidden"} sm:block`}>
              <Menu />
            </div>
            <div className={`${!openNote ? "hidden" : ""} sm:block`}>
              <NoteEditor />
            </div>
          </div>
        ) : (
          <div className="flex flex-col text-center">
            <Link href="/about">
              <a className="self-end p-6 text-dark-3 hover:text-green dark:text-light-3 hover:dark:text-pistachio">
                About
              </a>
            </Link>
            <div className="mx-auto mt-24">
              <Link href="/">
                <a>
                  <Logo />
                </a>
              </Link>
              <Connect />
            </div>
          </div>
        )}
        <StatusBar />
      </main>
    </>
  );
}
