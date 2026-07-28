"use client";

import { Editor } from "@tiptap/react";
import { Undo2, Redo2 } from "lucide-react";

type Props = {
  editor: Editor;
};

export default function HistoryButtons({ editor }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded hover:bg-stone-200"
      >
        <Undo2 size={20} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded hover:bg-stone-200"
      >
        <Redo2 size={20} />
      </button>
    </>
  );
}