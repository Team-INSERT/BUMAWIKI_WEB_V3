import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  gap: "24px",
  ...flex.COLUMN_FLEX,
});

export const body = style({
  width: "100%",
  whiteSpace: "pre-wrap",
  ...font.p1,
});

export const contributorsBox = style({
  width: "fit-content",
  gap: "12px",
  marginLeft: "auto",
  ...flex.COLUMN_FLEX,
});

export const contributorTitle = style({
  color: theme.boldgray,
  marginLeft: "auto",
  ...font.H6,
});

export const contributorList = style({
  width: "30vw",
  marginLeft: "auto",
  flexWrap: "wrap",
  gap: "12px",
  ...flex.VERTICAL,
});

export const contributor = style({
  ...font.p3,
  marginLeft: "auto",

  ":hover": {
    textDecoration: "underline",
  },
});

export const warning = style({
  color: theme.red,
  ...font.H6,
});
