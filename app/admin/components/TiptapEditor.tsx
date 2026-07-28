"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import SocietyImage from "../../extensions/SocietyImage";
import { uploadImage } from "../../lib/storage";
import FormattingButtons from "./FormattingButtons";
import HeadingButtons from "./HeadingButtons";
import ListButtons from "./ListButtons";
import HistoryButtons from "./HistoryButtons";
import ImageButtons from "./ImageButtons";

type TiptapEditorProps = {
  onChange: (contenido: string) => void;
};

export default function TiptapEditor({
  onChange,
}: TiptapEditorProps) {
const editor = useEditor({
extensions: [
  StarterKit,
  Underline,
  SocietyImage,
],
  content: "<p>Empieza a escribir...</p>",
  immediatelyRender: false,

  onUpdate({ editor }) {
    onChange(editor.getHTML());
  },
});

if (!editor) return null;

async function handleImageUpload(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];

  if (!file) return;

  const url = await uploadImage(file);

editor!
  .chain()
  .focus()
  .setImage({
    src: url,
  })
  .run();
  event.target.value = "";
}

return (
    <div className="border rounded-lg p-4 bg-white min-h-[300px]">
<FormattingButtons editor={editor} />

<HeadingButtons editor={editor} />

<ListButtons editor={editor} />

<HistoryButtons editor={editor} />

<ImageButtons
  onImageUpload={handleImageUpload}
/>

<EditorContent editor={editor} />
    </div>
  );
}