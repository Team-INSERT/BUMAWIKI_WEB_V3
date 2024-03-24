import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "100%",
  backgroundColor: theme.white,
  position: "absolute",
  top: "0",
  left: "0",
  ...flex.FLEX,
});

export const contentBox = style({
  width: "100%",
  gap: "5%",
  padding: "5%",
  ...flex.VERTICAL,
});

export const content = style({
  ...font.p1,
  fontWeight: "700",
  ...flex.BETWEEN,
});

export const sideBar = style({
  width: "4%",
  height: "100%",
  backgroundColor: theme.primary,
});

export const icon = style({
  width: "23px",
  height: "23px",

  "@media": {
    "(max-width: 600px)": {
      width: "18px",
      height: "18px",
      margin: "10px",
    },
  },
});
