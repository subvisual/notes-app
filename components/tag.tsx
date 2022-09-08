import { useState, useMemo } from "react";
import NotesList from "./notes-list";
import { useStore } from "../lib/store";
import splitTags from "../lib/utils/split-tags";
import ChevronSVG from "../assets/chevron.svg";
import HashtagSVG from "../assets/hashtag.svg";

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
        className="grid w-full grid-cols-[20px,_1fr,_20px] items-center gap-4 py-4 px-3 pl-7"
        type="button"
        onClick={toggleNotes}
      >
        <HashtagSVG className="h-5 w-5 stroke-current stroke-[1.5]" />
        <span className="w-full overflow-x-hidden text-ellipsis whitespace-nowrap text-left">
          {tag}
        </span>
        <ChevronSVG
          className={`h-5 w-5 fill-current ${showNotes && "rotate-180"}`}
        />
      </button>
      {showNotes && <NotesList notes={notes} />}
    </li>
  );
}
