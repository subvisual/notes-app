import { useMemo } from "react";
import { useStore } from "../store";

export default function useFilteredStore() {
  const {
    search: { searchTerm },
    userNotes: { allNotes },
    userFolders: { folders },
    userTags: { tags },
  } = useStore();

  return useMemo(() => {
    if (!searchTerm) {
      return {
        filteredNotes: allNotes,
        filteredFolders: folders,
        filteredTags: tags,
      };
    }

    const newFilteredNotes = allNotes.filter(
      (note) =>
        note.name?.toLocaleLowerCase().includes(searchTerm) ||
        note.content?.toLocaleLowerCase().includes(searchTerm),
    );
    const newFilteredFolders = folders.filter((folder) =>
      newFilteredNotes.some((note) => note.folder === folder.id),
    );

    const newFilteredTags = tags.filter((tag) =>
      tag.toLocaleLowerCase().includes(searchTerm),
    );

    return {
      filteredNotes: newFilteredNotes,
      filteredFolders: newFilteredFolders,
      filteredTags: newFilteredTags,
    };
  }, [allNotes, folders, tags, searchTerm]);
}
