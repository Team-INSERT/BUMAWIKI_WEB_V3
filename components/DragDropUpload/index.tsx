import { FC, useEffect, useRef, useState } from "react";
import * as styles from "./style.css";

export interface DragDropUploadProps {
  onUpload: (file: File) => unknown;
}
const DragDropUpload: FC<DragDropUploadProps> = ({ onUpload }) => {
  const dragIndex = useRef(0);
  const down = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(
    function setEvent() {
      const onDrop = (e: DragEvent) => {
        e.preventDefault();
        const { files } = e.dataTransfer || { files: null };
        if (!files) return;
        if (!files[0]) return;
        onUpload(files[0]);

        dragIndex.current = 0;
        setDragging(false);
        e.stopPropagation();
      };

      const onMouseDown = () => {
        down.current = true;
      };
      const onMouseUp = () => {
        down.current = false;
      };
      const onDragEnter = () => {
        if (down.current) return;
        dragIndex.current += 1;
        if (dragIndex.current === 1) {
          setDragging(true);
        }
      };

      const onDragOver = (e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = "copy";
        }
        if (!dragging) {
          setDragging(true);
        }
      };

      const onDragLeave = () => {
        if (down.current) return;
        dragIndex.current -= 1;
        if (dragIndex.current === 0) {
          setDragging(false);
        }
      };

      const onMouseLeave = () => {
        if (dragging) {
          setDragging(false);
        }
      };

      window.addEventListener("drop", onDrop);
      window.addEventListener("dragover", onDragOver);
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("dragenter", onDragEnter);
      window.addEventListener("dragleave", onDragLeave);
      document.addEventListener("mouseleave", onMouseLeave);

      return () => {
        window.removeEventListener("drop", onDrop);
        window.removeEventListener("dragover", onDragOver);
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("dragenter", onDragEnter);
        window.removeEventListener("dragleave", onDragLeave);
        document.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    [dragging, onUpload],
  );

  return dragging ? (
    <div className={styles.dragDropUploadBlock}>
      <input type="file" className={styles.invisibleInput} />
    </div>
  ) : null;
};

export default DragDropUpload;
