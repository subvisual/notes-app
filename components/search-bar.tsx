import { ChangeEvent, useState, useEffect } from "react";
import { useStore } from "../lib/store";

export default function SearchBar() {
  const {
    userNotes: { allNotes, setFilteredNotes },
    userFolders: { folders, setFilteredFolders },
    userTags: { tags, setFilteredTags },
  } = useStore();

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (!searchTerm) {
      setFilteredFolders(folders);
      setFilteredNotes(allNotes);

      return;
    }

    const newFilteredNotes = allNotes.filter(
      (note) =>
        note.name?.toLocaleLowerCase().includes(searchTerm) ||
        note.content?.toLocaleLowerCase().includes(searchTerm),
    );
    const newFilteredFolders = folders.filter((folder) =>
      newFilteredNotes.some((note) => note.folder === folder.id),
    );

    setFilteredNotes(newFilteredNotes);
    setFilteredFolders(newFilteredFolders);
  }, [allNotes, folders, searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTags(tags);

      return;
    }

    const newFilteredTags = tags.filter((tag) =>
      tag.toLocaleLowerCase().includes(searchTerm),
    );

    setFilteredTags(newFilteredTags);
  }, [tags, searchTerm]);

  const handleSearchChange = (ev: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(ev.target.value.toLocaleLowerCase());

  const reset = () => setSearchTerm("");

  return (
    <div className="flex bg-white w-full justify-between">
      <input
        className="bg-transparent w-full"
        onChange={handleSearchChange}
        value={searchTerm}
      />
      <button className="border-none p-0 m-0" type="button" onClick={reset}>
        X
      </button>
    </div>
  );
}
