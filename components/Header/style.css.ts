import { theme, flex, font, screen } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  padding: "0 4vw",
  height: "54px",
  backgroundColor: theme.primary,
  position: "fixed",
  zIndex: 10,
  ...flex.BETWEEN,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      width: "100w",
      fontSize: "0px",
    },
  },
});

export const searchBox = style({
  position: "relative",
  ...flex.END,
});

export const searchInput = style({
  width: "16vw",
  height: "30px",
  position: "relative",
  padding: "0 10px",
  fontWeight: 500,
  backgroundColor: theme.white,
  border: `1px solid ${theme.gray}`,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      width: "10vw",
      height: "20px",
      "::placeholder": {
        opacity: 0,
      },
    },
  },
});

export const searchButton = style({
  position: "absolute",
  right: "12px",
  cursor: "pointer",

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      height: "12px",
      right: "2px",
    },
  },
});

export const logo = style({
  cursor: "pointer",

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      width: "100%",
    },
  },
});

export const utilityBox = style({
  ...flex.HORIZONTAL,
  gap: "24px",

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      gap: "10px",
    },
  },
});

export const writeButton = style({
  padding: "8px 14px",
  color: theme.primary,
  backgroundColor: theme.white,
  borderRadius: "9999px",
  ...font.btnBold,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      lineHeight: "200%",
      padding: "3px 5px",
    },
  },
});

export const textarea = style({
  width: "100%",
  height: "100%",
});

export const navigationList = style({
  gap: "4.5vw",
  ...flex.HORIZONTAL,

  "@media": {
    [`screen and (max-width: ${screen.tablet})`]: {
      gap: "3vw",
    },
    [`screen and (max-width: ${screen.phone})`]: {
      gap: "2vw",
    },
  },
});

export const navigationItem = style({
  color: theme.white,
  fontWeight: 600,
  gap: "6px",
  ...flex.VERTICAL,
  ":hover": {
    opacity: 0.8,
  },
});

export const ItemText = style({
  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      display: "none",
    },
  },
});
