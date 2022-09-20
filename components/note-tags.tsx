import { ChangeEvent } from "react";
import splitTags from "../lib/utils/split-tags";

type TagsProps = {
  tags: string;
  editMode: boolean;
  handleChangeTags: (ev: ChangeEvent<HTMLInputElement>) => void;
};

export default function NoteTags({
  tags,
  editMode,
  handleChangeTags,
}: TagsProps) {
  const tagsArray = splitTags(tags);

  return (
    <div className="col-span-2 row-start-2 flex items-center overflow-y-hidden overflow-x-scroll sm:col-span-1 sm:row-start-auto">
      {editMode ? (
        <input
          className="my-2 w-full rounded-sm bg-light-1 px-2 text-dark-1 shadow-input-light outline-none dark:bg-dark-1 dark:text-light-1"
          value={tags}
          onChange={handleChangeTags}
        />
      ) : (
        tags && (
          <ul className="my-2 flex whitespace-nowrap">
            {tagsArray.map((tag) => (
              <li key={tag} className="ml-[0.4rem] before:content-['#']">
                {tag}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
