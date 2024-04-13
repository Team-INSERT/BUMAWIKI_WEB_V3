import { theme, flex, font, screen } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "73%",
  ...flex.COLUMN_BETWEEN,
  borderLeft: `2px solid ${theme.gray}`,
  borderRight: `2px solid ${theme.gray}`,
  backgroundColor: theme.white,
  margin: "0 20px 0 40px",

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      width: "100%",
      margin: "0",
    },
  },
});

export const board = style({
  width: "100%",
  height: "fit-content",
  padding: "30px",
  wordBreak: "break-all",
  ...flex.COLUMN_FLEX,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      marginTop: "54px",
    },
  },
});

export const subFooter = style({
  width: "96%",
  borderTop: `2px solid ${theme.gray}`,
  padding: "10px 0",
  ...flex.COLUMN_FLEX,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      display: "none",
    },
  },
});

export const logo = style({
  marginLeft: "auto",
});

export const noticeText = style({
  ...font.H6,
  textAlign: "right",
});
