import { flex, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "100px",
});

export const title = style({
  textAlign: "center",
  lineHeight: "45px",
});

export const details = style({});

export const summary = style({
  width: "100%",
  height: "45px",
  borderBottom: `1.5px solid ${theme.gray}`,
  margin: "10px 0",
  fontWeight: 800,
  color: theme.primary,
  fontSize: "30px",
  cursor: "pointer",
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
