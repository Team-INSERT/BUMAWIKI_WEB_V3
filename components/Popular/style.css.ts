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
  position: "relative",
});

export const openContainer = style({
  background: theme.white,
  height: "100%",
  position: "relative",
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

export const titleOpenBox = style({
  backgroundColor: theme.primary,
  border: `2px solid ${theme.gray}`,
  borderBottom: "none",
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

export const docsOpenList = style({
  backgroundColor: theme.white,
  zIndex: 500,
  border: `2px solid ${theme.gray}`,
  ...flex.COLUMN_FLEX,
});

export const docsListItem = style({
  width: "100%",
  height: "44px",
  padding: "0 16px",
  gap: "12px",
  backgroundColor: theme.white,
  animationDuration: "20s",
  animationFillMode: "forwards",
  animationIterationCount: "infinite",
  animationName: popularAnimation,
  animationTimingFunction: "ease-in-out",
  cursor: "pointer",
  ...flex.VERTICAL,
});

export const docsOpenListItem = style({
  width: "100%",
  height: "44px",
  padding: "0 16px",
  gap: "12px",
  backgroundColor: theme.white,
  cursor: "pointer",
  ...flex.VERTICAL,
});

export const ranking = style({
  ...font.H4,
});

export const docsName = style({
  color: theme.primary,
  ...font.H6,

  ":hover": {
    textDecoration: "underline",
  },
});

export const thumbsUpsCountsBox = style({
  marginLeft: "auto",
  gap: "4px",
  ...font.btn3,
  ...flex.VERTICAL,
});

export const hoverList = style({
  width: "400px",
  height: "400px",
  backgroundColor: "green",
  position: "absolute",
  zIndex: 50,
});
