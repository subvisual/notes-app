import { useState, useEffect, ChangeEvent } from "react";
import Tags from "./tags";
import { useStore } from "../lib/store";
import { getNoteById, updateNote, deleteNote } from "../pages/api/db";
import { decryptData, encryptData } from "../lib/crypto";
import { NoteType } from "..";

const NoteEditor = () => {
  const {
    user: { signedKey },
    userNotes: { modifyNote, removeNote },
  } = useStore();
  const {
    session: { openNote },
  } = useStore();
  const [currentNote, setCurrentNote] = useState<NoteType | null>(null);
  const [editNote, setEditNote] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [updateName, setUpdateName] = useState<boolean>(false);
  const [updateContent, setUpdateContent] = useState<boolean>(false);
  const [tags, setTags] = useState<string>("");
  const [editTags, setEditTags] = useState<boolean>(false);
  const [updateTags, setUpdateTags] = useState<boolean>(false);

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

      if (res.body[0].tags) {
        const decryptedTags = decryptData(res.body[0].tags, signedKey);
        setTags(decryptedTags);
      }
    });
  }, [openNote, signedKey]);

  const resetState = () => {
    setEditNote(false);
    setContent("");
    setName("");
    setUpdateContent(false);
    setUpdateName(false);
    setEditTags(false);
    setTags("");
  };

  const handleSaveNote = async () => {
    if (!currentNote) return;
    const updatedNote = {
      ...(updateName && { name: encryptData(name, signedKey) }),
      ...(updateContent && { content: encryptData(content, signedKey) }),
      ...(updateTags && { tags: encryptData(tags, signedKey) }),
    };
    const { data } = await updateNote(updatedNote, currentNote.id);
    if (data?.length) {
      modifyNote(data[0], data[0].id);
      setUpdateName(false);
      setUpdateContent(false);
      setUpdateTags(false);
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
    if (!updateName) setUpdateName(true);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (!updateContent) setUpdateContent(true);
  };

  const handleChangeTags = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
    if (!updateTags) setUpdateTags(true);
  };

  const toggleEditNote = () => setEditNote((prevEditNote) => !prevEditNote);

  const toggleEditTags = async () => {
    if (!currentNote) return;
    if (editTags && updateTags) {
      const updatedNote = {
        ...(updateTags && { tags: encryptData(tags, signedKey) }),
      };
      const { data } = await updateNote(updatedNote, currentNote.id);
      if (data?.length) {
        modifyNote(data[0], data[0].id);
        setUpdateTags(false);
      }
    }
    setEditTags((prevEditTags) => !prevEditTags);
  };

  return (
    <>
      {currentNote && (
        <div className="flex flex-col w-4/5">
          <div className="bg-slate-300 flex justify-between">
            <Tags
              tags={tags}
              editMode={editTags}
              handleChangeTags={handleChangeTags}
            />
            <button onClick={toggleEditTags}>tags</button>
            <button
              className={`${editNote && "bg-blue-400"} p-2`}
              onClick={toggleEditNote}
            >
              edit
            </button>
            <button onClick={handleDeleteNote}>delete</button>
            <button className="p-2" onClick={handleSaveNote}>
              save
            </button>
          </div>
          <div className="flex flex-col">
            <input
              className="border"
              onChange={handleNameChange}
              readOnly={editNote}
              value={name}
            />
            <textarea
              className="border"
              onChange={handleContentChange}
              readOnly={editNote}
              value={content}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NoteEditor;
