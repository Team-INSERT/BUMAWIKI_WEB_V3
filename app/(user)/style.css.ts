import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const contributeBox = style({
  padding: "18px",
  borderBottom: `1px solid ${theme.gray}`,
  cursor: "pointer",
  color: theme.primary,
  ...font.H5,
  ...flex.COLUMN_FLEX,

  ":hover": {
    backgroundColor: theme.hover,
  },
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

export const buttonGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});
