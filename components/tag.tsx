import { useState, useMemo } from "react";
import NotesList from "./notes-list";
import { useStore } from "../lib/store";
import splitTags from "../lib/utils/split-tags";

type TagProps = {
  tag: string;
};

export default function Tag({ tag }: TagProps) {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const {
    userNotes: { allNotes },
  } = useStore();

  const notes = useMemo(
    () =>
      allNotes.filter((note) => {
        if (!note.tags) return false;

        const noteTags = splitTags(note.tags);

        return noteTags.includes(tag);
      }),

    [allNotes, tag],
  );

  const toggleNotes = () => setShowNotes(!showNotes);

  return (
    <li
      className={`border-b-thin border-dark-4 dark:border-light-4 ${
        showNotes && "bg-light-3 dark:bg-dark-2"
      }`}
    >
      <button
        className="w-full py-4 pl-11 pr-3 text-left"
        type="button"
        onClick={toggleNotes}
      >
        {tag}
      </button>
      {showNotes && <NotesList notes={notes} />}
    </li>
  );
}
