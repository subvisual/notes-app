import { ChangeEvent, useState, FormEvent } from "react";
import FormButton from "./form-button";
import { useStore } from "../lib/store";

type AddFolderProps = {
  closeModal: () => void;
};

export default function AddFolder({ closeModal }: AddFolderProps) {
  const {
    user: { userSig, signedKey },
    userFolders: { addFolder },
  } = useStore();
  const defaultName = "New Folder";
  const [folderName, setFolderName] = useState<string>(defaultName);

  const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFolderName(ev.target.value);
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    addFolder({ name: folderName, user: userSig }, signedKey);
    closeModal();
  };

  return (
    <>
      <h2 className="self-center text-center text-lg">Add folder</h2>
      <form
        onSubmit={handleSubmit}
        className="grid h-full grid-rows-[2fr,_1fr] items-start text-center"
      >
        <label htmlFor="new-folder-name">
          Folder:
          <input
            id="new-folder-name"
            value={folderName}
            onChange={handleNameChange}
            className="ml-4 rounded-md border-thin border-inherit bg-light-1 px-2 py-1 text-dark-1  outline-none"
          />
        </label>
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
