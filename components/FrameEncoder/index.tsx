"use client";

import { isJsonString, documentCompiler } from "@/utils";

interface Frame {
  key: string;
  content: string;
  colSpan: number;
  rowSpan: number;
}

interface DocsPropsType {
  title: string;
  contents: string;
  docsType: string;
  mode: "READ" | "WRITE";
}

const FrameEncoder = ({ title, contents, docsType, mode }: DocsPropsType) => {
  const rows = isJsonString(contents) ? JSON.parse(contents) : [];
  const theme = rows[0]?.[0].color;
  return (
    <details className="frame_details" open={mode === "WRITE"}>
      <summary className="frame_caption" style={{ backgroundColor: theme }}>
        <div>
          {title ?? "제목을 입력해주세요"}
          <br />
          <span className="frame_fold">[ 펼치기 · 접기 ]</span>
        </div>
      </summary>
      <table className="frame_table" style={{ borderColor: theme }}>
        <tbody>
          {rows.map((row: Frame[], rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((col: Frame) => (
                <td
                  key={col.key}
                  colSpan={col.colSpan}
                  rowSpan={col.rowSpan}
                  className="frame_td"
                  style={{ borderColor: theme }}
                  aria-label="present td's content"
                >
                  <div dangerouslySetInnerHTML={{ __html: documentCompiler(col.content) }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
};

export default FrameEncoder;
