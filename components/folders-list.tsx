import Folder from "./folder";
import { useStore } from "../lib/store";

const FoldersList = () => {
  const {
    userFolders: { folders },
  } = useStore();

  return (
    <div className="grow">
      {Object.values(folders).map((folder, idx) => (
        <Folder key={idx} folder={folder} />
      ))}
    </div>
  );
};

export default FoldersList;
