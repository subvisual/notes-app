import { useState, useEffect } from "react";
import FoldersList from "./folders-list";
import AddNoteModal from "./add-note-modal";
import AddFolderModal from "./add-folder-modal";
import DeleteFolderModal from "./delete-folder-modal";
import { useStore } from "../lib/store";
import {
  getFoldersBySig,
  createNote,
  getNotesBySig,
  createFolder,
  deleteFolder,
} from "../pages/api/db";
import { encryptData } from "../lib/crypto";

const Menu = () => {
  const {
    user: { userSig, signedKey },
    userNotes: { setAllNotes, addNote },
    userFolders: { setFolders, addFolder, removeFolder },
    session: { setOpenNote },
  } = useStore();
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] =
    useState<boolean>(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] =
    useState<boolean>(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getUserFolders();
    getUserNotes();
  }, []);

  const getUserFolders = async () => {
    const res = await getFoldersBySig(userSig);
    if (!res.body) return;
    setFolders(res.body);
  };

  const getUserNotes = async () => {
    const res = await getNotesBySig(userSig);
    if (!res.body) return;
    setAllNotes(res.body);
  };

  const handleCreateFolder = async (folderName: string) => {
    const { data } = await createFolder({
      name: encryptData(folderName, signedKey),
      user: userSig,
    });
    if (data?.length) {
      addFolder(data[0]);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    const { data } = await deleteFolder(folderId);
    if (data?.length) {
      removeFolder(folderId);
    }
  };

  const handleCreateNote = async (noteName: string, folderId: string) => {
    const { data } = await createNote({
      name: encryptData(noteName, signedKey),
      folder: folderId,
      user: userSig,
    });
    if (data?.length) {
      addNote(data[0]);
      setOpenNote({
        id: data[0].id,
        name: data[0].name,
        folder: data[0].folder,
      });
    }
  };

  const closeAddFolderModal = () => setIsAddFolderModalOpen(false);
  const openAddFolderModal = () => setIsAddFolderModalOpen(true);
  const closeAddNoteModal = () => setIsAddNoteModalOpen(false);
  const openAddNoteModal = () => setIsAddNoteModalOpen(true);
  const closeDeleteFolderModal = () => setIsDeleteFolderModalOpen(false);
  const openDeleteFolderModal = () => setIsDeleteFolderModalOpen(true);

  return (
    <div className="bg-slate-300 h-full flex flex-col justify-between w-1/5">
      <FoldersList />
      <button className="p-2" onClick={openAddFolderModal}>
        ADD FOLDER
      </button>
      <button className="p-2" onClick={openAddNoteModal}>
        ADD NOTE
      </button>
      <button className="p-2" onClick={openDeleteFolderModal}>
        DELETE FOLDER
      </button>
      <AddFolderModal
        className="bg-slate-200 flex w-6/12 h-3/6 mx-auto mt-32 flex-col"
        closeModal={closeAddFolderModal}
        handleCreateFolder={handleCreateFolder}
        isOpen={isAddFolderModalOpen}
      ></AddFolderModal>
      <AddNoteModal
        className="bg-slate-200 flex w-6/12 h-3/6 mx-auto mt-32 flex-col"
        closeModal={closeAddNoteModal}
        handleCreateNote={handleCreateNote}
        isOpen={isAddNoteModalOpen}
      ></AddNoteModal>
      <DeleteFolderModal
        className="bg-slate-200 flex w-6/12 h-3/6 mx-auto mt-32 flex-col"
        closeModal={closeDeleteFolderModal}
        handleDeleteFolder={handleDeleteFolder}
        isOpen={isDeleteFolderModalOpen}
      ></DeleteFolderModal>
    </div>
  );
};

export default Menu;
