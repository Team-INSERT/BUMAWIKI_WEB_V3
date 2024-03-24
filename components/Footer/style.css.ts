import { font, flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100vw",
  height: "22vh",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  ...flex.COLUMN_CENTER,

  "@media": {
    "(max-width: 950px)": {
      height: "30vh",
    },
  },
});

export const footerLinkBox = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0",
});

export const separator = style({
  margin: "0 20px 0 20px",
  width: "2px",
  height: "25px",
  backgroundColor: "black",
});

export const informationBox = style({
  marginTop: "12px",
});

export const information = style({
  ...font.context,
});
