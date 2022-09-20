import ReactModal from "react-modal";
import AddNote from "./add-note";
import AddFolder from "./add-folder";
import DeleteFolder from "./delete-folder";
import { Theme, useStore } from "../lib/store";

export enum ModalActions {
  ADD_NOTE = "addNote",
  ADD_FOLDER = "addFolder",
  DELETE_FOLDER = "deleteFolder",
  NONE = "",
}

type ModalProps = {
  type: ModalActions;
  closeModal: () => void;
};

function Modal({ type, closeModal }: ModalProps) {
  const {
    preferences: { theme },
  } = useStore();

  return (
    <ReactModal
      isOpen={!!type}
      className={`mx-auto mt-20 grid h-4/6 w-4/5 grid-rows-[1fr,_3fr] flex-col rounded-lg antialiased outline-none sm:mt-32 sm:h-3/6 sm:w-3/4 md:w-2/3 lg:w-6/12 ${
        theme === Theme.Dark
          ? "bg-dark-3 text-light-1"
          : "bg-light-1 text-dark-1"
      }`}
      ariaHideApp={false}
    >
      {type === ModalActions.ADD_NOTE && <AddNote closeModal={closeModal} />}
      {type === ModalActions.ADD_FOLDER && (
        <AddFolder closeModal={closeModal} />
      )}
      {type === ModalActions.DELETE_FOLDER && (
        <DeleteFolder closeModal={closeModal} />
      )}
    </ReactModal>
  );
}

export default Modal;
