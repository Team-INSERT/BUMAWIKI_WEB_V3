import { style } from "@vanilla-extract/css";
import { flex, theme } from "@/styles";

export const scrollButtonWrap = style({
  position: "fixed",
  right: "13%",
  bottom: "5%",
  zIndex: "2",
  ...flex.FLEX,
});

export const scrollButton = style({
  selectors: {
    "&:first-child": {
      borderRight: "none",
    },
  },
  width: "40px",
  height: "40px",
  background: theme.primary,
  color: theme.white,
  border: `2px solid ${theme.gray}`,
  cursor: "pointer",
  ...flex.CENTER,
});