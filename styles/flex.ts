import { CSSProperties } from "@vanilla-extract/css";

interface PropsType {
  direction?: CSSProperties["flexDirection"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
}

const flexGenerator = ({
  direction = "unset",
  align = "unset",
  justify = "unset",
}: PropsType = {}) => ({
  display: "flex",
  flexDirection: direction,
  justifyContent: justify,
  alignItems: align,
});

const flex = {
  FLEX: flexGenerator(),
  CENTER: flexGenerator({ align: "center", justify: "center" }),
  VERTICAL: flexGenerator({ align: "center" }),
  HORIZONTAL: flexGenerator({ justify: "center" }),
  START: flexGenerator({ align: "center", justify: "flex-start" }),
  BETWEEN: flexGenerator({ align: "center", justify: "space-between" }),
  END: flexGenerator({ align: "center", justify: "flex-end" }),

  COLUMN_FLEX: flexGenerator({
    direction: "column",
  }),
  COLUMN_CENTER: flexGenerator({
    direction: "column",
    align: "center",
    justify: "center",
  }),
  COLUMN_VERTICAL: flexGenerator({ direction: "column", align: "center" }),
  COLUMN_HORIZONTAL: flexGenerator({ direction: "column", justify: "center" }),
  COLUMN_START: flexGenerator({
    direction: "column",
    align: "center",
    justify: "flex-start",
  }),
  COLUMN_BETWEEN: flexGenerator({
    direction: "column",
    align: "center",
    justify: "space-between",
  }),
  COLUMN_END: flexGenerator({
    direction: "column",
    align: "center",
    justify: "flex-end",
  }),
};

export default flex;
