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
});

export const searchButton = style({
  position: "absolute",
  right: "12px",
  cursor: "pointer",
});

export const logo = style({
  cursor: "pointer",
});

export const utilityBox = style({
  ...flex.HORIZONTAL,
  gap: "24px",
});

export const writeButton = style({
  padding: "8px 14px",
  color: theme.primary,
  backgroundColor: theme.white,
  borderRadius: "9999px",
  ...font.btnBold,
});

export const textarea = style({
  width: "100%",
  height: "100%",
});

export const navigationList = style({
  gap: "4.5vw",
  ...flex.HORIZONTAL,
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
