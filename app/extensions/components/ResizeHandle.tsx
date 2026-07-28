"use client";

type Props = {
  className?: string;
};

export default function ResizeHandle({
  className = "",
}: Props) {
  return (
    <div
      className={`
        w-3
        h-3
        bg-white
        border
        border-stone-600
        rounded-full
        absolute
        ${className}
      `}
    />
  );
}