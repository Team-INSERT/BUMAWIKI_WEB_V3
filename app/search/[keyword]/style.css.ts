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
});

export const docs = style({
  width: "78%",
  height: "100px",
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
});

export const searchNotFoundBox = style({
  gap: "8px",
  ...flex.COLUMN_FLEX,
});

export const searchTitle = style({
  ...font.p2,
});

export const searchCreateLink = style({
  color: theme.link,
  width: "fit-content",
  ...font.H6,

  ":hover": {
    textDecoration: "underline",
  },
});

export const loader = style({
  width: "100%",
  height: "100vh",
  ...flex.CENTER,
});
