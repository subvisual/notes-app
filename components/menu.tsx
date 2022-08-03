import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import FolderList from "./folder-list";
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
import { encryptData, decryptData } from "../lib/crypto";
import splitTags from "../lib/utils/split-tags";
import TagList from "./tag-list";

export default function Menu() {
  const {
    user: { userSig, signedKey },
    userNotes: { setAllNotes, addNote, allNotes },
    userFolders: { setFolders, addFolder, removeFolder },
    userTags: { setTags },
    session: { setOpenNote },
  } = useStore();
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] =
    useState<boolean>(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] =
    useState<boolean>(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState<boolean>(false);

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

  const getUserTags = () => {
    const tags = Object.values(allNotes).reduce((previousTags, currentNote) => {
      if (!currentNote.tags) return [...previousTags];

      return [
        ...previousTags,
        ...splitTags(decryptData(currentNote.tags, signedKey)).filter(
          (tag) => !previousTags.includes(tag),
        ),
      ];
    }, [] as string[]);

    setTags(tags);
  };

  useEffect(() => {
    getUserFolders();
    getUserNotes();
  }, []);

  useEffect(() => {
    getUserTags();
  }, [allNotes]);

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
      tags: "",
    });

    if (data?.length) {
      addNote(data[0]);
      setOpenNote({
        id: data[0].id,
        name: data[0].name,
        folder: data[0].folder,
        tags: data[0].tags,
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
      <Tabs className="grow">
        <TabList className="flex">
          <Tab>Folders</Tab>
          <Tab>Tags</Tab>
        </TabList>

        <TabPanel className="p-0">
          <FolderList />
        </TabPanel>
        <TabPanel className="p-0">
          <TagList />
        </TabPanel>
      </Tabs>
      <button type="button" className="p-2" onClick={openAddFolderModal}>
        ADD FOLDER
      </button>
      <button type="button" className="p-2" onClick={openAddNoteModal}>
        ADD NOTE
      </button>
      <button type="button" className="p-2" onClick={openDeleteFolderModal}>
        DELETE FOLDER
      </button>
      <AddFolderModal
        className="bg-slate-200 flex w-6/12 h-3/6 mx-auto mt-32 flex-col"
        closeModal={closeAddFolderModal}
        handleCreateFolder={handleCreateFolder}
        isOpen={isAddFolderModalOpen}
      />
      <AddNoteModal
        className="bg-slate-200 flex w-6/12 h-3/6 mx-auto mt-32 flex-col"
        closeModal={closeAddNoteModal}
        handleCreateNote={handleCreateNote}
        isOpen={isAddNoteModalOpen}
      />
      <DeleteFolderModal
        className="bg-slate-200 flex w-6/12 h-3/6 mx-auto mt-32 flex-col"
        closeModal={closeDeleteFolderModal}
        handleDeleteFolder={handleDeleteFolder}
        isOpen={isDeleteFolderModalOpen}
      />
    </div>
  );
}
