import { keyframes, style } from "@vanilla-extract/css";
import { theme, font, flex, screen } from ".";

export const details = style({
  width: "100%",
  paddingBottom: "10px",
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

  "@media": {
    [`screen and (max-width: ${screen.tablet})`]: {
      lineHeight: "200%",
    },
    [`screen and (max-width: ${screen.phone})`]: {
      lineHeight: "250%",
    },
  },
});

export const link = style({
  color: theme.link,
  ":hover": {
    textDecoration: "underline",
  },
});

export const block = style({
  width: "100%",
  height: "fit-content",
  border: `1px solid ${theme.black}`,
  backgroundColor: `${theme.hover}`,
  padding: "16px 20px",
  margin: "10px 0",
  ...flex.COLUMN_FLEX,
  ...font.H5,
});

export const quote = style({
  width: "100%",
  backgroundColor: theme.hover,
  border: `1px solid ${theme.gray}`,
  padding: "10px 20px",
  ...font.H6,
  ...flex.COLUMN_FLEX,
});

const shakeAnimation = keyframes({
  "0%": {
    transform: "translateX(10px)",
  },
  "25%": {
    transform: "translateX(-10px)",
  },
  "50%": {
    transform: "translateX(30px)",
  },
  "75%": {
    transform: "translateX(-10px)",
  },
  "100%": {
    transform: "translateX(10px)",
  },
});

export const shake = style({
  animation: `${shakeAnimation} 0.5s linear infinite`,
});

const spinAnimation = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const spin = style({
  animation: `${spinAnimation} 0.5s linear infinite`,
});

export const rainbow = style({
  backgroundImage: "linear-gradient(90deg, red, orange, yellow, green, blue, navy, purple)",
  WebkitBackgroundClip: "text",
  color: "transparent",
});
