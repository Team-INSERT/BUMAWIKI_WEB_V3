import { flex, font, theme, screen } from "@/styles";
import StyleVariantsType from "@/types/styleVariants.interface";
import { style, styleVariants } from "@vanilla-extract/css";

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

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      display: "none",
    },
  },
});

export const wikiBoxHeader = styleVariants<StyleVariantsType>({
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
  tCell: styleVariants<StyleVariantsType>({
    top: [tCellBase, { borderBottom: `2px solid ${theme.gray}` }],
    bottom: [tCellBase],
  }),
};
