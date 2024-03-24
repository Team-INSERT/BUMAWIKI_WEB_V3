import { theme, font, flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  gap: "32px",
  ...flex.COLUMN_FLEX,
});

export const hgroup = style({
  gap: "4px",
  ...flex.BETWEEN,
});

export const titleBox = style({
  gap: "4px",
  ...flex.COLUMN_FLEX,
});

export const utilityBox = style({
  gap: "12px",
  ...flex.VERTICAL,
});

export const editButton = style({
  padding: "6px 16px",
  backgroundColor: theme.primary,
  color: theme.white,
  borderRadius: "4px",
  ...font.H6,

  "@media": {
    "(max-width: 400px)": {
      display: "none",
    },
  },
});

export const historyButton = style({
  padding: "4px 16px",
  borderRadius: "4px",
  border: `2px solid ${theme.gray}`,
  ...font.H6,
});

export const deleteButton = style({
  padding: "4px 16px",
  borderRadius: "4px",
  border: `2px solid ${theme.gray}`,
  ...font.H6,
});

export const lastModifiedAt = style({
  color: theme.boldgray,

  ...font.p2,
});

export const title = style({
  ...font.H1,
  color: theme.primary,
});

export const classifyBox = style({
  width: "100%",
  padding: "8px 14px",
  border: `1px solid ${theme.gray}`,
  borderRadius: "4px",
  cursor: "pointer",
  ...font.btn3,
});

export const classify = style({
  color: theme.classify,
  fontWeight: 500,
});

export const main = style({
  padding: "20px 0",
  height: "fit-content",
  ...flex.COLUMN_FLEX,
});
