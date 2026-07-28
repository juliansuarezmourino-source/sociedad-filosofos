"use client";

import ResizeHandle from "./ResizeHandle";

type Props = {
  src: string;
  selected?: boolean;
};

export default function ImageFrame({
  src,
  selected = false,
}: Props) {
  return (
   <div
  className={`relative inline-block ${
    selected ? "ring-2 ring-blue-500" : ""
  }`}
>
      <img
        src={src}
        alt=""
        className="max-w-full rounded-lg"
      />

{selected && (
  <>
    <ResizeHandle className="-top-1.5 -left-1.5" />
    <ResizeHandle className="-top-1.5 -right-1.5" />
    <ResizeHandle className="-bottom-1.5 -left-1.5" />
    <ResizeHandle className="-bottom-1.5 -right-1.5" />
  </>
)}
    </div>
  );
}