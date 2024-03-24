import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  borderBottom: `1px solid ${theme.gray}`,
  cursor: "pointer",
  padding: "0 10px",
  ...flex.BETWEEN,

  ":hover": {
    opacity: 0.8,
    background: theme.hover,
  },

  "@media": {
    "(max-width: 950px)": {
      height: "15vh",
    },
  },
});

export const docs = style({
  width: "78%",
  height: "100px",
  //   padding: "0 10px",
  gap: "8px",
  ...flex.COLUMN_HORIZONTAL,
});

export const titleBox = style({
  gap: "8px",
  ...flex.VERTICAL,
});

export const lastModifiedAt = style({
  color: theme.boldgray,
  ...font.p2,

  "@media": {
    "(max-width: 950px)": {
      ...font.p3,
    },
  },
});

export const title = style({
  color: theme.primary,
  ...font.H4,
});

export const simpleContents = style({
  ...font.caption,
});

export const thumbnail = style({
  objectFit: "cover",

  "@media": {
    "(max-width: 950px)": {
      display: "none",
    },
  },
});
