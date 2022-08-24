import Folder from "./folder";
import useFilteredStore from "../lib/hooks/useFilteredStore";

export default function FoldersList() {
  const { filteredFolders } = useFilteredStore();

  return (
    <ul>
      {filteredFolders.map((folder) => (
        <Folder key={folder.id} folder={folder} />
      ))}
    </ul>
  );
}
