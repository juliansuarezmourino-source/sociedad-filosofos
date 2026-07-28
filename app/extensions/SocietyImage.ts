import Image from "@tiptap/extension-image";

const SocietyImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      width: {
        default: null,
      },

      height: {
        default: null,
      },

      align: {
        default: "center",
      },

      caption: {
        default: "",
      },
    };
  },
}).configure({
  resize: {
    enabled: true,
    alwaysPreserveAspectRatio: true,
  },
});

export default SocietyImage;