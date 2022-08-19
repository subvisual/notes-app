import { useState, useEffect, ChangeEvent } from "react";
import NoteTags from "./note-tags";
import { useStore } from "../lib/store";
import slugify from "../lib/utils/slugify";

export default function NoteEditor() {
  const {
    user: { signedKey },
    userNotes: { updateNote, removeNote },
    session: { openNote, setOpenNote },
  } = useStore();
  const [editNote, setEditNote] = useState<boolean>(false);
  const [editTags, setEditTags] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [updateName, setUpdateName] = useState<boolean>(false);
  const [updateContent, setUpdateContent] = useState<boolean>(false);
  const [updateTags, setUpdateTags] = useState<boolean>(false);

  const resetState = () => {
    setEditNote(false);
    setEditTags(false);
    setName("");
    setContent("");
    setTags("");
    setUpdateName(false);
    setUpdateContent(false);
    setUpdateTags(false);
  };

  useEffect(() => {
    resetState();

    if (!openNote) return;

    setName(openNote.name);

    if (openNote.content) setContent(openNote.content);

    if (openNote.tags) setTags(openNote.tags);
  }, [openNote]);

  const saveNote = async () => {
    if (!openNote) return;

    const updatedNote = {
      ...(updateName && { name, slug: slugify(name) }),
      ...(updateContent && { content }),
      ...(updateTags && { tags }),
    };

    updateNote(openNote.id, updatedNote, signedKey);

    setUpdateName(false);
    setUpdateContent(false);
    setUpdateTags(false);
  };

  const deleteNote = async () => {
    if (!openNote) return;

    removeNote(openNote.id);
    setOpenNote(null);
  };

  const nameChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value);

    if (!updateName) setUpdateName(true);
  };

  const contentChangeHandler = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(ev.target.value);

    if (!updateContent) setUpdateContent(true);
  };

  const tagChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    setTags(ev.target.value);

    if (!updateTags) setUpdateTags(true);
  };

  const toggleEditNote = () => setEditNote((prevEditNote) => !prevEditNote);

  const toggleEditTags = async () => {
    if (!openNote) return;

    if (editTags && updateTags) {
      updateNote(openNote.id, { tags }, signedKey);
      setUpdateTags(false);
    }

    setEditTags((prevEditTags) => !prevEditTags);
  };

  return (
    <div className="w-4/5">
      {openNote && (
        <div className="flex flex-col">
          <div className="bg-slate-300 flex justify-between">
            <NoteTags
              tags={tags}
              editMode={editTags}
              handleChangeTags={tagChangeHandler}
            />
            <button
              className={`${editTags && "bg-blue-400"} p-2`}
              type="button"
              onClick={toggleEditTags}
            >
              tags
            </button>
            <button
              type="button"
              className={`${editNote && "bg-blue-400"} p-2`}
              onClick={toggleEditNote}
            >
              edit
            </button>
            <button type="button" onClick={deleteNote}>
              delete
            </button>
            <button type="button" className="p-2" onClick={saveNote}>
              save
            </button>
          </div>
          <div className="flex flex-col">
            <input
              className="border"
              onChange={nameChangeHandler}
              readOnly={!editNote}
              value={name}
            />
            <textarea
              className="border"
              onChange={contentChangeHandler}
              readOnly={!editNote}
              value={content}
            />
          </div>
        </div>
      )}
    </div>
  );
}
