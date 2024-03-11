import { style } from "@vanilla-extract/css";
import { flex, font, theme } from "@/styles";
import { popularAnimation } from "./keyframes.css";

export const body = style({
  width: "300px",
  height: "90px",
  ...flex.COLUMN_FLEX,
});

export const container = style({
  background: theme.white,
  border: `2px solid ${theme.gray}`,
  height: "100%",
  borderTop: "none",
  overflow: "hidden",
});

export const titleBox = style({
  backgroundColor: theme.primary,
  border: `2px solid ${theme.gray}`,
  borderLeft: "none",
  borderRight: "none",
  width: "100%",
  height: "46px",
  ...flex.VERTICAL,
});

export const titleText = style({
  marginLeft: "20px",
  color: theme.white,
  ...font.H5,
});

export const docsList = style({
  overflow: "hidden",
  ...flex.COLUMN_FLEX,
});

export const docsListItem = style({
  width: "100%",
  height: "44px",
  padding: "0 16px",
  gap: "12px",
  animationDuration: "20s",
  animationFillMode: "forwards",
  animationIterationCount: "infinite",
  animationName: popularAnimation,
  animationTimingFunction: "ease-in-out",
  cursor: "pointer",
  ...flex.VERTICAL,
});

export const ranking = style({
  ...font.H4,
});

export const docsName = style({
  color: theme.primary,
  ...font.H5,

  ":hover": {
    textDecoration: "underline",
  },
});
