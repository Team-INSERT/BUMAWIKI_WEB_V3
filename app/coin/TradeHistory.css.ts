import { flex, font, theme, screen } from "@/styles";
import { StyleVariantsType } from "@/types";
import { style, styleVariants } from "@vanilla-extract/css";

export const tradeListBox = style({
  width: "100%",
  padding: "16px",
  borderBottom: `1px solid ${theme.gray}`,
  cursor: "pointer",
  gap: "10px",
  ...flex.COLUMN_FLEX,

  ":hover": {
    backgroundColor: theme.hover,
  },
});

export const hgroup = style({
  gap: "8px",
  ...flex.VERTICAL,

  "@media": {
    [`screen and (max-width: ${screen.phone})`]: {
      ...flex.COLUMN_CENTER,
    },
  },
});

export const tradeId = style({
  color: theme.primary,
  ...font.H5,
});

export const createdAt = style({
  color: theme.boldgray,
  ...font.p2,
});

export const informationText = style({
  cursor: "pointer",
  width: "fit-content",
  gap: "4px",
  ...font.btn2,
  ...flex.VERTICAL,
});

export const informationBox = style({
  gap: "18px",
  ...flex.VERTICAL,
});

export const cancelButton = style({
  width: "fit-content",
  padding: "6px 14px",
  backgroundColor: theme.red,
  borderRadius: "6px",
  color: theme.white,
  ...font.btn3,
});

export const tradeStatusCircleBase = style({
  width: "16px",
  height: "16px",
  borderRadius: "999px",
});

export const tradeStatusCircle = styleVariants<StyleVariantsType>({
  BUYING: [tradeStatusCircleBase, { backgroundColor: theme.insert }],
  SELLING: [tradeStatusCircleBase, { backgroundColor: theme.insert }],
  BOUGHT: [tradeStatusCircleBase, { backgroundColor: theme.buy }],
  SOLD: [tradeStatusCircleBase, { backgroundColor: theme.sell }],
  CANCELLED: [tradeStatusCircleBase, { backgroundColor: theme.gray }],
  DELISTING: [tradeStatusCircleBase, { backgroundColor: theme.black }],
});
