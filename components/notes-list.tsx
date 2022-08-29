import { useStore } from "../lib/store";
import { NoteType } from "..";
import NoteSVG from "../assets/note.svg";

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
            className={`grid w-full grid-cols-[20px,_1fr] gap-4 py-3 pl-16 pr-3 text-left  ${
              note.id === openNote?.id &&
              "bg-green text-light-1 dark:bg-pistachio dark:text-dark-1"
            }`}
            onClick={() => handleClick(note)}
          >
            <NoteSVG className="h-5 w-5 stroke-current stroke-2" />

            <span className="w-full overflow-x-scroll whitespace-nowrap">
              {note.name}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
