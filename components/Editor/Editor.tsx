"use client";

import React, { ChangeEvent, useCallback, useState } from "react";
import { decodeContent, encoder, getYear } from "@/utils";
import { ArrowIcon } from "@/assets";
import { useDocs } from "@/hooks/useDocs";
import {
  useCreateDocsMutation,
  useUploadImageMutation,
  useUpdateDocsMutation,
} from "@/services/docs/docs.mutation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { docsQuery } from "@/services/docs/docs.query";
import useModal from "@/hooks/useModal";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as styles from "./style.css";
import DragDropUpload from "../DragDropUpload";
import Confirm from "../(modal)/Confirm";
import Toastify from "../Toastify";
import PasteUpload from "../PasteUpload";
import FrameEditor from "../FrameEditor";

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

interface EditorProps {
  contents?: string;
  title?: string;
  docsType?: string;
  mode: "EDIT" | "CREATE";
}

const Editor = ({ contents = "", title = "", docsType = "", mode }: EditorProps) => {
  const { mutateAsync: create } = useCreateDocsMutation();
  const { mutateAsync: upload } = useUploadImageMutation();
  const { mutateAsync: update } = useUpdateDocsMutation();
  const { autoClosingTag, getDocsTypeByClassify, translateClassify } = useDocs();
  const queryClient = useQueryClient();
  const { openModal } = useModal();
  const router = useRouter();
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isChanged, setIsChanged] = useState(false);
  const [isExampleOpen, setIsExampleOpen] = useState(false);
  const [docs, setDocs] = useState({
    enroll: 0,
    title,
    contents,
    docsType,
  });

  const handleOpenConfirm = () => {
    if (contents !== docs.contents.trim()) {
      openModal({
        component: (
          <Confirm
            content="변경 사항을 삭제하시겠습니까?"
            onConfirm={() => setDocs((prev) => ({ ...prev, contents }))}
          />
        ),
      });
    }
  };

  const uploadImage = async (file: File) => {
    if (!file) return;
    const { url } = await upload(file);
    setIsChanged((prev) => !prev);
    setDocs((prev) => {
      const position =
        ["틀", "FRAME"].includes(docs.docsType) && cursorPosition === 0 ? 26 : cursorPosition;
      const first = prev.contents.substring(0, position);
      const middle = `<사진 {200px}>${url}</사진>`;
      const last = prev.contents.substring(position, prev.contents.length);
      return ["틀", "FRAME"].includes(docs.docsType)
        ? {
            ...prev,
            contents: `${first}${middle}${last}`,
          }
        : {
            ...prev,
            contents: `${first}\n${middle}\n${last}`,
          };
    });
  };

  const onDragDropUpload = useCallback((file: File) => uploadImage(file), [uploadImage]);

  const handleDocsContentsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDocs((prev) => ({ ...prev, contents: autoClosingTag(e).replaceAll("<br>", "\n") }));
  };

  const handleTagCopyClick = async (tag: string) => {
    await navigator.clipboard.writeText(`<${tag}></${tag}>`);
    toast(<Toastify content="클립보드에 복사되었어요!" />);
  };

  const handleCreateDocsClick = async () => {
    const isInvalid =
      docs.title.includes("#") ||
      docs.title.includes("?") ||
      docs.title.includes("/") ||
      docs.title.includes("\\") ||
      docs.title.includes("%");
    if (!docs.title.trim()) return toast(<Toastify content="제목을 입력해주세요!" />);
    if (isInvalid) return toast(<Toastify content="문서명에는 #, ?, /를 넣을 수 없습니다." />);
    if (!docs.enroll) return toast(<Toastify content="문서 연도를 선택해주세요!" />);
    if (!docs.docsType) return toast(<Toastify content="문서 분류를 선택해주세요!" />);
    if (!docs.contents.trim()) return toast(<Toastify content="내용을 입력해주세요!" />);
    try {
      const classify = getDocsTypeByClassify(docs.docsType);
      await create({ ...docs, docsType: classify });
      toast(<Toastify content="문서가 생성되었습니다!" />);
      queryClient.invalidateQueries(docsQuery.list(classify.toLowerCase()));
      queryClient.invalidateQueries(docsQuery.lastModified(0));
      router.push(`/docs/${docs.title}`);
    } catch (err) {
      if (err instanceof AxiosError) toast(<Toastify content={err.response?.data.message} />);
    }
  };

  const handleEditDocsClick = async () => {
    if (contents === docs.contents.trim())
      return toast(<Toastify content="변경된 사항이 없습니다!" />);

    try {
      await update(docs);
      toast(<Toastify content="문서가 수정되었습니다!" />);
      queryClient.invalidateQueries(docsQuery.title(encodeURI(docs.title)));
      queryClient.invalidateQueries(docsQuery.lastModified(0));
      router.push(`/docs/${docs.title}`);
    } catch (err) {
      if (err instanceof AxiosError) toast(<Toastify content={err.response?.data.message} />);
    }
  };

  const setDocsType = (type: string) => {
    if (docs.docsType === "틀") setDocs((prev) => ({ ...prev, contents: "" }));
    setDocs((prev) => ({ ...prev, docsType: type }));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.editorBox}>
          <input
            onChange={({ target: { value } }) => setDocs((prev) => ({ ...prev, title: value }))}
            value={docs.title}
            placeholder="제목을 입력해주세요"
            className={styles.titleInput}
            disabled={mode === "EDIT"}
          />
          {mode === "CREATE" && (
            <div className={styles.enrollList}>
              |
              {getYear().map((year) => (
                <div key={year}>
                  <span
                    onClick={() => setDocs((prev) => ({ ...prev, enroll: year }))}
                    className={styles.year[String(year === docs.enroll)]}
                  >
                    &nbsp;{year}&nbsp;
                  </span>
                  |
                </div>
              ))}
            </div>
          )}
          <div className={styles.separator} />
          {mode === "EDIT" ? (
            <button onClick={handleOpenConfirm} className={styles.undoBtn}>
              되돌리기
            </button>
          ) : (
            <div className={styles.docsTypeList}>
              {[
                "사건",
                "일반선생님",
                "전공선생님",
                "멘토선생님",
                "전공동아리",
                "사설동아리",
                "틀",
              ].map((type) => (
                <button
                  onClick={() => setDocsType(type)}
                  key={type}
                  className={styles.docsType[String(type === docs.docsType)]}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
          {["틀", "FRAME"].includes(docs.docsType) ? (
            <FrameEditor
              mode={mode}
              docs={docs}
              setDocs={setDocs}
              setCursorPosition={setCursorPosition}
              isChanged={isChanged}
            />
          ) : (
            <textarea
              onKeyDown={(e) => setCursorPosition((e.target as HTMLTextAreaElement).selectionStart)}
              onChange={handleDocsContentsChange}
              value={docs.contents.replaceAll("<br>", "\n")}
              placeholder="문서 내용을 입력해주세요. 사진 또는 동영상을 넣으려면 파일을 드래그&드롭하세요."
              className={styles.textarea[String(isExampleOpen)]}
            />
          )}
        </div>
        <div className={styles.previewBox}>
          <h1 className={styles.previewTitle}>{docs.title}</h1>
          {docs.docsType && (
            <div className={styles.classifyBox}>
              분류 : <span className={styles.classify}>{translateClassify(docs.docsType)}</span>
            </div>
          )}
          {["틀", "FRAME"].includes(docs.docsType) ? (
            <div className={styles.preview}>{encoder(docs)}</div>
          ) : (
            <div
              className={styles.preview}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: decodeContent(docs.contents) }}
            />
          )}
        </div>
        {mode === "EDIT" ? (
          <button onClick={handleEditDocsClick} className={styles.writeButton}>
            편집하기
          </button>
        ) : (
          <button onClick={handleCreateDocsClick} className={styles.writeButton}>
            생성하기
          </button>
        )}
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
                        dangerouslySetInnerHTML={{ __html: decodeContent(ex.example) }}
                      />
                    </section>
                  </article>
                ))}
              </div>
            ))}
          </main>
        )}
      </div>
      <DragDropUpload onUpload={onDragDropUpload} />
      <PasteUpload onUpload={onDragDropUpload} />
    </>
  );
};

export default Editor;
