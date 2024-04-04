import { flex, font, theme } from "@/styles";
import { style } from "@vanilla-extract/css";

export const FrameDetails = style({
  width: "50vw",
  marginBottom: "1em",
});

export const FrameSummary = style({
  backgroundColor: theme.primary,
  color: "white",
  fontWeight: "700",
  padding: "10px",
  fontSize: "20px",
  textAlign: "center",
  cursor: "pointer",
  position: "relative",

  "::marker": {
    content: "",
  },
});

export const ColorPicker = style({
  position: "absolute",
  right: "5%",
  top: "25%",
  cursor: "pointer",

  ":hover": {
    width: "55px",
    height: "30px",
    transition: "width, height, 100ms",
  },
});

export const FrameTable = style({
  width: "100%",
  height: "100%",
  backgroundColor: theme.gray,
  borderCollapse: "collapse",
  borderTop: `solid 5px ${theme.primary}`,
  textAlign: "center",
  padding: "10px",
});

export const Tr = style({
  width: "100%",
});

export const Td = style({
  height: "5vh",
  width: "200px",
  borderLeft: `solid 1px ${theme.primary}`,
});

export const Flexing = style({
  width: "100%",
  height: "95%",
  ...flex.FLEX,
});

export const textarea = style({
  width: "100%",
  height: "100%",
  textAlign: "center",

  "::placeholder": {
    ...font.p4,
  },
});

export const SetRow = style({
  height: "5vh",
  width: "200px",
  borderLeft: `2px solid ${theme.white}`,
  backgroundColor: theme.primary,
  color: theme.white,
  cursor: "pointer",
  ...font.btn1,

  ":hover": {
    backgroundColor: theme.btnHover,
  },
});

export const preview = style({
  width: "100%",
  height: "100%",
  whiteSpace: "pre-wrap",
});

export const RowSpan = style({
  width: "100%",
  height: "10%",
  backgroundColor: theme.primary,
  cursor: "pointer",

  ":hover": {
    backgroundColor: theme.btnHover,
  },
});

export const ColSpan = style({
  width: "8px",
  height: "100%",
  backgroundColor: theme.primary,
  cursor: "pointer",
  zIndex: "20",

  ":hover": {
    backgroundColor: theme.btnHover,
  },
});

export const YBorderBox = style({
  backgroundColor: theme.primary,
  width: "100%",
  height: "90%",
  ...flex.FLEX,
});

export const TBody = style({
  width: "100%",
});

export const AddColumn = style({
  width: "5%",
  height: "100%",
  backgroundColor: theme.primary,
  cursor: "pointer",
  ...font.btn3,
  ...flex.CENTER,

  ":hover": {
    backgroundColor: theme.btnHover,
  },
});

export const AddRow = style({
  width: "100%",
  height: "10%",
  backgroundColor: theme.primary,

  cursor: "pointer",
  ...font.btn3,
  ...flex.CENTER,

  ":hover": {
    backgroundColor: theme.btnHover,
  },
});

export const Span = style({
  color: theme.white,
  ...font.H2,
});

export const Bar = style({
  width: "5%",
  height: "100%",
  backgroundColor: theme.primary,
});

export const ContentBox = style({
  width: "100%",
  height: "100%",
});
