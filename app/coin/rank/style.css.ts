import { flex, font, theme } from "@/styles";
import { ComplexStyleRule, style, styleVariants } from "@vanilla-extract/css";

export const rankingBox = style({
  width: "100%",
  gap: "6px",
  marginTop: "20px",
  ...flex.COLUMN_FLEX,
});

export const backButton = style({
  padding: "8px 18px",
  width: "fit-content",
  borderRadius: "6px",
  backgroundColor: theme.primary,
  color: theme.white,
  ...font.H6,
});

export const rankingListItem = style({
  width: "100%",
  padding: "16px 22px",
  boxShadow: "0 0 20px 0 #00000011",
  gap: "14px",
  cursor: "pointer",
  ...flex.VERTICAL,
});

export const informationBox = style({
  width: "100%",
  ...flex.COLUMN_FLEX,
});

export const rankingListItemHGroup = style({
  width: "100%",
  gap: "12px",
  ...flex.VERTICAL,
});

const rankingListItemRankTextBase = style({
  color: theme.primary,
  ...font.H4,
});

export const rankingListItemRankText = styleVariants<Record<string, ComplexStyleRule>>({
  1: [rankingListItemRankTextBase, { ...font.H2 }],
  2: [rankingListItemRankTextBase, { ...font.H3 }],
  default: [rankingListItemRankTextBase],
});

const rankingListItemNameTextBase = style({
  color: theme.primary,
  ...font.H5,
});

export const rankingListItemNameText = styleVariants<Record<string, ComplexStyleRule>>({
  1: [rankingListItemNameTextBase, { ...font.H3 }],
  2: [rankingListItemNameTextBase, { ...font.H4 }],
  default: [rankingListItemNameTextBase],
});

export const rankingListItemInformation = style({
  width: "100%",
  gap: "6px",
  ...flex.COLUMN_FLEX,
});

export const rankingListItemBody = style({
  width: "20%",
  gap: "8px",
  color: theme.primary,
  ...flex.VERTICAL,
  ...font.btn3,
});

const tierBase = style({
  height: "auto",
});

export const tier = styleVariants<Record<string, ComplexStyleRule>>({
  1: [tierBase, { width: "80px" }],
  2: [tierBase, { width: "70px" }],
  3: [tierBase, { width: "60px" }],
  default: [tierBase, { width: "50px" }],
});

export const totalMoney = style({
  gap: "6px",
  ...flex.VERTICAL,
  ...font.H6,
});
