import { FolderType, SimpleNoteType } from "..";
import { useState, useEffect } from "react";
import NotesList from "./notes-list";
import { useStore } from "../lib/store";
import { decryptData } from "../lib/crypto";

type FolderProps = {
  folder: FolderType;
};

const Folder = ({ folder }: FolderProps) => {
  const [notes, setNotes] = useState<SimpleNoteType[]>([]);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const {
    user: { signedKey },
    userNotes: { allNotes },
    session: { openNote },
  } = useStore();

  useEffect(() => {
    setNotes(
      Object.values(allNotes).filter((note) => {
        return note.folder === folder.id;
      }),
    );
  }, [allNotes, folder.id]);

  useEffect(() => {
    if (openNote?.folder === folder.id) {
      setShowNotes(true);
    }
  }, [openNote]);

  const toggleNotes = () => setShowNotes(!showNotes);

  return (
    <div className="folder-container">
      <p onClick={toggleNotes}>{decryptData(folder.name, signedKey)}</p>
      {showNotes && <NotesList notes={notes} />}
    </div>
  );
};

export default Folder;
