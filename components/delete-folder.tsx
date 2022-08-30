import { ChangeEvent, useState, FormEvent } from "react";
import FormButton from "./form-button";
import { useStore } from "../lib/store";

type DeleteFolderProps = {
  closeModal: () => void;
};

export default function DeleteFolder({ closeModal }: DeleteFolderProps) {
  const {
    userFolders: { folders, removeFolder },
  } = useStore();
  const [folderId, setFolderId] = useState<string>("");

  const handleFolderChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setFolderId(ev.target.value);
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!folderId) return;

    removeFolder(folderId);
    closeModal();
  };

  return (
    <>
      <h2 className="self-center text-center text-lg">Delete folder</h2>
      <form
        onSubmit={handleSubmit}
        className="grid h-full grid-rows-[2fr,_1fr] items-start text-center"
      >
        <label htmlFor="delete-folder-name">
          Folder:
          <select
            id="delete-folder-name"
            required
            value={folderId}
            onChange={handleFolderChange}
            className="ml-4 w-1/2 rounded-md border-thin border-inherit bg-light-1 px-2  py-1 text-dark-1"
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
