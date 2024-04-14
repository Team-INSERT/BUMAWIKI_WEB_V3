import { flex, font, screen, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "100%",
  backgroundColor: theme.white,
  position: "absolute",
  top: "0",
  left: "0",
  borderRight: `8px solid ${theme.primary}`,
  gap: "5%",
  padding: "5%",
  ...flex.VERTICAL,
});

export const content = style({
  ...font.H5,
  ...flex.BETWEEN,
});

export const icon = style({
  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      width: "18px",
      height: "18px",
    },
  },
});
