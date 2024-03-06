import { theme, flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  padding: "0 4vw",
  height: "54px",
  backgroundColor: theme.primary,
  position: "fixed",
  ...flex.BETWEEN,
});

export const navigationList = style({
  gap: "5vw",
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
