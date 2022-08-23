import { useState, useEffect, MouseEvent } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Modal from "react-modal";
import FoldersList from "./folders-list";
import { useStore } from "../lib/store";
import TagsList from "./tags-list";
import AddNote from "./add-note";
import AddFolder from "./add-folder";
import DeleteFolder from "./delete-folder";
import SearchBar from "./search-bar";
import Logo from "./logo";

enum ModalActions {
  ADD_NOTE = "addNote",
  ADD_FOLDER = "addFolder",
  DELETE_FOLDER = "deleteFolder",
  NONE = "",
}

export default function Menu() {
  const {
    userNotes: { allNotes },
    userTags: { setTags },
  } = useStore();
  const [modalAction, setModalAction] = useState<ModalActions>(
    ModalActions.NONE,
  );

  useEffect(() => {
    setTags();
  }, [allNotes, setTags]);

  const changeModalAction = (ev: MouseEvent) =>
    setModalAction((ev.target as HTMLButtonElement).value as ModalActions);

  const closeModal = () => setModalAction(ModalActions.NONE);

  return (
    <div className="max-w-96 flex h-full w-1/4 min-w-max flex-col items-center justify-between bg-light-2 dark:bg-dark-3">
      <div className="px-6 pt-7">
        <Logo />
        <SearchBar />
      </div>
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
      <button
        type="button"
        className="p-2"
        onClick={changeModalAction}
        value={ModalActions.ADD_NOTE}
      >
        ADD NOTE
      </button>
      <button
        type="button"
        className="p-2"
        onClick={changeModalAction}
        value={ModalActions.ADD_FOLDER}
      >
        ADD FOLDER
      </button>
      <button
        type="button"
        className="p-2"
        onClick={changeModalAction}
        value={ModalActions.DELETE_FOLDER}
      >
        DELETE FOLDER
      </button>
      <Modal
        isOpen={!!modalAction}
        className="bg-slate-200 flex w-6/12 h-3/6 mx-auto mt-32 flex-col"
        ariaHideApp={false}
      >
        {modalAction === ModalActions.ADD_NOTE && (
          <AddNote closeModal={closeModal} />
        )}
        {modalAction === ModalActions.ADD_FOLDER && (
          <AddFolder closeModal={closeModal} />
        )}
        {modalAction === ModalActions.DELETE_FOLDER && (
          <DeleteFolder closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
