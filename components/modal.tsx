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
      className={`mx-auto mt-32 grid h-3/6 w-6/12 grid-rows-[1fr,_3fr] flex-col rounded-lg antialiased outline-none ${
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
