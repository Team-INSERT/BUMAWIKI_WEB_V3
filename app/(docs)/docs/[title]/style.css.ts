import { flex, font, theme, screen } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  gap: "24px",
  ...flex.COLUMN_FLEX,
});

export const header = style({
  width: "100%",
  marginBottom: "40px",
  ...flex.BETWEEN,
});

export const body = style({
  width: "100%",
  whiteSpace: "pre-wrap",
  ...font.p1,
});

export const likeButton = style({
  gap: "6px",
  cursor: "pointer",
  ...font.H6,
  ...flex.VERTICAL,
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

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      width: "100%",
    },
  },
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

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      ...font.p4,
    },
  },
});
