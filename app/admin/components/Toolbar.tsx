"use client";

import { Bold } from "lucide-react";
import { Editor } from "@tiptap/react";

type ToolbarProps = {
  editor: Editor;
};

export default function Toolbar({ editor }: ToolbarProps) {
  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().toggleBold().run()}
      className="p-2 rounded hover:bg-stone-200"
    >
      <Bold size={20} />
    </button>
  );
}