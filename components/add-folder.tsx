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
    session: { setStatus },
  } = useStore();
  const defaultName = "New Folder";
  const [folderName, setFolderName] = useState<string>(defaultName);

  const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFolderName(ev.target.value);
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setStatus("loading", "Creating folder...");

    const folder = await addFolder(
      { name: folderName, user: userSig },
      signedKey,
    );

    if (folder) {
      setStatus("ok", "Created folder");
    } else {
      setStatus("error", "Something went wrong");
    }

    closeModal();
  };

  return (
    <>
      <h2 className="self-center text-center text-lg">Add folder</h2>
      <form
        onSubmit={handleSubmit}
        className="grid h-full grid-rows-[2fr,_1fr] items-start text-center"
      >
        <label
          htmlFor="new-folder-name"
          className="flex flex-col items-center gap-2 sm:block"
        >
          Folder:
          <input
            required
            id="new-folder-name"
            value={folderName}
            onChange={handleNameChange}
            maxLength={40}
            className="ml-4 w-4/5 rounded-md border-thin border-inherit bg-light-1 px-2 py-1 text-dark-1 outline-none  sm:w-1/2"
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
