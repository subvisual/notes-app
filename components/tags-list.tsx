import Tag from "./tag";
import useFilteredStore from "../lib/hooks/useFilteredStore";

export default function TagsList() {
  const { filteredTags } = useFilteredStore();

  return (
    <ul>
      {filteredTags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </ul>
  );
}
