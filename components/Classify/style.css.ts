import { theme, font } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
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
