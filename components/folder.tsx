import { useState, useEffect, useMemo } from "react";
import NotesList from "./notes-list";
import { useStore } from "../lib/store";
import useFilteredStore from "../lib/hooks/useFilteredStore";
import ChevronSVG from "../assets/chevron.svg";
import FolderSVG from "../assets/folder.svg";

type FolderProps = {
  folder: FolderType;
};

export default function Folder({ folder }: FolderProps) {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const {
    session: { openNote },
  } = useStore();
  const { filteredNotes } = useFilteredStore();

  const notes = useMemo(
    () => filteredNotes.filter((note) => note.folder === folder.id),
    [filteredNotes, folder.id],
  );

  useEffect(() => {
    if (openNote?.folder === folder.id) {
      setShowNotes(true);
    }
  }, [openNote, folder.id]);

  const toggleNotes = () => setShowNotes(!showNotes);

  return (
    <li
      className={`border-b-thin border-dark-4 dark:border-light-4 ${
        showNotes && "bg-light-3 dark:bg-dark-2"
      }`}
    >
      <button
        className="grid w-full grid-cols-[20px,_1fr,_20px] items-center gap-4 py-4 pr-3 pl-7"
        type="button"
        onClick={toggleNotes}
      >
        <FolderSVG className="h-5 w-5 stroke-current stroke-[1.5]" />
        <span className="w-full overflow-x-hidden text-ellipsis whitespace-nowrap text-left">
          {folder.name}
        </span>
        <ChevronSVG
          className={`h-5 w-5 fill-current ${showNotes && "rotate-180"}`}
        />
      </button>
      {showNotes && <NotesList notes={notes} />}
    </li>
  );
}
