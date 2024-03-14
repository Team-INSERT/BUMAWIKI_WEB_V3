import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  gap: "14px",
  ...flex.COLUMN_FLEX,
});

export const contributeBox = style({
  gap: "6px",
  padding: "18px",
  borderBottom: `1px solid ${theme.gray}`,
  cursor: "pointer",
  ...flex.COLUMN_FLEX,

  ":hover": {
    backgroundColor: theme.hover,
  },
});

export const hgroup = style({
  gap: "8px",
  ...flex.VERTICAL,
});

export const docsTitle = style({
  color: theme.primary,
  ...font.H5,
});

export const modifiedAt = style({
  color: theme.boldgray,
  ...font.p2,
});

export const link = style({
  color: theme.link,

  ":hover": {
    textDecoration: "underline",
  },
});

export const button = style({
  width: "fit-content",
  borderRadius: "4px",
  padding: "6px 12px",
  backgroundColor: theme.primary,
  color: theme.white,
  ...font.H6,
});
