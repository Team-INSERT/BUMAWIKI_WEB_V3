import { theme, flex, screen } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  minHeight: "100svh",
  backgroundColor: theme.background,
  paddingTop: "52px",
  ...flex.FLEX,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      display: "inline",
    },
  },
});

export const aside = style({
  height: "100%",
  position: "sticky",
  top: "70px",
  width: "300px",
  gap: "12px",
  ...flex.COLUMN_FLEX,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      top: "0",
      position: "static",
      width: "100%",
      gap: "0",
      marginBottom: "100px",
    },
  },
});
