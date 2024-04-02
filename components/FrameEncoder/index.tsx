import { decodeContent, isJsonString } from "@/utils";

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
  return (
    <details
      className="frame_details"
      open={mode === "WRITE" || (docsType === "FRAME" && mode === "READ")}
    >
      <summary className="frame_caption">
        <div>
          {title ?? "제목을 입력해주세요"}
          <br />
          <span>[ 펼치기 · 접기 ]</span>
        </div>
      </summary>
      <table className="frame_table">
        <tbody>
          {rows.map((row: Frame[], rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((col: Frame) => (
                <td
                  key={col.key}
                  colSpan={col.colSpan}
                  rowSpan={col.rowSpan}
                  className="frame_td"
                  aria-label="present td's content"
                >
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: decodeContent(col.content) }}
                  />
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
