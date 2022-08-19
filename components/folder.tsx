import { useState, useEffect, useMemo } from "react";
import NotesList from "./notes-list";
import { useStore } from "../lib/store";
import { FolderType } from "..";

type FolderProps = {
  folder: FolderType;
};

export default function Folder({ folder }: FolderProps) {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const {
    userNotes: { allNotes },
    session: { openNote },
  } = useStore();

  const notes = useMemo(
    () => allNotes.filter((note) => note.folder === folder.id),
    [allNotes, folder.id],
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
