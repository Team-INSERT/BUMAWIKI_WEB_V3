import { flex, font, theme } from "@/styles";
import { StyleVariantsType } from "@/types";
import { style, styleVariants } from "@vanilla-extract/css";

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
  padding: "30px",
  ...flex.COLUMN_BETWEEN,
});

export const contents = style({
  width: "100%",
  height: "30%",
  padding: "0 20px",
  textAlign: "center",
  whiteSpace: "pre-wrap",
  color: theme.primary,
  ...font.H4,
  ...flex.CENTER,
});

export const buttonBox = style({
  width: "100%",
  gap: "2%",
  ...flex.END,
});

const buttonBase = style({
  padding: "6px 22px",
  borderRadius: "8px",
  ...font.btn1,
});

export const button = styleVariants<StyleVariantsType>({
  confirm: [buttonBase, { backgroundColor: theme.primary, color: theme.white }],
  cancel: [buttonBase, { backgroundColor: theme.line, color: theme.black }],
});
