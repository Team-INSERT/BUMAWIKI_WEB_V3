import { style } from "@vanilla-extract/css";

export const dragDropUploadBlock = style({
  zIndex: 50,
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.3)",
});

export const invisibleInput = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
  display: "block",
});
