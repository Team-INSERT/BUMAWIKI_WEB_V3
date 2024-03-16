import { font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "100%",
  backgroundColor: theme.white,
  position: "absolute",
  top: "0",
  left: "0",
  display: "flex",
});

export const contentBox = style({
  width: "85%",
  display: "flex",
  alignItems: "center",
  gap: "5%",
  marginLeft: "auto",
});

export const content = style({
  ...font.p1,
  fontWeight: "700",
});

export const sideBar = style({
  width: "4%",
  height: "100%",
  backgroundColor: theme.primary,
  marginLeft: "auto",
});
