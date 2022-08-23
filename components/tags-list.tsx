import Tag from "./tag";
import useFilteredStore from "../lib/hooks/useFilteredStore";

export default function TagsList() {
  const { filteredTags } = useFilteredStore();

  return (
    <div>
      {filteredTags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}
