import { theme, flex, font } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "80%",
  ...flex.COLUMN_START,
  borderLeft: `2px solid ${theme.gray}`,
  borderRight: `2px solid ${theme.gray}`,
  backgroundColor: theme.white,
  margin: "0 20px 0 40px",
});

export const board = style({
  width: "100%",
  height: "fit-content",
  minHeight: "120svh",
  padding: "30px",
  ...flex.COLUMN_FLEX,
});

export const subFooter = style({
  width: "96%",
  borderTop: `2px solid ${theme.gray}`,
  padding: "10px 0",
  ...flex.COLUMN_FLEX,
});

export const subFooterLogo = style({
  marginLeft: "auto",
});

export const subFooterNoticeText = style({
  ...font.H6,
  textAlign: "right",
});
