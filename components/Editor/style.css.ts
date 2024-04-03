import { flex, font, theme } from "@/styles";
import { ComplexStyleRule, style, styleVariants } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "calc(100vh - 54px)",
  position: "fixed",
  left: "0",
  top: "54px",
  backgroundColor: theme.gray,
  zIndex: 20,
  ...flex.VERTICAL,
});

export const editorBox = style({
  width: "100%",
  height: "100%",
  background: theme.white,
  padding: "42px",
  gap: "12px",
  ...flex.COLUMN_FLEX,
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
});

const yearBase = style({
  cursor: "pointer",

  ":hover": {
    color: theme.primary,
  },
});

export const year = styleVariants<Record<string, ComplexStyleRule>>({
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
});

export const docsType = styleVariants<Record<string, ComplexStyleRule>>({
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

const wikiBoxHeaderBase = style({
  width: "100%",
  height: "fit-content",
  backgroundColor: theme.primary,
  left: 0,
  bottom: 0,
  position: "fixed",
  padding: "10px 24px",
  cursor: "pointer",
  ...flex.BETWEEN,
});

export const wikiBoxHeader = styleVariants<Record<string, ComplexStyleRule>>({
  true: [wikiBoxHeaderBase, { bottom: "260px" }],
  false: [wikiBoxHeaderBase, { bottom: 0 }],
});

export const wikiTitle = style({
  color: theme.white,
  ...font.H5,
});

const tCellBase = style({
  width: "100%",
  height: "100%",
  padding: "4px 12px",
  ...flex.VERTICAL,
});

export const footer = {
  body: style({
    width: "100%",
    height: "260px",
    left: 0,
    bottom: 0,
    position: "fixed",
    background: theme.white,
    ...flex.VERTICAL,
  }),
  wrap: style({
    width: "100%",
    height: "100%",
    ...flex.COLUMN_FLEX,
  }),
  box: style({
    width: "100%",
    height: "100%",
    border: `1px solid ${theme.gray}`,
    ...flex.VERTICAL,
  }),
  tHead: style({
    width: "18%",
    height: "100%",
    borderRight: `1px solid ${theme.gray}`,
    color: theme.white,
    backgroundColor: theme.primary,
    textAlign: "center",
    ...flex.CENTER,
  }),
  tItem: style({
    width: "82%",
    cursor: "pointer",
    height: "100%",
    ...flex.COLUMN_FLEX,
  }),
  tCell: styleVariants<Record<string, ComplexStyleRule>>({
    top: [tCellBase, { borderBottom: `2px solid ${theme.gray}` }],
    bottom: [tCellBase],
  }),
};

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
});
