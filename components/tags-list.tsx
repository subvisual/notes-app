import Tag from "./tag";
import { useStore } from "../lib/store";

export default function TagsList() {
  const {
    userTags: { tags },
  } = useStore();

  return (
    <div>
      {tags.map(tag => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}
