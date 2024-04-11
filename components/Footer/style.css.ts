import { font, flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100vw",
  height: "22vh",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  ...flex.COLUMN_CENTER,
});

export const githubLink = style({
  padding: "10px 0",
  ...flex.CENTER,
});

export const information = style({
  marginTop: "12px",
  ...font.context,
});
