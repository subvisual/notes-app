import Folder from "./folder";
import { useStore } from "../lib/store";

export default function FoldersList() {
  const {
    userFolders: { filteredFolders },
  } = useStore();

  return (
    <div>
      {filteredFolders.map((folder) => (
        <Folder key={folder.id} folder={folder} />
      ))}
    </div>
  );
}
