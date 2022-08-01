import { useStore } from "../lib/store";
import { useState, useEffect, ChangeEvent } from "react";
import { NoteType } from "..";
import { getNoteById, updateNote, deleteNote } from "../pages/api/db";
import { decryptData, encryptData } from "../lib/crypto";

const NoteEditor = () => {
  const {
    user: { signedKey },
    userNotes: { modifyNote, removeNote },
  } = useStore();
  const {
    session: { openNote },
  } = useStore();
  const [currentNote, setCurrentNote] = useState<NoteType | null>(null);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [updateName, setUpdateName] = useState<boolean>(false);
  const [updateContent, setUpdateContent] = useState<boolean>(false);

  useEffect(() => {
    resetState();
    if (!openNote?.id) return;

    getNoteById(openNote.id).then((res) => {
      if (!res.body?.length) return;
      setCurrentNote(res.body[0]);
      setName(decryptData(res.body[0].name, signedKey));

      if (res.body[0].content) {
        const decryptedContent = decryptData(res.body[0].content, signedKey);
        setContent(decryptedContent);
      }
    });
  }, [openNote, signedKey]);

  const resetState = () => {
    setReadOnly(true);
    setContent("");
    setName("");
    setUpdateContent(false);
    setUpdateName(false);
  };

  const handleSaveNote = async () => {
    if (!currentNote) return;
    const updatedNote = {
      ...(updateName && { name: encryptData(name, signedKey) }),
      ...(updateContent && { content: encryptData(content, signedKey) }),
    };
    const { data } = await updateNote(updatedNote, currentNote?.id);
    if (data?.length) {
      modifyNote(data[0], data[0].id);
      setUpdateName(false);
      setUpdateContent(false);
    }
  };

  const handleDeleteNote = async () => {
    if (!currentNote) return;
    const { data } = await deleteNote(currentNote.id);
    if (!data?.length) return;
    removeNote(currentNote.id);
    setCurrentNote(null);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setUpdateName(true);
  };
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setUpdateContent(true);
  };
  const toggleMode = () => setReadOnly((prevReadOnly) => !prevReadOnly);

  return (
    <>
      {currentNote && (
        <div className="flex flex-col w-4/5">
          <div className="bg-slate-300 flex justify-between">
            <button onClick={handleDeleteNote}>delete</button>
            <button
              className={`${!readOnly && "bg-blue-400"} p-2`}
              onClick={toggleMode}
            >
              edit
            </button>
            <button className="p-2" onClick={handleSaveNote}>
              save
            </button>
          </div>
          <div className="flex flex-col">
            <input
              className="border"
              onChange={handleNameChange}
              readOnly={readOnly}
              value={name}
            />
            <textarea
              className="border"
              onChange={handleContentChange}
              readOnly={readOnly}
              value={content}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NoteEditor;
