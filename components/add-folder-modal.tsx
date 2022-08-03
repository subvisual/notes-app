import { ChangeEvent, useState, FormEvent } from "react";
import Modal from "react-modal";

type AddFolderModalProps = {
  closeModal: () => void;
  handleCreateFolder: (name: string) => void;
  isOpen: boolean;
  className: string;
};

export default function AddFolderModal({
  closeModal,
  handleCreateFolder,
  isOpen,
  className,
}: AddFolderModalProps) {
  const defaultName = "New Folder";
  const [folderName, setFolderName] = useState<string>(defaultName);

  const resetModal = () => {
    setFolderName(defaultName);
  };

  const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFolderName(ev.target.value);
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    handleCreateFolder(folderName);
    closeModal();
  };

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      ariaHideApp={false}
      contentLabel="Add Folder Modal"
      onAfterClose={resetModal}
    >
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
    </Modal>
  );
}
