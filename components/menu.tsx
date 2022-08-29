import { useState, useEffect } from "react";
import { useStore } from "../lib/store";
import SearchBar from "./search-bar";
import Logo from "./logo";
import ThemeButton from "./theme-button";
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
      <div className="text-md z-10 grid h-screen w-full grid-rows-[7.8rem,_1fr,_5.8rem] bg-light-2 shadow-[0_0px_15px_rgba(0,0,0,.3)] dark:bg-dark-3">
        <div className="h-full w-full p-5">
          <div className="flex items-center">
            <Logo width="120" length="45" />
            <ThemeButton />
          </div>
          <SearchBar />
        </div>
        <MenuTabs />
        <MenuActions setModalAction={setModalAction} />
      </div>
      <Modal type={modalAction} closeModal={closeModal} />
    </>
  );
}
