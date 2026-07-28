"use client";

import { Editor } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

type Props = {
  editor: Editor;
};

export default function HeadingButtons({ editor }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 1 })
            ? "bg-stone-300"
            : "hover:bg-stone-200"
        }`}
      >
        <Heading1 size={20} />
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 2 })
            ? "bg-stone-300"
            : "hover:bg-stone-200"
        }`}
      >
        <Heading2 size={20} />
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 3 })
            ? "bg-stone-300"
            : "hover:bg-stone-200"
        }`}
      >
        <Heading3 size={20} />
      </button>
    </>
  );
}