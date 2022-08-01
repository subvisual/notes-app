import Modal from "react-modal";
import { ChangeEvent, useState, FormEvent } from "react";
import { useStore } from "../lib/store";
import { decryptData } from "../lib/crypto";

type AddNoteModalProps = {
  closeModal: () => void;
  handleCreateNote: (name: string, folder: string) => void;
  isOpen: boolean;
  className: string;
};

const AddNoteModal = ({
  closeModal,
  handleCreateNote,
  isOpen,
  className,
}: AddNoteModalProps) => {
  const {
    user: { signedKey },
    userFolders: { folders },
  } = useStore();
  const defaultName = "New Note";
  const [noteName, setNoteName] = useState<string>(defaultName);
  const [folderId, setFolderId] = useState<string>("");

  const resetModal = () => {
    setNoteName(defaultName);
    setFolderId("");
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteName(e.target.value);
  };

  const handleFolderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFolderId(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateNote(noteName, folderId);
    closeModal();
  };

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      ariaHideApp={false}
      contentLabel="Add Note Modal"
      onAfterClose={resetModal}
    >
      <h2 className="text-center">Add note</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-center items-center"
      >
        <label>
          Name:
          <input value={noteName} onChange={handleNameChange} />
        </label>
        <label>
          Folder:
          <select required value={folderId} onChange={handleFolderChange}>
            <option disabled={true} value="">
              Choose a folder
            </option>
            {Object.values(folders).map((folder, idx) => (
              <option key={idx} value={folder.id}>
                {decryptData(folder.name, signedKey)}
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
    </Modal>
  );
};

export default AddNoteModal;
