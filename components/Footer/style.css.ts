import { font, flex, theme, screen } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100vw",
  height: "22vh",
  backgroundColor: theme.white,
  border: "1px solid #ccc",
  ...flex.COLUMN_CENTER,

  "@media": {
    [`screen and (max-width: ${screen.tablet})`]: {
      height: "30vh",
    },
  },
});

export const githubLink = style({
  padding: "10px 0",
  ...flex.CENTER,
});

export const information = style({
  marginTop: "12px",
  ...font.context,
});
