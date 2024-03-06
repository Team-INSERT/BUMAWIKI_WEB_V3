import { theme, font } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  backgroundColor: theme.classify,
  ...font.D1,
});
