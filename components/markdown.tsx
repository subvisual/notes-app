import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  prism,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkEmoji from "remark-emoji";
import { useStore, Theme } from "../lib/store";

type MarkdownProps = {
  content: string;
};

export default function Markdown({ content }: MarkdownProps) {
  const {
    preferences: { theme },
  } = useStore();

  const code = ({
    inline = false,
    className,
    children,
    ...props
  }: {
    inline?: boolean;
    className?: string;
    children: ReactNode & ReactNode[];
  }) => {
    const match = /language-(\w+)/.exec(className || "");

    return !inline && match ? (
      <SyntaxHighlighter
        language={match[1]}
        PreTag="div"
        {...props}
        style={theme === Theme.Dark ? vscDarkPlus : prism}
        className="rounded-md border border-light-3 dark:border-dark-3"
        customStyle={{
          backgroundColor: "",
          fontSize: "0.8rem",
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkEmoji]}
      rehypePlugins={[rehypeRaw]}
      components={{ code }}
      className="block h-full w-full overflow-x-hidden overflow-y-scroll whitespace-normal break-words outline-none"
    >
      {content}
    </ReactMarkdown>
  );
}
