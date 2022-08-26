import { useStore } from "../lib/store";
import { NoteType } from "..";

type NotesListProps = {
  notes: NoteType[];
};

export default function NotesList({ notes }: NotesListProps) {
  const {
    session: { openNote, setOpenNote },
  } = useStore();

  const handleClick = (note: NoteType) => {
    if (openNote?.id !== note.id) {
      setOpenNote(note);
    }
  };

  return (
    <ul className="flex flex-col">
      {notes.map((note) => (
        <li key={note.id}>
          <button
            type="button"
            className={`w-full overflow-scroll whitespace-nowrap py-3 pl-16 pr-3 text-left  ${
              note.id === openNote?.id &&
              "bg-green text-light-1 dark:bg-pistachio dark:text-dark-1"
            }`}
            onClick={() => handleClick(note)}
          >
            {note.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
