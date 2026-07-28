"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
} from "lucide-react";

type Props = {
  editor: Editor;
};

export default function FormattingButtons({ editor }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${
          editor.isActive("bold")
            ? "bg-stone-300"
            : "hover:bg-stone-200"
        }`}
      >
        <Bold size={20} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${
          editor.isActive("italic")
            ? "bg-stone-300"
            : "hover:bg-stone-200"
        }`}
      >
        <Italic size={20} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded ${
          editor.isActive("underline")
            ? "bg-stone-300"
            : "hover:bg-stone-200"
        }`}
      >
        <UnderlineIcon size={20} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 rounded ${
          editor.isActive("strike")
            ? "bg-stone-300"
            : "hover:bg-stone-200"
        }`}
      >
        <Strikethrough size={20} />
      </button>
    </>
  );
}