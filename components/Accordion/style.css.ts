import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
});

export const title = style({
  textAlign: "center",
  lineHeight: "45px",
});

export const details = style({
  paddingBottom: "50px",
});

export const summary = style({
  width: "100%",
  height: "45px",
  borderBottom: `1.5px solid ${theme.gray}`,
  margin: "10px 0",
  color: `${theme.primary}94`,
  cursor: "pointer",
  ...font.H2,
  ...flex.FLEX,
  selectors: {
    [`${details}[open] > &`]: {
      color: theme.primary,
    },
    [`${details} > &:before`]: {
      content: "",
      display: "inline-block",
      width: "40px",
      height: "40px",
      background: "url('/assets/arrow_right.svg')",
    },
    [`${details}[open] > &:before`]: {
      background: "url('/assets/arrow_down.svg')",
    },
  },
});

export const content = style({
  padding: "10px 20px",
  gap: "12px",
  ...flex.COLUMN_FLEX,
});
