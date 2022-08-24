import ReactModal from "react-modal";
import AddNote from "./add-note";
import AddFolder from "./add-folder";
import DeleteFolder from "./delete-folder";

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
  return (
    <ReactModal
      isOpen={!!type}
      className="mx-auto mt-32 flex h-3/6 w-6/12 flex-col bg-slate-200"
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
