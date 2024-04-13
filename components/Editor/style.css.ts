import { flex, font, theme, screen } from "@/styles";
import StyleVariantsType from "@/types/styleVariants.interface";
import { style, styleVariants } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "calc(100vh - 54px)",
  position: "fixed",
  left: "0",
  top: "54px",
  backgroundColor: theme.gray,
  zIndex: 20,
  ...flex.VERTICAL,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      ...flex.COLUMN_VERTICAL,
    },
  },
});

export const editorBox = style({
  width: "100%",
  height: "100%",
  background: theme.white,
  padding: "42px",
  gap: "12px",
  ...flex.COLUMN_FLEX,

  "@media": {
    [`screen and (max-width: ${screen.tablet})`]: {
      padding: "30px",
    },
  },
});

export const titleInput = style({
  width: "100%",
  color: theme.primary,
  ...font.D4,

  "::placeholder": {
    color: theme.boldgray,
  },

  ":disabled": {
    backgroundColor: "transparent",
  },

  "@media": {
    [`screen and (max-width: ${screen.tablet})`]: {
      ...font.D5,
    },
  },
});

export const previewBox = style({
  width: "100%",
  height: "100%",
  background: theme.preview,
  padding: "42px",
  gap: "12px",
  overflowY: "scroll",
  ...font.p1,
  ...flex.COLUMN_FLEX,
});

export const previewTitle = style({
  color: theme.primary,
  ...font.H1,
});

export const classifyBox = style({
  width: "100%",
  padding: "8px 14px",
  border: `1px solid ${theme.gray}`,
  borderRadius: "4px",
  cursor: "pointer",
  ...font.btn3,
});

export const classify = style({
  color: theme.classify,
  fontWeight: 500,
});

export const preview = style({
  width: "100%",
  height: "100%",
  whiteSpace: "pre-wrap",
});

export const enrollList = style({
  color: theme.boldgray,
  ...flex.VERTICAL,
  ...font.H3_1,

  ":before": {
    content: "|",
  },
});

const yearBase = style({
  cursor: "pointer",
  ...font.H4,

  ":hover": {
    color: theme.primary,
  },

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      ...font.H5,
    },
  },
});

export const year = styleVariants<StyleVariantsType>({
  true: [yearBase, { color: theme.primary }],
  false: [yearBase, { color: theme.boldgray }],
});

export const separator = style({
  width: "70px",
  height: "20px",
  borderBottom: `5px solid ${theme.primary}`,
});

export const undoBtn = style({
  padding: "8px 16px",
  background: theme.primary,
  width: "fit-content",
  color: theme.white,
  borderRadius: "4px",
  ...font.H6,
});

export const docsTypeList = style({
  width: "100%",
  flexWrap: "wrap",
  gap: "14px",
  ...flex.VERTICAL,
});

const docsTypeBase = style({
  padding: "8px 16px",
  borderRadius: "9999px",
  cursor: "pointer",
  ...font.btn3,

  "@media": {
    [`screen and (max-width: ${screen.tablet})`]: {
      padding: "4px 8px",
    },
  },
});

export const docsType = styleVariants<StyleVariantsType>({
  true: [docsTypeBase, { background: theme.primary, color: theme.white }],
  false: [docsTypeBase, { background: theme.preview, color: theme.primary }],
});

export const textarea = style({
  whiteSpace: "pre-wrap",
  width: "100%",
  height: "54%",
  marginTop: "12px",
  ...font.p1,
});

export const writeButton = style({
  position: "fixed",
  left: "44%",
  bottom: "8%",
  transform: "translate(-50%, -50%)",
  padding: "8px 16px",
  background: theme.primary,
  color: theme.white,
  ...font.H6,
  borderRadius: "4px",

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      left: "80%",
      bottom: "5%",
    },
  },
});
