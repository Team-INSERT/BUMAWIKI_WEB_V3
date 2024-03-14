import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "100vh",
  gap: "18px",
  ...flex.COLUMN_CENTER,
});

export const loadingText = style({
  color: theme.primary,
  ...font.H4,
});
