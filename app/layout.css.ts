import { theme, flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  minHeight: "100svh",
  backgroundColor: theme.background,
  padding: "52px 20px 0 20px",
  ...flex.FLEX,
});
