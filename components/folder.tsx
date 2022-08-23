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
    <div className="folder-container">
      <button type="button" onClick={toggleNotes}>
        {folder.name}
      </button>
      {showNotes && <NotesList notes={notes} />}
    </div>
  );
}
