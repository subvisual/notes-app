import { ChangeEvent } from "react";
import { splitTags } from "../lib/utils/split-tags";

type TagsProps = {
  tags: string;
  editMode: boolean;
  handleChangeTags: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Tags = ({ tags, editMode, handleChangeTags }: TagsProps) => {
  const tagsArray = splitTags(tags);
  return (
    <>
      {editMode ? (
        <input value={tags} onChange={handleChangeTags} />
      ) : (
        <ul className="flex">
          {tagsArray.map((tag, idx) => (
            <li key={idx} className="before:content-['#']">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Tags;
