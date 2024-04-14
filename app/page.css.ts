import { theme, font, flex, screen } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  backgroundColor: theme.classify,
  ...font.D1,
});

export const introduce = {
  body: style({
    width: "100%",
    padding: "20px 0",
    gap: "36px",
    ...flex.COLUMN_FLEX,
  }),
  box: style({
    ...flex.COLUMN_CENTER,
  }),
  title: style({
    color: theme.title,
    ...font.H1,

    "@media": {
      [`screen and (max-width: ${screen.phone})`]: {
        ...font.H2,
      },
    },
  }),
  highlight: style({
    color: theme.primary,
  }),
  subtitle: style({
    color: theme.title,
    ...font.p1,
  }),
  description: style({
    color: theme.title,
    textAlign: "center",
    ...font.p2,
  }),
  caution: style({
    color: theme.red,
    fontWeight: 600,
  }),
};

export const utility = {
  body: style({
    width: "100%",
    gap: "12px",
    ...flex.CENTER,
  }),
  href: style({
    color: theme.link,
  }),
};

export const table = {
  container: style({
    width: "100%",
    padding: "20px 0",
    ...flex.COLUMN_CENTER,
  }),
  body: style({
    width: "70%",
    ...flex.COLUMN_FLEX,

    "@media": {
      [`screen and (max-width: ${screen.phone})`]: {
        width: "100%",
      },
    },
  }),
  thead: style({
    width: "100%",
    padding: "14px 0",
    border: `2px solid ${theme.gray}`,
    color: theme.white,
    backgroundColor: theme.primary,
    ...flex.COLUMN_CENTER,
  }),
  title: style({
    ...font.H3,
  }),
  subtitle: style({
    ...font.p2,
  }),
  primaryImage: style({
    width: "100%",
    height: "auto",
    border: `2px solid ${theme.gray}`,
    borderTop: "none",
  }),
  tr: style({
    width: "100%",
    height: "46px",
    border: `2px solid ${theme.gray}`,
    borderTop: "none",
    ...flex.VERTICAL,
  }),
  tName: style({
    width: "18%",
    height: "100%",
    color: theme.white,
    backgroundColor: theme.primary,
    ...font.H6,
    ...flex.CENTER,

    "@media": {
      [`screen and (max-width: ${screen.phone})`]: {
        ...font.p3,
      },
    },
  }),
  tContent: style({
    width: "82%",
    height: "100%",
    color: theme.title,
    padding: "0 20px",
    fontWeight: 600,
    ...flex.VERTICAL,
  }),
};

export const outline = {
  description: style({
    ...font.p1,
    whiteSpace: "pre-wrap",
  }),
  warning: style({
    fontWeight: 700,
    whiteSpace: "pre-wrap",
  }),
  departmentTitle: style({
    ...font.H3,
  }),
};
