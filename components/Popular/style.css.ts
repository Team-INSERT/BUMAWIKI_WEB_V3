import { style, styleVariants } from "@vanilla-extract/css";
import { flex, font, theme } from "@/styles";
import StyleVariantsType from "@/types/styleVariants.type";
import { popularAnimation } from "./keyframes.css";

const containerBase = style({
  background: theme.white,
  width: "300px",
  height: "90px",
  borderTop: "none",
  zIndex: 100,
});

export const container = styleVariants<StyleVariantsType>({
  open: [containerBase],
  close: [containerBase, { overflow: "hidden", borderBottom: `2px solid ${theme.gray}` }],
});

export const titleBox = style({
  backgroundColor: theme.primary,
  borderLeft: "none",
  borderRight: "none",
  width: "100%",
  height: "46px",
  padding: "0 20px",
  color: theme.white,
  ...font.H5,
  ...flex.VERTICAL,
});

export const docsList = style({
  overflow: "hidden",
  border: `2px solid ${theme.gray}`,
  ...flex.COLUMN_FLEX,
});

const docsListItemBase = style({
  width: "100%",
  height: "44px",
  padding: "0 16px",
  gap: "12px",
  backgroundColor: theme.white,
  cursor: "pointer",
  ...flex.VERTICAL,
});

export const docsListItem = styleVariants<StyleVariantsType>({
  open: [docsListItemBase],
  close: [docsListItemBase, { animation: `${popularAnimation} 20s infinite forwards ease-in-out` }],
});

export const ranking = style({
  ...font.H4,
});

export const docsName = style({
  color: theme.primary,
  ...font.H6,

  ":hover": {
    textDecoration: "underline",
  },
});

export const thumbsUpsCountsBox = style({
  marginLeft: "auto",
  gap: "4px",
  ...font.btn3,
  ...flex.VERTICAL,
});

export const hoverList = style({
  width: "400px",
  height: "400px",
  position: "absolute",
  zIndex: 50,
});
