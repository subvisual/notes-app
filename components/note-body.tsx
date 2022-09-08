import { ChangeEvent } from "react";
import Markdown from "./markdown";

type NoteBodyProps = {
  editNote: boolean;
  handleContentChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void;
  content: string;
};

export default function NoteBody({
  editNote,
  handleContentChange,
  content,
}: NoteBodyProps) {
  return (
    <div className="h-full overflow-y-hidden">
      {editNote ? (
        <textarea
          className="block h-full w-full resize-none bg-transparent outline-none"
          onChange={handleContentChange}
          value={content}
        />
      ) : (
        <div className="markdown h-full overflow-y-hidden">
          <Markdown content={content} />
        </div>
      )}
    </div>
  );
}
