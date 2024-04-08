import { theme, flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  minHeight: "100svh",
  backgroundColor: theme.background,
  paddingTop: "52px",
  ...flex.FLEX,
});

export const aside = style({
  height: "100%",
  position: "sticky",
  top: "70px",
  width: "300px",
  gap: "12px",
  ...flex.COLUMN_FLEX,

  "@media": {
    "screen and (max-width: 480px)": {
      display: "none",
    },
  },
});
