import { ChangeEvent, useState, FormEvent } from "react";
import { useStore } from "../lib/store";
import slugify from "../lib/utils/slugify";

type AddNoteProps = {
  closeModal: () => void;
};

export default function AddNote({ closeModal }: AddNoteProps) {
  const {
    user: { userSig },
    userFolders: { folders },
    userNotes: { addNote },
    session: { setOpenNote },
  } = useStore();
  const defaultName = "New Note";
  const [noteName, setNoteName] = useState<string>(defaultName);
  const [folderId, setFolderId] = useState<string>("");

  const createNote = async () => {
    const slug = slugify(noteName);
    const newNote = await addNote({
      name: noteName,
      slug,
      folder: folderId,
      user: userSig,
    });

    if (newNote) setOpenNote(newNote);
  };

  const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setNoteName(ev.target.value);
  };

  const handleFolderChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setFolderId(ev.target.value);
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    createNote();
    closeModal();
  };

  return (
    <>
      <h2 className="text-center">Add note</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-center items-center"
      >
        <label htmlFor="new-note-name">
          Name:
          <input
            id="new-note-name"
            value={noteName}
            onChange={handleNameChange}
          />
        </label>
        <label htmlFor="new-note-folder">
          Folder:
          <select
            id="new-note-folder"
            required
            value={folderId}
            onChange={handleFolderChange}
          >
            <option disabled value="">
              Choose a folder
            </option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </label>
        <div className="flex justify-around">
          <button type="button" className="p-2" onClick={closeModal}>
            cancel
          </button>
          <button type="submit" className="p-2">
            save
          </button>
        </div>
      </form>
    </>
  );
}
