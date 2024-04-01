import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as styles from "./style.css";
import { isJsonString } from "@/utils";

const AdvancedDynamicTable = ({
  mode,
  docs,
  setDocs,
  setCursorPosition,
  isChanged,
}: {
  mode: string;
  docs: {
    enroll: number;
    title: string;
    contents: string;
    docsType: string;
  };
  setDocs: Dispatch<
    SetStateAction<{
      enroll: number;
      title: string;
      contents: string;
      docsType: string;
    }>
  >;
  setCursorPosition: Dispatch<SetStateAction<number>>;
  isChanged: boolean;
}) => {
  const [rows, setRows] = useState(
    mode === "EDIT" && docs.docsType === "FRAME"
      ? (JSON.parse(docs.contents) as [])
      : [
          [
            { key: "0-0", content: "", colSpan: 1, rowSpan: 1 },
            { key: "0-1", content: "", colSpan: 1, rowSpan: 1 },
            { key: "0-2", content: "", colSpan: 1, rowSpan: 1 },
            { key: "0-3", content: "", colSpan: 1, rowSpan: 1 },
          ],
          [
            { key: "1-0", content: "", colSpan: 1, rowSpan: 1 },
            { key: "1-1", content: "", colSpan: 1, rowSpan: 1 },
            { key: "1-2", content: "", colSpan: 1, rowSpan: 1 },
            { key: "1-3", content: "", colSpan: 1, rowSpan: 1 },
          ],
          [
            { key: "2-0", content: "", colSpan: 1, rowSpan: 1 },
            { key: "2-1", content: "", colSpan: 1, rowSpan: 1 },
            { key: "2-2", content: "", colSpan: 1, rowSpan: 1 },
            { key: "2-3", content: "", colSpan: 1, rowSpan: 1 },
          ],
        ],
  );

  const cursorPosition = (key: string, index?: number) => {
    const decoded = JSON.stringify(rows);
    setCursorPosition(decoded.indexOf(key) + 16 + (index || 0));
  };

  useEffect(() => {
    setRows(isJsonString(docs.contents) ? JSON.parse(docs.contents) : rows);
  }, [isChanged]);

  useEffect(() => {
    const newContent = JSON.stringify(rows);
    setDocs((prev) => ({ ...prev, contents: newContent }));
  }, [rows, docs.title]);

  const addRow = () => {
    const newRow = rows[0].map((_, index) => ({
      key: `${rows.length}-${index}`,
      content: "",
      colSpan: 1,
      rowSpan: 1,
    }));
    setRows([...rows, newRow]);
  };

  const addColumn = () => {
    const newRows = rows.map((row, rowIndex) => [
      ...row,
      {
        key: `${rowIndex}-${row.length}`,
        content: "",
        colSpan: 1,
        rowSpan: 1,
      },
    ]);
    setRows(newRows);
  };

  const addColSpan = (rowIndex: number, colIndex: number) => {
    const newing = rows.map((row, index) => {
      if (index === rowIndex) {
        if (colIndex === row.length - 1 && row.length < 1) return row;
        return row.map((col, cIndex) => {
          if (colIndex === row.length + col.colSpan - 2) {
            return col;
          }
          if (cIndex === colIndex) {
            const newValue = col.colSpan + 1;
            return { ...col, colSpan: newValue };
          }
          return col;
        });
      }
      return row;
    });

    const newRows = newing.map((row, index) => {
      if (
        index === rowIndex ||
        (index > rowIndex && index < rowIndex + rows[rowIndex][colIndex].rowSpan)
      ) {
        row.map((_, cIndex) => {
          if (cIndex === colIndex) {
            if (
              (row.length < 1 && index === rowIndex) ||
              (index === rowIndex && cIndex === row.length - 1)
            )
              return row;
            row.pop();
          }
        });
      }
      return row;
    });

    setRows(newRows);
  };

  // const addColSpan = (rowIndex: number, colIndex: number) => {
  //   const newArr = [...rows];
  //   newArr[rowIndex][colIndex].colSpan += newArr[rowIndex][colIndex + 1]?.colSpan ?? 0;
  //   if (newArr[rowIndex][colIndex].rowSpan === 1) {
  //     newArr[rowIndex].splice(colIndex + 1, 1);
  //   } else {
  //     newArr.forEach((row, index) => {
  //       if (index > rowIndex && index <= rowIndex + rows[rowIndex][colIndex].rowSpan) {
  //         if (index === rowIndex + rows[rowIndex][colIndex].rowSpan - 1) {
  //           console.log(row, index);
  //         }
  //       }
  //     });
  //   }

  //   setRows(newArr);
  // };

  const addRowSpan = (rowIndex: number, colIndex: number) => {
    const newing = rows.map((row, index) => {
      if (rows.length === rowIndex + rows[rowIndex][colIndex].rowSpan) return row;
      if (index === rowIndex) {
        return row.map((col, cIndex) => {
          if (cIndex === colIndex) {
            const newValue = col.rowSpan + 1;
            return { ...col, rowSpan: newValue };
          }
          return col;
        });
      }
      return row;
    });

    const newRows = newing.map((row, index) => {
      if (index > rowIndex && index <= rowIndex + rows[rowIndex][colIndex].rowSpan) {
        if (index === rowIndex + rows[rowIndex][colIndex].rowSpan) {
          for (let i = 0; i < rows[rowIndex][colIndex].colSpan; i++) {
            row.pop();
          }
        }
      }

      return row;
    });

    setRows(newRows);
  };

  const removeLastTd = (rowIndex: number) => {
    const newRows = rows
      .map((row, index) => {
        if (index === rowIndex) {
          row.pop();
        }
        return row;
      })
      .filter((row) => row.length > 0);

    setRows(newRows);
  };

  const addTd = (rowIndex: number) => {
    const newRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return [
          ...row,
          {
            key: `${rowIndex}-${row.length}`,
            content: "",
            colSpan: 1,
            rowSpan: 1,
          },
        ];
      }
      return row;
    });

    setRows(newRows);
  };

  const onChangeRowContent = (rowIndex: number, colIndex: number, content: string) => {
    const newArr = [...rows];
    newArr[rowIndex][colIndex].content = content;
    setRows(newArr);
  };

  return (
    <details className={styles.FrameDetails} open>
      <summary className={styles.FrameSummary}>
        {docs.title ? docs.title : "문서 제목이 들어갑니다."}
        <br />
        <span>[ 펼치기 · 접기 ]</span>
      </summary>
      <div className={styles.ContentBox}>
        <div className={styles.Flexing}>
          <div className={styles.Bar} />
          <table className={styles.FrameTable}>
            <tbody className={styles.TBody}>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={styles.Tr}>
                  {row.map((col, colIndex) => (
                    <td
                      key={col.key}
                      colSpan={col.colSpan}
                      rowSpan={col.rowSpan}
                      className={styles.Td}
                    >
                      <div className={styles.YBorderBox}>
                        <textarea
                          onClick={(e) =>
                            cursorPosition(
                              col.key,
                              (e.target as HTMLTextAreaElement).selectionStart,
                            )
                          }
                          onKeyDown={(e) =>
                            cursorPosition(
                              col.key,
                              (e.target as HTMLTextAreaElement).selectionStart,
                            )
                          }
                          onChange={(e) => onChangeRowContent(rowIndex, colIndex, e.target.value)}
                          value={col.content}
                          className={styles.textarea}
                          placeholder={`${col.key} \n 가로 병합: ${col.colSpan} \n 세로 병합: ${col.rowSpan}`}
                        />

                        <div
                          onClick={() => {
                            addColSpan(rowIndex, colIndex);
                            cursorPosition(col.key);
                          }}
                          className={styles.ColSpan}
                        />
                      </div>
                      <div
                        onClick={() => {
                          addRowSpan(rowIndex, colIndex);
                          cursorPosition(col.key);
                        }}
                        className={styles.RowSpan}
                      />
                    </td>
                  ))}
                  <td onClick={() => addTd(rowIndex)} className={styles.SetRow}>
                    +
                  </td>
                  <td onClick={() => removeLastTd(rowIndex)} className={styles.SetRow}>
                    x
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div onClick={addColumn} className={styles.AddColumn}>
            <span className={styles.Span}>+</span>
          </div>
        </div>
        <div onClick={addRow} className={styles.AddRow}>
          <span className={styles.Span}>+</span>
        </div>
      </div>
    </details>
  );
};

export default AdvancedDynamicTable;
