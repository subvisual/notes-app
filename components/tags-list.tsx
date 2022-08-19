import Tag from "./tag";
import { useStore } from "../lib/store";

export default function TagsList() {
  const {
    userTags: { filteredTags },
  } = useStore();

  return (
    <div>
      {filteredTags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}
