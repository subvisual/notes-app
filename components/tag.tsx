import { useState, useEffect } from "react";
import NotesList from "./notes-list";
import { useStore } from "../lib/store";
import splitTags from "../lib/utils/split-tags";
import { NoteType } from "..";

type TagProps = {
  tag: string;
};

export default function Tag({ tag }: TagProps) {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const {
    userNotes: { allNotes },
  } = useStore();

  useEffect(() => {
    const tagNotes = Object.values(allNotes).filter(note => {
      if (!note.tags) return false;

      const noteTags = splitTags(note.tags);

      return noteTags.some(() => noteTags.includes(tag));
    });

    setNotes(tagNotes);
  }, [allNotes, tag]);

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
