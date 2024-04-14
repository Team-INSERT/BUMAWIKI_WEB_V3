import { flex, font, theme, screen } from "@/styles";
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
});

export const docs = style({
  width: "78%",
  height: "100px",
  //   padding: "0 10px",
  gap: "8px",
  ...flex.COLUMN_HORIZONTAL,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      width: "100%",
    },
  },
});

export const titleBox = style({
  gap: "8px",
  ...flex.VERTICAL,
});

export const lastModifiedAt = style({
  color: theme.boldgray,
  ...font.p2,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      ...font.p4,
    },
  },
});

export const title = style({
  color: theme.primary,
  ...font.H4,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      ...font.H6,
    },
  },
});

export const simpleContents = style({
  ...font.caption,
});

export const thumbnail = style({
  objectFit: "cover",

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      display: "none",
    },
  },
});
