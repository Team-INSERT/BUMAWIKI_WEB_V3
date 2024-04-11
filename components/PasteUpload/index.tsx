import { FC, useEffect } from "react";

export interface PasteUploadProps {
  onUpload: (file: File) => unknown;
}

const PasteUpload: FC<PasteUploadProps> = ({ onUpload }) => {
  useEffect(() => {
    const onPaste: EventListener = (e) => {
      e.preventDefault();
      const { clipboardData } = e as ClipboardEvent;
      if (!clipboardData) return;

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
    };

    window.addEventListener("paste", onPaste);
    return () => {
      window.removeEventListener("paste", onPaste);
    };
  }, [onUpload]);
  return <></>;
};

export default PasteUpload;
