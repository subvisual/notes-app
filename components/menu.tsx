import { useState, useEffect, MouseEvent } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import FoldersList from "./folders-list";
import { useStore } from "../lib/store";
import TagsList from "./tags-list";
import SearchBar from "./search-bar";
import Logo from "./logo";
import Modal from "./modal";

export enum ModalActions {
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
    <>
      <div className="max-w-96 text-md z-10 flex h-screen w-1/4 min-w-max flex-col items-center justify-between bg-light-2 shadow-[0_0px_15px_rgba(0,0,0,.3)] dark:bg-dark-3">
        <div className="w-full p-5">
          <Logo width="120" length="45" />
          <SearchBar />
        </div>
        <Tabs className="w-full grow">
          <TabList className="grid h-12 w-full grid-cols-[1fr_1fr] border-b-thin border-dark-4 text-center dark:border-light-4">
            <Tab
              className="flex w-full items-center justify-center"
              selectedClassName="rounded-tr-lg dark:bg-dark-2 bg-light-3 border-t-thin border-r-thin border-dark-4 dark:border-light-4"
            >
              Folders
            </Tab>
            <Tab
              className="flex w-full items-center justify-center"
              selectedClassName="rounded-tl-lg dark:bg-dark-2 bg-light-3 border-t-thin border-l-thin border-dark-4 dark:border-light-4"
            >
              Tags
            </Tab>
          </TabList>

          <TabPanel>
            <FoldersList />
          </TabPanel>
          <TabPanel>
            <TagsList />
          </TabPanel>
        </Tabs>
        <div className="flex h-28 flex-col text-xs">
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
        </div>
      </div>
      <Modal type={modalAction} closeModal={closeModal} />
    </>
  );
}
