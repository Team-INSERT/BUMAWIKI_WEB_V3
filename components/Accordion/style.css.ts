import { flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const content = style({
  gap: "12px",
  ...flex.COLUMN_FLEX,
});
