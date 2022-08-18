import { useEffect } from "react";
import { useStore } from "../lib/store";
import { NoteType } from "..";

type NotesListProps = {
  notes: NoteType[];
};

export default function NotesList({ notes }: NotesListProps) {
  const {
    session: { openNote, setOpenNote },
  } = useStore();

  useEffect(() => {}, [openNote]);

  const handleClick = (note: NoteType) => {
    if (openNote?.id !== note.id) {
      setOpenNote(note);
    }
  };

  return (
    <div className="flex flex-col">
      {notes.map(note => (
        <button
          type="button"
          className={note.id === openNote?.id ? "bg-blue-500" : ""}
          key={note.id}
          onClick={() => handleClick(note)}
        >
          {note.name}
        </button>
      ))}
    </div>
  );
}
