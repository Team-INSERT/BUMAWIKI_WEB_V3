import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const details = style({
  width: "100%",
  paddingBottom: "50px",
});

export const summary = style({
  width: "100%",
  borderBottom: `1px solid ${theme.gray}`,
  margin: "20px 0",
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
  gap: "12px",
  ...flex.COLUMN_FLEX,
});
