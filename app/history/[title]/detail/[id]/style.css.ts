import { flex, font, theme } from "@/styles";
import StyleVariantsType from "@/types/styleVariants.interface";
import { style, styleVariants } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  gap: "24px",
  ...flex.COLUMN_FLEX,
});

export const author = style({
  ...font.H6,

  ":hover": {
    textDecoration: "underline",
  },
});

export const historyBox = style({
  ...flex.COLUMN_FLEX,
});

export const historyContent = style({
  width: "100%",
  ...flex.VERTICAL,
});

const historyBase = style({
  width: "100%",
  padding: "6px 8px",
  gap: "12px",
  minHeight: "20px",
  whiteSpace: "pre-wrap",
  opacity: 0.7,
  ...flex.VERTICAL,
});

export const history = styleVariants<StyleVariantsType>({
  INSERT: [historyBase, { background: theme.insert }],
  DELETE: [historyBase, { background: theme.delete }],
  EQUAL: [historyBase, { background: theme.equal }],
});

const historyOperationBase = style({
  width: "20px",
  height: "100%",
  ...flex.CENTER,
});

export const historyOperation = styleVariants<StyleVariantsType>({
  INSERT: [historyOperationBase, { background: theme.insert }],
  DELETE: [historyOperationBase, { background: theme.delete }],
  EQUAL: [historyOperationBase, { background: theme.equal }],
});
