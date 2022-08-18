import { useState, useEffect } from "react";
import NotesList from "./notes-list";
import { useStore } from "../lib/store";
import { FolderType, NoteType } from "..";

type FolderProps = {
  folder: FolderType;
};

export default function Folder({ folder }: FolderProps) {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const {
    userNotes: { allNotes },
    session: { openNote },
  } = useStore();

  useEffect(
    () => setNotes(Object.values(allNotes).filter(note => note.folder === folder.id)),
    [allNotes, folder.id]
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