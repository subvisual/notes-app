import { GetServerSideProps } from "next";
import Head from "next/head";
import { NoteType } from "../..";
import { decryptData } from "../../lib/utils/crypto";
import splitTags from "../../lib/utils/split-tags";
import { getPublicNoteById } from "../api/db";
import Markdown from "../../components/markdown";

type NoteProps = {
  note: NoteType;
  encKey: string;
};

export default function Note({ note, encKey }: NoteProps) {
  const name = note.name ? decryptData(note.name, encKey) : "";
  const content = note.content ? decryptData(note.content, encKey) : "";
  const tags = note.tags ? decryptData(note.tags, encKey) : "";

  return (
    <>
      <Head>
        <title>{`Notes App - ${name}`}</title>
      </Head>

      <main className="h-full overflow-y-scroll bg-light-1 font-studio font-light text-dark-1 dark:bg-dark-1 dark:text-light-2">
        <div className="flex flex-col items-center gap-3 px-8 py-8 text-center md:px-16">
          <h1 className="border-b-[.5px] px-3 text-3xl">{name}</h1>
          <ul className="flex flex-wrap justify-center whitespace-nowrap">
            {splitTags(tags).map((tag) => (
              <li
                key={tag}
                className="ml-[0.4rem] text-sm before:content-['#']"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="markdown mx-8 mt-8 h-full w-full text-left">
            <Markdown content={content} />
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, key } = context.query;
  const res = await getPublicNoteById(id as string);

  if (res.status !== 200 || !res.body) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      note: {
        name: res.body[0].name,
        tags: res.body[0].tags,
        content: res.body[0].content,
      },
      encKey: key,
    },
  };
};
