import Link from "next/link";
import BackSVG from "@assets/back.svg";
import GitHubSVG from "@assets/github.svg";

export default function About() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-between gap-8 bg-light-1 text-dark-1 dark:bg-dark-1 dark:text-light-3">
      <Link href="/" title="Go back" className="m-6 self-start">
        <BackSVG className="h-12 w-12 fill-transparent stroke-current hover:stroke-green hover:dark:stroke-pistachio" />
      </Link>
      <p className="mx-auto w-4/5 text-center leading-7 sm:w-3/5">
        This is a simple note taking app that makes the most of crypto wallets
        to anonymously store notes.
        <br />
        You can connect your MetaMask wallet, and then sign two simple strings -
        the first will function as your unique identifier, the second as your
        decryption key.
        <br />
        The notes are encrypted and stored on Supabase.
      </p>
      <a
        className="mb-40 flex items-center gap-2 rounded-lg border border-current px-4 py-3 text-dark-1 hover:bg-green hover:text-light-1 dark:border-[.5px] dark:text-light-1 hover:dark:bg-pistachio hover:dark:text-dark-1"
        title="GitHub"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/finiam/notes-app"
      >
        <GitHubSVG className="h-8 w-8 fill-current" />
        Github
      </a>
    </main>
  );
}
