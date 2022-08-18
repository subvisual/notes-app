import Folder from "./folder";
import { useStore } from "../lib/store";

export default function FoldersList() {
  const {
    userFolders: { folders },
  } = useStore();

  return (
    <div>
      {Object.values(folders).map(folder => (
        <Folder key={folder.id} folder={folder} />
      ))}
    </div>
  );
}
