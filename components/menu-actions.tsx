import { useState, createRef, useEffect } from "react";
import { ModalActions } from "./modal";

type MenuActionsProps = {
  setModalAction: (action: ModalActions) => void;
};

export default function MenuActions({ setModalAction }: MenuActionsProps) {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const ref = createRef<HTMLDivElement>();

  const toggleOptions = () => setOpenOptions((prevOptions) => !prevOptions);

  useEffect(() => {
    if (!openOptions) return undefined;

    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event?.target)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [openOptions, ref]);

  const handleAddNoteClick = () => setModalAction(ModalActions.ADD_NOTE);
  const handleAddFolderClick = () => setModalAction(ModalActions.ADD_FOLDER);
  const handleDeleteClick = () => setModalAction(ModalActions.DELETE_FOLDER);

  return (
    <div className="flex h-24 w-full items-center justify-between gap-7 bg-light-2 px-10 text-xs dark:bg-dark-3">
      <div className="relative" ref={ref}>
        <button
          type="button"
          className="relative z-20 flex h-12 w-12 items-center justify-center rounded-full bg-green pb-1 text-4xl leading-none text-light-1 dark:bg-dark-1"
          onClick={toggleOptions}
        >
          &#43;
        </button>
        <div
          className="absolute bottom-0 left-0 z-10 w-max rounded-2xl rounded-bl-3xl bg-green p-1 pb-14 text-light-1 dark:bg-dark-1"
          hidden={!openOptions}
        >
          <button
            type="button"
            className="block p-3"
            onClick={handleAddNoteClick}
          >
            ADD NOTE
          </button>
          <button
            type="button"
            className="block p-3"
            onClick={handleAddFolderClick}
          >
            ADD FOLDER
          </button>
        </div>
      </div>
      <button
        type="button"
        className="whitespace-nowrap p-2"
        onClick={handleDeleteClick}
      >
        DELETE FOLDER
      </button>
    </div>
  );
}
