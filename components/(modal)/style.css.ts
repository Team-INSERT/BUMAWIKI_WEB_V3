import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const background = style({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.cover,
  zIndex: "30",
  position: "fixed",
});

export const container = style({
  width: "30vw",
  height: "17vw",
  borderRadius: "12px",
  backgroundColor: theme.white,
  boxShadow: `0px 2px 5px 1px ${theme.gray}`,
  position: "absolute",
  margin: "0 auto",
  ...flex.CENTER,
});

export const wrapper = style({
  width: "85%",
  height: "90%",
  ...flex.COLUMN_VERTICAL,
});

export const logoWrapper = style({
  padding: "3%",
});

export const contentBox = style({
  width: "100%",
  height: "30%",
  ...flex.CENTER,
});

export const content = style({
  width: "90%",
  height: "auto",
  textAlign: "center",
  whiteSpace: "normal",
  color: theme.primary,
  ...font.H3,
});

export const buttonBox = style({
  width: "100%",
  height: "17%",
  marginTop: "3%",
  gap: "2%",
  ...flex.BETWEEN,
});

export const cancelBtn = style({
  width: "20%",
  height: "100%",
  backgroundColor: theme.line,
  marginLeft: "auto",
  borderRadius: "8px",
  ...font.btn1,
});

export const confirmBtn = style({
  width: "25%",
  height: "100%",
  backgroundColor: theme.primary,
  right: "0",
  color: theme.white,
  borderRadius: "8px",
  ...font.btn1,
});

export const line = style({
  width: "100%",
  height: "2px",
  backgroundColor: theme.line,
  marginTop: "auto",
});
