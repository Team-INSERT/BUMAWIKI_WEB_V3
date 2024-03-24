import { style } from "@vanilla-extract/css";
import { flex, theme } from "@/styles";

export const scrollButtonWrap = style({
  position: "fixed",
  left: "2%",
  bottom: "3%",
  zIndex: "2",
  ...flex.FLEX,

  "@media": {
    "(max-width: 950px)": {
      right: "2%",
    },
  },
});

export const scrollButton = style({
  selectors: {
    "&:first-child": {
      borderRight: "none",

      "@media": {
        "(max-width: 950px)": {
          marginLeft: "auto",
        },
      },
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
