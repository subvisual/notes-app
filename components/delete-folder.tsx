import { ChangeEvent, useState, FormEvent } from "react";
import FormButton from "./form-button";
import { useStore } from "../lib/store";

type DeleteFolderProps = {
  closeModal: () => void;
};

export default function DeleteFolder({ closeModal }: DeleteFolderProps) {
  const {
    userNotes: { allNotes },
    userFolders: { folders, removeFolder },
    session: { setStatus },
  } = useStore();
  const [folderId, setFolderId] = useState<string>("");

  const handleFolderChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setFolderId(ev.target.value);
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!folderId) return;

    const folderNotEmpty = allNotes.some((note) => note.folder === folderId);

    if (folderNotEmpty) {
      setStatus("error", "Please empty folder before deleting...");

      return;
    }

    setStatus("loading", "Deleting folder...");

    const remove = await removeFolder(folderId);

    if (remove) {
      setStatus("ok", "Removed folder");
    } else {
      setStatus("error", "Something went wrong");
    }

    closeModal();
  };

  return (
    <>
      <h2 className="self-center text-center text-lg">Delete folder</h2>
      <form
        onSubmit={handleSubmit}
        className="grid h-full grid-rows-[2fr,_1fr] items-start text-center"
      >
        <label
          htmlFor="delete-folder-name"
          className="flex flex-col items-center gap-2 sm:block"
        >
          Folder:
          <select
            id="delete-folder-name"
            required
            value={folderId}
            onChange={handleFolderChange}
            className="ml-4 w-4/5 rounded-md border-thin border-inherit bg-light-1 px-2 py-1  text-dark-1 sm:w-1/2"
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
        <div className="flex justify-center gap-9">
          <FormButton variant="secondary" type="button" onClick={closeModal}>
            cancel
          </FormButton>
          <FormButton variant="primary" type="submit">
            delete
          </FormButton>
        </div>
      </form>
    </>
  );
}
