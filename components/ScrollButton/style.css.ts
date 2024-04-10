import { style } from "@vanilla-extract/css";
import { flex, theme } from "@/styles";

export const container = style({
  position: "fixed",
  left: "2%",
  bottom: "3%",
  zIndex: "2",
  ...flex.FLEX,
});

export const scrollButton = style({
  width: "40px",
  height: "40px",
  background: theme.primary,
  color: theme.white,
  border: `2px solid ${theme.gray}`,
  cursor: "pointer",
  ...flex.CENTER,

  ":first-child": {
    borderRight: "none",
  },
});
