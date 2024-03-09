import { style } from "@vanilla-extract/css";
import { flex, font, theme } from "@/styles";

export const container = style({
  position: "sticky",
  width: "240px",
  height: "fit-content",
  marginTop: "20px",
  marginRight: "20px",
  top: "74px",
});

export const titleBox = style({
  backgroundColor: theme.primary,
  border: `2px solid ${theme.gray}`,
  width: "100%",
  height: "50px",
  ...flex.VERTICAL,
});

export const titleText = style({
  marginLeft: "20px",
  color: theme.white,
  ...font.H5,
});

export const docs = style({
  width: "100%",
  height: "40px",
  backgroundColor: theme.white,
  border: `2px solid ${theme.gray}`,
  borderTop: "none",
  ...flex.VERTICAL,
});

export const docsName = style({
  color: theme.primary,
  marginLeft: "10px",
  fontSize: "14px",
  fontWeight: 600,
});

export const docsLastModified = style({
  marginLeft: "5px",
  color: theme.boldgray,
  fontSize: "10px",
});

export const pageBox = style({
  ...flex.FLEX,
});

export const pageButton = style({
  width: "56px",
  height: "24px",
  backgroundColor: theme.white,
  margin: "6px 2px",
  border: `2px solid ${theme.gray}`,
  borderRadius: "3px",
  ...flex.CENTER,
});

export const pageButtonText = style({
  color: theme.primary,
  fontWeight: 600,
  fontSize: "12px",
  gap: "2.5px",
  ...flex.CENTER,
});
