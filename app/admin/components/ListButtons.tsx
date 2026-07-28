"use client";

import { Editor } from "@tiptap/react";
import {
  List,
  ListOrdered,
  Quote,
  Code2,
  Minus,
} from "lucide-react";

type Props = {
  editor: Editor;
};

export default function ListButtons({ editor }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${
          editor.isActive("bulletList")
            ? "bg-stone-300"
            : "hover:bg-stone-200"
        }`}
      >
        <List size={20} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${
          editor.isActive("orderedList")
            ? "bg-stone-300"
            : "hover:bg-stone-200"
        }`}
      >
        <ListOrdered size={20} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${
          editor.isActive("blockquote")
            ? "bg-stone-300"
            : "hover:bg-stone-200"
        }`}
      >
        <Quote size={20} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded ${
          editor.isActive("codeBlock")
            ? "bg-stone-300"
            : "hover:bg-stone-200"
        }`}
      >
        <Code2 size={20} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="p-2 rounded hover:bg-stone-200"
      >
        <Minus size={20} />
      </button>
    </>
  );
}