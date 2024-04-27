import { flex, font, theme } from "@/styles";
import { ComplexStyleRule, style, styleVariants } from "@vanilla-extract/css";

export const container = style({
  left: "0",
  top: "0",
  backgroundColor: theme.background,
  position: "fixed",
  zIndex: "100",
  width: "100vw",
  height: "100vh",
  ...flex.COLUMN_CENTER,
});

export const titleBox = style({
  width: "90%",
  height: "15%",
  backgroundColor: theme.white,
  borderRight: `2px solid ${theme.gray}`,
  borderLeft: `2px solid ${theme.gray}`,

  ...flex.COLUMN_CENTER,
});

export const titleBar = style({
  width: "95%",

  ...flex.BETWEEN,
});

export const title = style({
  color: theme.primary,
  ...font.H1,
});

export const notice = style({
  width: "95%",
  color: theme.red,
});

export const comparingBox = style({
  width: "90%",
  height: "85%",

  borderRight: `2px solid ${theme.gray}`,
  borderLeft: `2px solid ${theme.gray}`,
  ...flex.COLUMN_CENTER,
});

export const docsList = style({
  width: "100%",
  height: "3rem",
  ...flex.FLEX,
});

export const docsItem = style({
  width: "33.33%",
  height: "100%",
  backgroundColor: theme.primary,
  color: theme.white,

  ...flex.CENTER,
});

export const docsItemText = style({
  width: "100%",
  height: "1rem",
  textAlign: "center",
  backgroundColor: theme.red,
});

export const changeList = style({
  width: "100%",
  height: "100%",
  backgroundColor: theme.white,
  overflowY: "scroll",

  "::-webkit-scrollbar": {
    display: "none",
  },

  ...flex.CENTER,
});

export const changeItem = style({
  height: "100%",
  width: "33.33%",

  ...flex.COLUMN_VERTICAL,
});

export const itemBase = style({
  whiteSpace: "nowrap",
  width: "100%",

  ...flex.FLEX,
});

export const select = style({
  width: "10%",
  height: "100%",
  textAlign: "center",
  cursor: "pointer",
});

export const text = style({
  width: "100%",
  height: "1.5rem",
  overflowX: "auto",

  "::-webkit-scrollbar": {
    display: "none",
  },
});

export const item = styleVariants<Record<string, ComplexStyleRule>>({
  DIFFERENTS: [itemBase, { background: theme.insert }],
  DIFFERENT1: [itemBase, { background: theme.insert }],
  DIFFERENT2: [itemBase, { background: theme.insert }],
  DIFFERENT: [itemBase, { background: theme.insert }],
  DELETE1: [itemBase, { background: theme.delete }],
  DELETE2: [itemBase, { background: theme.delete }],
  DELETE: [itemBase, { background: theme.delete }],
  DELETES: [itemBase, { background: theme.delete }],
  EMPTY: [itemBase, { backgroundColor: theme.empty }],
  EQUAL: [itemBase, { background: theme.white }],
  INSERT: [itemBase, { background: theme.insert }],
  UNDEFINED: [itemBase, { backgroundColor: theme.empty }],
});

export const str = style({
  ...flex.COLUMN_VERTICAL,
});

export const writeButton = style({
  position: "fixed",
  right: "5%",
  bottom: "8%",
  padding: "8px 16px",
  background: theme.primary,
  color: theme.white,
  borderRadius: "4px",
  ...font.H6,
});

export const rollBackButton = style({
  padding: "8px 16px",
  background: theme.primary,
  color: theme.white,
  borderRadius: "4px",
  ...font.H6,
});
