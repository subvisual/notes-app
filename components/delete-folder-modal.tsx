import Modal from "react-modal";
import { ChangeEvent, useState, FormEvent } from "react";
import { useStore } from "../lib/store";
import { decryptData } from "../lib/crypto";

type DeleteFolderModalProps = {
  closeModal: () => void;
  handleDeleteFolder: (folderId: string) => void;
  isOpen: boolean;
  className: string;
};

const DeleteFolderModal = ({
  closeModal,
  handleDeleteFolder,
  isOpen,
  className,
}: DeleteFolderModalProps) => {
  const {
    user: { signedKey },
    userFolders: { folders },
  } = useStore();
  const [folderId, setFolderId] = useState<string>("");

  const resetModal = () => {
    setFolderId("");
  };

  const handleFolderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFolderId(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteFolderModal;
