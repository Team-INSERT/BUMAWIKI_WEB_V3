import { flex, font, screen, theme } from "@/styles";
import { StyleVariantsType } from "@/types";
import { style, styleVariants } from "@vanilla-extract/css";

export const managementContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const managementTabContainer = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
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

export const deleteButton = style({
  padding: "8px 16px",
  borderRadius: "9999px",
  cursor: "pointer",
  background: theme.red,
  color: theme.white,
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

export const docs = style({
  width: "100%",
  height: "100px",
  gap: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      width: "100%",
    },
  },
});

export const searchBox = style({
  position: "relative",
  ...flex.END,
});

export const line = style({
  width: "100%",
  height: "1px",
  backgroundColor: theme.gray,
});

export const searchInput = style({
  width: "16vw",
  height: "30px",
  position: "relative",
  padding: "0 10px",
  fontWeight: 500,
  backgroundColor: theme.white,
  border: `1px solid ${theme.gray}`,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      width: "10vw",
      height: "20px",
      "::placeholder": {
        opacity: 0,
      },
    },
  },
});
