import { ChangeEvent, useState, FormEvent } from "react";
import FormButton from "./form-button";
import slugify from "../lib/utils/slugify";
import { useStore } from "../lib/store";

type AddNoteProps = {
  closeModal: () => void;
};

export default function AddNote({ closeModal }: AddNoteProps) {
  const {
    user: { userSig, signedKey },
    userFolders: { folders },
    userNotes: { addNote },
    session: { setOpenNote },
  } = useStore();
  const defaultName = "New Note";
  const [noteName, setNoteName] = useState<string>(defaultName);
  const [folderId, setFolderId] = useState<string>("");

  const createNote = async () => {
    const slug = slugify(noteName);
    const newNote = await addNote(
      {
        name: noteName,
        slug,
        folder: folderId,
        user: userSig,
      },
      signedKey,
    );

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
      <h2 className="self-center text-center text-lg">Add note</h2>
      <form
        onSubmit={handleSubmit}
        className="grid h-full grid-rows-[2fr,_1fr] items-start text-center"
      >
        <div className="flex flex-col gap-6">
          <label htmlFor="new-note-name">
            Name:
            <input
              id="new-note-name"
              value={noteName}
              onChange={handleNameChange}
              className="ml-4 rounded-md border-thin border-inherit bg-light-1 px-2 py-1 text-dark-1  outline-none"
            />
          </label>
          <label htmlFor="new-note-folder">
            Folder:
            <select
              id="new-note-folder"
              required
              value={folderId}
              onChange={handleFolderChange}
              className="ml-4 rounded-md border-thin border-inherit bg-light-1 px-2  py-1 text-dark-1"
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
        </div>
        <div className="flex justify-center gap-9">
          <FormButton variant="secondary" type="button" onClick={closeModal}>
            cancel
          </FormButton>
          <FormButton variant="primary" type="submit">
            save
          </FormButton>
        </div>
      </form>
    </>
  );
}
