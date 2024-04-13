import { flex, font, theme } from "@/styles";
import { StyleVariantsType } from "@/types";
import { style, styleVariants } from "@vanilla-extract/css";

export const informationContainer = style({
  width: "100%",
  height: "fit-content",
  gap: "6vw",
  padding: "10px 0",
  ...flex.BETWEEN,
});

export const utilityBox = style({
  gap: "12px",
  ...flex.VERTICAL,

  "@media": {
    "screen and (max-width: 480px)": {
      ...flex.COLUMN_FLEX,
    },
  },
});

export const moneyBox = style({
  ...flex.COLUMN_FLEX,
});

export const moneyName = style({
  marginLeft: "auto",
  ...font.p2,
});

export const moneyAmount = style({
  gap: "6px",
  color: theme.primary,
  ...flex.VERTICAL,
  ...font.H4,
});

export const tradeContainer = style({
  gap: "10px",
  borderBottom: `1px solid ${theme.gray}`,
  ...flex.COLUMN_FLEX,
});

export const tradeBox = style({
  width: "100%",
  gap: "24px",
  paddingBottom: "24px",
  ...flex.COLUMN_FLEX,
});

export const tradeHeader = style({
  width: "100%",
  borderBottom: `1px solid ${theme.gray}`,
  ...flex.VERTICAL,
});

export const tradeToggleBase = style({
  width: "12%",
  padding: "4px 0",
  cursor: "pointer",
  ...font.H6,
  ...flex.CENTER,

  "@media": {
    "screen and (max-width: 480px)": {
      width: "30%",
    },
  },
});

export const tradeToggle = styleVariants<StyleVariantsType>({
  BUY: [tradeToggleBase, { borderBottom: `3px solid ${theme.buy}`, color: theme.buy }],
  SELL: [tradeToggleBase, { borderBottom: `3px solid ${theme.sell}`, color: theme.sell }],
  DISABLED: [tradeToggleBase, { borderBottom: `3px solid transparent`, color: theme.gray }],
});

export const tradeFieldBox = style({
  gap: "14px",
  ...flex.VERTICAL,
});

export const tradeName = style({
  color: theme.boldgray,
  ...font.H6,
});

export const tradeItem = style({
  ...font.H5,
});

export const tradeDescription = style({
  color: theme.boldgray,
  ...font.btn3,
});

export const tradeInput = style({
  border: `1px solid ${theme.gray}`,
  borderRadius: "4px",
  padding: "4px 10px",
  width: "80px",
  textAlign: "right",
  ...font.p2,
});

export const tradeButton = style({
  padding: "8px 20px",
  borderRadius: "4px",
  width: "fit-content",
  backgroundColor: theme.primary,
  color: theme.white,
  ...font.btn2,
});

export const tradeInformation = style({
  ...font.H6,
});

export const chartContainer = style({
  width: "100%",
  height: "100%",
  backgroundColor: "#f2f3f7",
  margin: "20px 0",
  padding: "26px",
  borderRadius: "4px",
  gap: "14px",
  ...flex.COLUMN_FLEX,
});

export const chartHeader = style({
  gap: "12px",
  ...flex.BETWEEN,

  "@media": {
    "screen and (max-width: 480px)": {
      ...flex.COLUMN_FLEX,
    },
  },
});

export const chartCoinBox = style({
  gap: "12px",
  ...flex.VERTICAL,
});

export const chartCoinInfoBox = style({
  ...flex.COLUMN_FLEX,
});

export const chartCoinTitle = style({
  color: theme.primary,
  listStyle: "comma-separated",
  ...font.H2,
});

export const chartCoinDate = style({
  color: theme.gray,
  ...font.btn2,
});

export const chartTitle = style({
  ...font.H3,
});

export const categoryBox = style({
  flexWrap: "wrap",
  ...flex.FLEX,
});

export const categoryBase = style({
  padding: "8px 14px",
  cursor: "pointer",
  ...font.btnBold,
});

export const category = styleVariants({
  DISABLED: [categoryBase],
  ENABLED: [categoryBase, { backgroundColor: theme.gray }],
});

export const warningText = style({
  color: theme.red,
  ...font.H5,
});
