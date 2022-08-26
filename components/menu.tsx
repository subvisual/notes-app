import { useState, useEffect } from "react";
import { useStore } from "../lib/store";
import SearchBar from "./search-bar";
import Logo from "./logo";
import MenuTabs from "./menu-tabs";
import MenuActions from "./menu-actions";
import Modal, { ModalActions } from "./modal";

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

  const closeModal = () => setModalAction(ModalActions.NONE);

  return (
    <>
      <div className="max-w-96 text-md z-10 flex h-screen w-1/4 min-w-max flex-col items-center justify-between bg-light-2 shadow-[0_0px_15px_rgba(0,0,0,.3)] dark:bg-dark-3">
        <div className="w-full p-5">
          <Logo width="120" length="45" />
          <SearchBar />
        </div>
        <MenuTabs />
        <MenuActions setModalAction={setModalAction} />
      </div>
      <Modal type={modalAction} closeModal={closeModal} />
    </>
  );
}
