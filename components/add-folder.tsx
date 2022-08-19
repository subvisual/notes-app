import { ChangeEvent, useState, FormEvent } from "react";
import { useStore } from "../lib/store";

type AddFolderProps = {
  closeModal: () => void;
};

export default function AddFolder({ closeModal }: AddFolderProps) {
  const {
    user: { userSig },
    userFolders: { addFolder },
  } = useStore();
  const defaultName = "New Folder";
  const [folderName, setFolderName] = useState<string>(defaultName);

  const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFolderName(ev.target.value);
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    addFolder({ name: folderName, user: userSig });
    closeModal();
  };

  return (
    <>
      <h2 className="text-center">Add folder</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-center items-center"
      >
        <label htmlFor="new-folder-name">
          Folder:
          <input
            id="new-folder-name"
            value={folderName}
            onChange={handleNameChange}
          />
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
