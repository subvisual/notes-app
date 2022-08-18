import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import FoldersList from "./folders-list";
import AddNoteModal from "./add-note-modal";
import AddFolderModal from "./add-folder-modal";
import DeleteFolderModal from "./delete-folder-modal";
import { useStore } from "../lib/store";
import TagsList from "./tags-list";
import slugify from "../lib/utils/slugify";

export default function Menu() {
  const {
    user: { userSig },
    userNotes: { addNote, allNotes },
    userFolders: { addFolder, removeFolder },
    userTags: { setTags },
    session: { setOpenNote },
  } = useStore();
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState<boolean>(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState<boolean>(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setTags();
  }, [allNotes]);

  const createFolder = (folderName: string) => addFolder({ name: folderName, user: userSig });

  const deleteFolder = (folderId: string) => removeFolder(folderId);

  const createNote = async (noteName: string, folderId: string) => {
    const slug = slugify(noteName);
    const newNote = await addNote({ name: noteName, slug, folder: folderId, user: userSig });

    if (newNote) setOpenNote(newNote);
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
          <FoldersList />
        </TabPanel>
        <TabPanel className="p-0">
          <TagsList />
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
        handleCreateFolder={createFolder}
        isOpen={isAddFolderModalOpen}
      />
      <AddNoteModal
        className="bg-slate-200 flex w-6/12 h-3/6 mx-auto mt-32 flex-col"
        closeModal={closeAddNoteModal}
        handleCreateNote={createNote}
        isOpen={isAddNoteModalOpen}
      />
      <DeleteFolderModal
        className="bg-slate-200 flex w-6/12 h-3/6 mx-auto mt-32 flex-col"
        closeModal={closeDeleteFolderModal}
        handleDeleteFolder={deleteFolder}
        isOpen={isDeleteFolderModalOpen}
      />
    </div>
  );
}
