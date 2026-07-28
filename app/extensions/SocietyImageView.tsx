"use client";

import {
  NodeViewWrapper,
  type NodeViewProps,
} from "@tiptap/react";

import ImageFrame from "./components/ImageFrame";

export default function SocietyImageView({
  node,
  selected,
}: NodeViewProps) {
  return (
    <NodeViewWrapper>
<ImageFrame
  src={node.attrs.src}
  selected={selected}
/>
    </NodeViewWrapper>
  );
}