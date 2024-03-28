import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const rankingBox = style({
  width: "100%",
  gap: "12px",
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
  padding: "16px 8px",
  borderBottom: `1px solid ${theme.primary}`,
  gap: "8px",
  cursor: "pointer",
  ...flex.COLUMN_FLEX,
});

export const rankingListItemHGroup = style({
  width: "100%",
  gap: "12px",
  ...flex.VERTICAL,
});

export const rankingListItemRankText = style({
  color: theme.primary,
  ...font.H2,
});

export const rankingListItemNameText = style({
  ...font.H4,
});

export const rankingListItemBody = style({
  width: "100%",
  gap: "8px",
  ...flex.VERTICAL,
  ...font.H5,
});
