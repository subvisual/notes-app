import { ChangeEvent } from "react";
import splitTags from "../lib/utils/split-tags";

type TagsProps = {
  tags: string;
  editMode: boolean;
  handleChangeTags: (ev: ChangeEvent<HTMLInputElement>) => void;
};

export default function NoteTags({ tags, editMode, handleChangeTags }: TagsProps) {
  const tagsArray = splitTags(tags);

  return (
    <div>
      {editMode ? (
        <input value={tags} onChange={handleChangeTags} />
      ) : (
        <ul className="flex">
          {tagsArray.map(tag => (
            <li key={tag} className="before:content-['#']">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
