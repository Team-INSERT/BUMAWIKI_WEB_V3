import { theme, flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  minHeight: "100svh",
  backgroundColor: theme.background,
  padding: "52px 20px 0 20px",
  ...flex.FLEX,

  "@media": {
    "(max-width: 950px)": {
      display: "inline",
    },
  },
});

export const asideBox = style({
  height: "100%",
  position: "sticky",
  top: "70px",
  width: "300px",
  gap: "12px",
  ...flex.COLUMN_FLEX,

  "@media": {
    "(max-width: 950px)": {
      top: "0",
      position: "static",
      width: "100%",
      gap: "0",
      marginBottom: "100px",
    },
  },
});
