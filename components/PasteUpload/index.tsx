import { FC, useEffect } from "react";

const PasteUpload: FC<{ onUpload: (file: File) => unknown }> = ({ onUpload }) => {
  useEffect(() => {
    const onPaste: EventListener = (e) => {
      const { clipboardData } = e as ClipboardEvent;
      if (!clipboardData) return;
      if (clipboardData.types[0] === "text/plain") return;
      e.preventDefault();
      const { items } = clipboardData;
      if (!items.length) return;

      const itemsArray = (() => {
        const array = [];
        for (let i = 0; i < items.length; i += 1) array.push(items[i]);
        return array;
      })();

      const [fileItem] = itemsArray.filter((item) => item.kind === "file");
      if (!fileItem || !fileItem.getAsFile) return;

      const file = fileItem.getAsFile();
      if (!file) return;
      onUpload(file);
      e.stopPropagation();
    };

    window.addEventListener("paste", onPaste);
    return () => {
      window.removeEventListener("paste", onPaste);
    };
  }, [onUpload]);
  return <></>;
};

export default PasteUpload;
