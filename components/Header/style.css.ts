import { theme, flex, font } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  padding: "0 4vw",
  height: "54px",
  backgroundColor: theme.primary,
  position: "fixed",
  zIndex: 10,
  ...flex.BETWEEN,
});

export const navigationList = style({
  gap: "5vw",
  ...flex.HORIZONTAL,

  "@media": {
    "(max-width: 950px)": {
      gap: "3vw",
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
    "(max-width: 950px)": {
      height: "25px",
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
    "(max-width: 950px)": {
      right: "5px",
    },
  },
});

export const logo = style({
  cursor: "pointer",
});

export const ItemText = style({
  "@media": {
    "(max-width: 950px)": {
      display: "none",
    },
  },
});

export const utilityBox = style({
  ...flex.HORIZONTAL,
  gap: "24px",
});

export const loginUtilityBox = style({
  gap: "18px",
  ...flex.VERTICAL,
});

export const writeButton = style({
  padding: "8px 14px",
  color: theme.primary,
  backgroundColor: theme.white,
  borderRadius: "9999px",
  ...font.btnBold,

  "@media": {
    "(max-width: 768px)": {
      display: "none",
    },
  },
});

export const textarea = style({
  width: "100%",
  height: "100%",
});
