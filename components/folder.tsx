import { useState, useEffect, useMemo } from "react";
import NotesList from "./notes-list";
import { useStore } from "../lib/store";
import useFilteredStore from "../lib/hooks/useFilteredStore";
import { FolderType } from "..";

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
        className="w-full overflow-scroll whitespace-nowrap py-4 pl-11 pr-3 text-left"
        type="button"
        onClick={toggleNotes}
      >
        {folder.name}
      </button>
      {showNotes && <NotesList notes={notes} />}
    </li>
  );
}
