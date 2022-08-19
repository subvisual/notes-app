import { useState, useEffect, MouseEvent } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import FoldersList from "./folders-list";
import { useStore } from "../lib/store";
import TagsList from "./tags-list";
import Modal from "react-modal";
import AddNote from "./add-note";
import AddFolder from "./add-folder";
import DeleteFolder from "./delete-folder";

export enum ModalActions {
  AddNote = "addNote",
  AddFolder = "addFolder",
  DeleteFolder = "deleteFolder",
  None = "",
}

export default function Menu() {
  const {
    userNotes: { allNotes },
    userTags: { setTags },
  } = useStore();
  const [modalAction, setModalAction] = useState<ModalActions>(ModalActions.None);

  useEffect(() => {
    setTags();
  }, [allNotes]);

  const changeModalAction = (ev: MouseEvent) =>
    setModalAction((ev.target as HTMLButtonElement).value as ModalActions);

  const closeModal = () => setModalAction(ModalActions.None);

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
      <button
        type="button"
        className="p-2"
        onClick={changeModalAction}
        value={ModalActions.AddNote}
      >
        ADD NOTE
      </button>
      <button
        type="button"
        className="p-2"
        onClick={changeModalAction}
        value={ModalActions.AddFolder}
      >
        ADD FOLDER
      </button>
      <button
        type="button"
        className="p-2"
        onClick={changeModalAction}
        value={ModalActions.DeleteFolder}
      >
        DELETE FOLDER
      </button>
      <Modal
        isOpen={!!modalAction}
        className="bg-slate-200 flex w-6/12 h-3/6 mx-auto mt-32 flex-col"
        ariaHideApp={false}
      >
        {modalAction === ModalActions.AddNote && <AddNote closeModal={closeModal} />}
        {modalAction === ModalActions.AddFolder && <AddFolder closeModal={closeModal} />}
        {modalAction === ModalActions.DeleteFolder && <DeleteFolder closeModal={closeModal} />}
      </Modal>
    </div>
  );
}
