import { ChangeEvent, useState, FormEvent } from "react";
import Modal from "react-modal";
import { useStore } from "../lib/store";

type AddNoteModalProps = {
  closeModal: () => void;
  handleCreateNote: (name: string, folder: string) => void;
  isOpen: boolean;
  className: string;
};

export default function AddNoteModal({
  closeModal,
  handleCreateNote,
  isOpen,
  className,
}: AddNoteModalProps) {
  const {
    userFolders: { folders },
  } = useStore();
  const defaultName = "New Note";
  const [noteName, setNoteName] = useState<string>(defaultName);
  const [folderId, setFolderId] = useState<string>("");

  const resetModal = () => {
    setNoteName(defaultName);
    setFolderId("");
  };

  const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setNoteName(ev.target.value);
  };

  const handleFolderChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setFolderId(ev.target.value);
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
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
            {Object.values(folders).map((folder) => (
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
    </Modal>
  );
}
