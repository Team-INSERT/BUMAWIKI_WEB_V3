import { flex, font, theme } from "@/styles";
import { ComplexStyleRule, style, styleVariants } from "@vanilla-extract/css";

export const tradeListBox = style({
  width: "100%",
  padding: "16px",
  borderBottom: `1px solid ${theme.gray}`,
  cursor: "pointer",
  gap: "10px",
  ...flex.COLUMN_FLEX,

  ":hover": {
    background: theme.hover,
  },
});

export const hgroup = style({
  gap: "8px",
  ...flex.VERTICAL,

  "@media": {
    "screen and (max-width: 480px)": {
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
  background: theme.red,
  borderRadius: "6px",
  color: theme.white,
  ...font.btn3,
});

export const tradeStatusCircleBase = style({
  width: "16px",
  height: "16px",
  borderRadius: "999px",
});

export const tradeStatusCircle = styleVariants<Record<string, ComplexStyleRule>>({
  BUYING: [tradeStatusCircleBase, { background: theme.insert }],
  SELLING: [tradeStatusCircleBase, { background: theme.insert }],
  BOUGHT: [tradeStatusCircleBase, { background: theme.buy }],
  SOLD: [tradeStatusCircleBase, { background: theme.sell }],
  CANCELLED: [tradeStatusCircleBase, { background: theme.gray }],
  DELISTING: [tradeStatusCircleBase, { background: theme.black }],
});
