import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowIcon } from "@/assets";
import { documentCompiler } from "@/utils";
import Toastify from "../Toastify";
import * as styles from "./style.css";

const wikiExampleList = [
  [
    { name: "색상", example: "<빨강>빨간</빨강> 사과" },
    { name: "어록", example: "<어록>있는 그대로 있어줘</어록>" },
    { name: "링크", example: "사건의 <링크 문서={박우빈}>용의자</링크>" },
  ],
  [
    { name: "항목", example: "<항목>노트북 챙기기</항목>" },
    { name: "소제목", example: "<소제목>개요</소제목>" },
    { name: "삐슝빠슝", example: "<삐슝빠슝>우와앙</삐슝빠슝>" },
  ],
  [
    { name: "취소선", example: "<취소선>사실 그런 적 없다</취소선>" },
    { name: "강조", example: "매우 <강조>중요한</강조>" },
    { name: "빙글빙글", example: "<빙글빙글>호와악</빙글빙글>" },
  ],
  [
    {
      name: "사진",
      example: "<사진 {80px}>https://buma.wiki/api/image/display/이윤찬/example.png</사진>",
    },
    {
      name: "비디오",
      example: "<비디오 {120px}>https://buma.wiki/api/image/display/이윤찬/video.mp4</비디오>",
    },
  ],
];

const DocsExample = () => {
  const [isExampleOpen, setIsExampleOpen] = useState(false);
  const handleTagCopyClick = async (tag: string) => {
    await navigator.clipboard.writeText(`<${tag}></${tag}>`);
    toast(<Toastify content="클립보드에 복사되었어요!" />);
  };

  return (
    <>
      <header
        onClick={() => setIsExampleOpen((prev) => !prev)}
        className={styles.wikiBoxHeader[String(isExampleOpen)]}
      >
        <span className={styles.wikiTitle}>부마위키 문법 예제 보기</span>
        <ArrowIcon
          direction={isExampleOpen ? "down" : "up"}
          fill="white"
          width={16}
          height={16}
          viewBox="0 0 30 16"
        />
      </header>
      {isExampleOpen && (
        <main className={styles.footer.body}>
          {wikiExampleList.map((list, index) => (
            <div className={styles.footer.wrap} key={index}>
              {list.map((ex) => (
                <article className={styles.footer.box} key={ex.name}>
                  <hgroup className={styles.footer.tHead}>{ex.name}</hgroup>
                  <section
                    className={styles.footer.tItem}
                    onClick={() => handleTagCopyClick(ex.name)}
                  >
                    <figure className={styles.footer.tCell.top}>{ex.example}</figure>
                    <figure
                      className={styles.footer.tCell.bottom}
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: documentCompiler(ex.example) }}
                    />
                  </section>
                </article>
              ))}
            </div>
          ))}
        </main>
      )}
    </>
  );
};

export default DocsExample;
