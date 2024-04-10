import { FC, useEffect, useRef, useState } from "react";
import * as styles from "./style.css";

const DragDropUpload: FC<{
  onUpload: (file: File) => unknown;
}> = ({ onUpload }) => {
  const dragIndexRef = useRef(0);
  const down = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(
    function setDragDropEvent() {
      const onDrop = (e: DragEvent) => {
        e.preventDefault();

        const { files } = e.dataTransfer || { files: null };
        if (!files) return;
        dragIndexRef.current = 0;
        onUpload(files[0]);
        setDragging(false);
      };

      const onMouseDown = () => {
        down.current = true;
      };

      const onMouseUp = () => {
        down.current = false;
      };

      const onDragEnter = () => {
        if (down.current) return;
        if (!dragIndexRef.current) setDragging(true);
        dragIndexRef.current += 1;
      };

      const onDragOver = (e: DragEvent) => {
        e.preventDefault();
        const { dataTransfer } = e;
        if (dataTransfer) dataTransfer.dropEffect = "copy";
        if (!dragging) setDragging(true);
      };

      const onDragLeave = () => {
        if (down.current) return;
        if (dragIndexRef.current === 1) setDragging(false);
        dragIndexRef.current -= 1;
      };

      const onMouseLeave = () => {
        if (dragging) setDragging(false);
      };

      window.addEventListener("drop", onDrop);
      window.addEventListener("dragover", onDragOver);
      window.addEventListener("dragenter", onDragEnter);
      window.addEventListener("dragleave", onDragLeave);
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mouseleave", onMouseLeave);

      return () => {
        window.removeEventListener("drop", onDrop);
        window.removeEventListener("dragover", onDragOver);
        window.removeEventListener("dragenter", onDragEnter);
        window.removeEventListener("dragleave", onDragLeave);
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    [dragging, onUpload],
  );

  if (dragging)
    return (
      <div className={styles.dragDropUploadBlock}>
        <input type="file" className={styles.invisibleInput} />
      </div>
    );
};

export default DragDropUpload;
