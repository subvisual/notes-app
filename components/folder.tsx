import { useState, useEffect } from "react";
import NotesList from "./notes-list";
import { useStore } from "../lib/store";
import { decryptData } from "../lib/crypto";
import { FolderType, SimpleNoteType } from "..";

type FolderProps = {
  folder: FolderType;
};

export default function Folder({ folder }: FolderProps) {
  const [notes, setNotes] = useState<SimpleNoteType[]>([]);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const {
    user: { signedKey },
    userNotes: { allNotes },
    session: { openNote },
  } = useStore();

  useEffect(
    () =>
      setNotes(
        Object.values(allNotes).filter((note) => note.folder === folder.id),
      ),
    [allNotes, folder.id],
  );

  useEffect(() => {
    if (openNote?.folder === folder.id) {
      setShowNotes(true);
    }
  }, [openNote]);

  const toggleNotes = () => setShowNotes(!showNotes);

  return (
    <div className="folder-container">
      <button type="button" onClick={toggleNotes}>
        {decryptData(folder.name, signedKey)}
      </button>
      {showNotes && <NotesList notes={notes} />}
    </div>
  );
}
