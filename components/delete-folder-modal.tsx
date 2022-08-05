import Modal from "react-modal";
import { ChangeEvent, useState, FormEvent } from "react";
import { useStore } from "../lib/store";

type DeleteFolderModalProps = {
  closeModal: () => void;
  handleDeleteFolder: (folderId: string) => void;
  isOpen: boolean;
  className: string;
};

export default function DeleteFolderModal({
  closeModal,
  handleDeleteFolder,
  isOpen,
  className,
}: DeleteFolderModalProps) {
  const {
    userFolders: { folders },
  } = useStore();
  const [folderId, setFolderId] = useState<string>("");

  const resetModal = () => {
    setFolderId("");
  };

  const handleFolderChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setFolderId(ev.target.value);
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (folderId) handleDeleteFolder(folderId);

    closeModal();
  };

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      ariaHideApp={false}
      contentLabel="Delete Folder Modal"
      onAfterClose={resetModal}
    >
      <h2 className="text-center">Delete folder</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-center items-center"
      >
        <label htmlFor="delete-folder-name">
          Folder:
          <select
            id="delete-folder-name"
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
            delete
          </button>
        </div>
      </form>
    </Modal>
  );
}
