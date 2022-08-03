import { useState, useEffect } from "react";
import NotesList from "./notes-list";
import { useStore } from "../lib/store";
import { decryptData } from "../lib/crypto";
import splitTags from "../lib/utils/split-tags";
import { SimpleNoteType } from "..";

type TagProps = {
  tag: string;
};

export default function Tag({ tag }: TagProps) {
  const [notes, setNotes] = useState<SimpleNoteType[]>([]);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const {
    user: { signedKey },
    userNotes: { allNotes },
  } = useStore();

  useEffect(() => {
    const tagNotes = Object.values(allNotes).filter((note) => {
      if (!note.tags) return false;

      const noteTags = splitTags(decryptData(note.tags, signedKey));

      return noteTags.some(() => noteTags.includes(tag));
    });

    setNotes(tagNotes);
  }, [allNotes, tag, signedKey]);

  const toggleNotes = () => setShowNotes(!showNotes);

  return (
    <div className="tag-container">
      <button type="button" onClick={toggleNotes}>
        {tag}
      </button>
      {showNotes && <NotesList notes={notes} />}
    </div>
  );
}
