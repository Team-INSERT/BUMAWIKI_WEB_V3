import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  gap: "16px",
  ...flex.COLUMN_FLEX,
});

export const historyBox = style({
  width: "100%",
  padding: "10px",
  borderBottom: `1px solid ${theme.gray}`,
  cursor: "pointer",
  gap: "8px",
  ...flex.COLUMN_FLEX,

  ":hover": {
    backgroundColor: theme.hover,
  },
});

export const hgroup = style({
  gap: "14px",
  ...flex.VERTICAL,
});

export const historyId = style({
  color: theme.primary,
  ...font.H3,
});

export const createdAt = style({
  color: theme.boldgray,
  ...font.p1,
});

export const author = style({
  cursor: "pointer",
  width: "fit-content",
  ...font.H6,

  ":hover": {
    textDecoration: "underline",
  },
});
