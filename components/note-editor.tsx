import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import NoteTags from "./note-tags";
import NoteBody from "./note-body";
import { useStore } from "../lib/store";
import slugify from "../lib/utils/slugify";
import EditSVG from "../assets/edit.svg";
import TagsSVG from "../assets/tags.svg";
import TrashSVG from "../assets/trash.svg";
import SaveSVG from "../assets/save.svg";

export default function NoteEditor() {
  const {
    user: { signedKey },
    userNotes: { updateNote, removeNote },
    session: { openNote, setOpenNote, setStatus },
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

  useEffect(() => {
    const handleKeyDown = async (ev: KeyboardEvent) => {
      if ((ev.ctrlKey || ev.metaKey) && ev.key === "e") {
        ev.preventDefault();
        toggleEditNote();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const saveNote = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!openNote) return;

    if (!updateName && !updateContent && !updateTags) return;

    setStatus("loading", "Saving...");

    const updatedNote = {
      name,
      slug: slugify(name),
      content,
      tags,
    };
    const update = await updateNote(openNote.id, updatedNote, signedKey);

    if (update) {
      setStatus("ok", "Saved note");
    } else {
      setStatus("error", "Something went wrong");
    }

    setUpdateName(false);
    setUpdateContent(false);
    setUpdateTags(false);
  };

  const deleteNote = async () => {
    if (!openNote) return;

    setStatus("loading", "Removing...");

    const remove = await removeNote(openNote.id);

    if (remove) {
      setStatus("ok", "Removed note");
    } else {
      setStatus("error", "Something went wrong");
    }

    setOpenNote(null);
  };

  const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value);

    if (!updateName) setUpdateName(true);
  };

  const handleContentChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(ev.target.value);

    if (!updateContent) setUpdateContent(true);
  };

  const handleTagChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTags(ev.target.value);

    if (!updateTags) setUpdateTags(true);
  };

  function toggleEditNote() {
    if (!editNote) setEditTags(false);

    setEditNote((prevEditNote) => !prevEditNote);
  }

  const toggleEditTags = async () => {
    if (!openNote) return;

    if (editTags && updateTags) {
      updateNote(openNote.id, { tags }, signedKey);
      setUpdateTags(false);
    }

    if (!editTags) setEditNote(false);

    setEditTags((prevEditTags) => !prevEditTags);
  };

  return (
    <div className="h-screen w-full">
      {openNote && (
        <form
          onSubmit={saveNote}
          className="grid h-full grid-rows-[4.5rem,_1fr] flex-col"
        >
          <div className="grid h-full grid-cols-[1fr,_auto] gap-3 bg-light-2 px-3 dark:bg-dark-3">
            <NoteTags
              tags={tags}
              editMode={editTags}
              handleChangeTags={handleTagChange}
            />
            <div className="flex gap-1">
              <button
                type="button"
                title="Edit tags"
                className={`${
                  editTags &&
                  "bg-green text-light-1 dark:bg-pistachio dark:text-dark-1"
                } p-2`}
                onClick={toggleEditTags}
              >
                <TagsSVG className="h-6 w-6 fill-current" />
              </button>
              <button
                type="button"
                title="Edit note"
                className={`${
                  editNote &&
                  "bg-green text-light-1 dark:bg-pistachio dark:text-dark-1"
                } p-2`}
                onClick={toggleEditNote}
              >
                <EditSVG className="h-6 w-6 stroke-current stroke-[1.5]" />
              </button>
              <button
                type="button"
                title="Delete note"
                className="p-2 active:bg-green active:text-light-1 dark:active:bg-pistachio active:dark:text-dark-1"
                onClick={deleteNote}
              >
                <TrashSVG className="h-7 w-7 stroke-current stroke-2" />
              </button>
              <button
                type="submit"
                title="Save changes"
                className="p-2 active:bg-green active:text-light-1 dark:active:bg-pistachio active:dark:text-dark-1"
              >
                <SaveSVG className="h-7 w-7 fill-current" />
              </button>
            </div>
          </div>
          <div className="bg:light-1 grid h-full w-full grid-rows-[4rem,_1fr] gap-[1.9rem] overflow-y-hidden px-20 pb-4 pt-10 text-dark-3 dark:bg-dark-1 dark:text-light-1">
            <input
              required
              className="block w-full border-b-thin bg-transparent text-3xl outline-none"
              onChange={handleNameChange}
              readOnly={!editNote}
              value={name}
            />
            <NoteBody
              editNote={editNote}
              handleContentChange={handleContentChange}
              content={content}
            />
          </div>
        </form>
      )}
    </div>
  );
}
