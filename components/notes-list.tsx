import { useStore } from "../lib/store";
import { decryptData } from "../lib/crypto";
import { SimpleNoteType } from "..";

type NotesListProps = {
  notes: SimpleNoteType[];
};

export default function NotesList({ notes }: NotesListProps) {
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
      {notes.map((note) => (
        <button
          type="button"
          className={note.id === openNote?.id ? "bg-blue-500" : ""}
          key={note.id}
          onClick={() => handleClick(note)}
        >
          {decryptData(note.name, signedKey)}
        </button>
      ))}
    </div>
  );
}
