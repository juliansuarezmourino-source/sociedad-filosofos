"use client";

import { ImagePlus } from "lucide-react";

type Props = {
  onImageUpload: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function ImageButtons({
  onImageUpload,
}: Props) {
  return (
    <label className="p-2 rounded hover:bg-stone-200 cursor-pointer inline-flex">
      <ImagePlus size={20} />

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageUpload}
      />
    </label>
  );
}