import { SimpleNoteType } from "..";
import { useStore } from "../lib/store";
import { decryptData } from "../lib/crypto";

type NotesListProps = {
  notes: SimpleNoteType[];
};

const NotesList = ({ notes }: NotesListProps) => {
  const {
    user: { signedKey },
    session: { openNote, setOpenNote },
  } = useStore();

  const handleClick = (note: SimpleNoteType) => {
    if (openNote?.id !== note.id) {
      setOpenNote(note);
    }
  };

  return (
    <div className="flex flex-col">
      {notes.map((note, idx) => (
        <button
          className={note.id === openNote?.id ? "bg-blue-500" : ""}
          key={idx}
          onClick={() => handleClick(note)}
        >
          {decryptData(note.name, signedKey)}
        </button>
      ))}
    </div>
  );
};

export default NotesList;
