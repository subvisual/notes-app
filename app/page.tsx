"use client";

import { Theme, useStore } from "@lib/store";
import Logo from "@components/logo";
import Menu from "@components/menu";
import NoteEditor from "@components/note-editor";
import Connect from "@components/connect";
import Link from "next/link";

export default function Root() {
  const {
    session: { isConnected, openNote },
    preferences: { theme },
  } = useStore();

  return (
    <div
      className={`h-screen w-screen antialiased ${
        theme === Theme.Dark ? "dark" : "light"
      }`}
    >
      <main
        className={`h-full bg-light-1 font-studio font-light text-dark-1 dark:bg-dark-1 dark:text-light-2 `}
      >
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
            <Link
              href="/about"
              className="self-end p-6 text-dark-3 hover:text-green dark:text-light-3 hover:dark:text-pistachio"
            >
              About
            </Link>
            <div className="mx-auto mt-24">
              <Link href="/">
                <Logo />
              </Link>
              <Connect />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
