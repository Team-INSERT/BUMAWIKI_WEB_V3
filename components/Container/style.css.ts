import { theme, font, flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  gap: "24px",
  ...flex.COLUMN_FLEX,
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
