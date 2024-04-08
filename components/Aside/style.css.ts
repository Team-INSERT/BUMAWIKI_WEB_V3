import { style } from "@vanilla-extract/css";
import { flex, font, theme } from "@/styles";

export const container = style({
  width: "300px",
  height: "540px",
  ...flex.COLUMN_FLEX,
});

export const lastModifiedBox = style({
  background: theme.white,
  border: `2px solid ${theme.gray}`,
  height: "100%",
  borderTop: "none",
});

export const header = style({
  backgroundColor: theme.primary,
  border: `2px solid ${theme.gray}`,
  borderLeft: "none",
  borderRight: "none",
  width: "100%",
  height: "46px",
  paddingLeft: "20px",
  color: theme.white,
  ...font.H5,
  ...flex.VERTICAL,
});

export const list = style({
  ...flex.COLUMN_FLEX,
});

export const listItem = style({
  width: "100%",
  height: "38px",
  backgroundColor: theme.white,
  borderBottom: `2px solid ${theme.gray}`,
  padding: "0 14px",
  ...flex.BETWEEN,

  ":hover": { opacity: 0.8 },
  ":last-child": { borderBottom: "none" },
});

export const docsName = style({
  color: theme.primary,
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  width: "70%",
  ...font.H6,

  ":hover": {
    textDecoration: "underline",
  },
});

export const docsLastModifiedAt = style({
  color: theme.boldgray,
  ...font.caption,
});

export const pagination = style({
  gap: "4px",
  ...flex.FLEX,
});

export const paginationButton = style({
  width: "56px",
  height: "24px",
  backgroundColor: theme.white,
  margin: "6px 0",
  border: `2px solid ${theme.gray}`,
  color: theme.primary,
  gap: "3px",
  ...font.btnBold,
  ...flex.CENTER,
});
