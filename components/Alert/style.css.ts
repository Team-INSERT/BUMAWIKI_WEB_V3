import { font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const background = style({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ececec50",
  zIndex: "11",
  position: "fixed",
});

export const container = style({
  width: "30vw",
  height: "17vw",
  borderRadius: "12px",
  backgroundColor: theme.white,
  boxShadow: `0px 2px 5px 1px ${theme.gray}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  margin: "0 auto",
});

export const wrapper = style({
  width: "85%",
  height: "90%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

export const logoWrapper = style({
  margin: "3%",
});

export const contentBox = style({
  width: "100%",
  height: "30%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const content = style({
  width: "90%",
  height: "auto",
  textAlign: "center",
  whiteSpace: "normal",
  ...font.H3,
  color: theme.primary,
});

export const buttonBox = style({
  width: "100%",
  height: "17%",
  display: "flex",
  alignItems: "center",
  marginTop: "3%",
  gap: "2%",
});

export const confirmBtn = style({
  width: "25%",
  height: "100%",
  backgroundColor: theme.primary,
  color: theme.white,
  borderRadius: "8px",
  marginLeft: "auto",
  ...font.btn1,
});

export const line = style({
  width: "100%",
  height: "2px",
  backgroundColor: "#F0F0F0",
  marginTop: "auto",
});
