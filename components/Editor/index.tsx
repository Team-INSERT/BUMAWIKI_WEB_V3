"use client";

import React, { useCallback, useState } from "react";
import { decodeContent, getYear } from "@/utils";
import { ArrowIcon } from "@/assets";
import { useDocs } from "@/hooks/useDocs";
import {
  useCreateDocsMutation,
  useUploadImageMutation,
  useUpdateDocsMutation,
} from "@/services/docs/docs.mutation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { EditorPropsType } from "@/types/editorPropType.interface";
import useModal from "@/hooks/useModal";
import { useQueryClient } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import * as styles from "./style.css";
import DragDropUpload from "../DragDropUpload";
import Confirm from "../(modal)/Confirm";
import Toastify from "../Toastify";

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

const Editor = ({ contents = "", title = "", docsType = "", mode }: EditorPropsType) => {
  const [isExampleOpen, setIsExampleOpen] = useState(false);
  const { autoClosingTag, getDocsTypeByClassify, translateClassify } = useDocs();
  const { mutateAsync: create } = useCreateDocsMutation();
  const { mutateAsync: upload } = useUploadImageMutation();
  const { mutateAsync: update } = useUpdateDocsMutation();
  const router = useRouter();
  const [cursorPosition, setCursorPosition] = useState(0);
  const queryClient = useQueryClient(getQueryClient());
  const { openModal } = useModal();
  const [docs, setDocs] = useState({
    enroll: 0,
    title,
    contents,
    docsType,
  });

  const handleOpenComfirm = () => {
    if (contents !== docs.contents.trim()) {
      openModal({
        component: <Confirm content="변경 사항을 삭제하시겠습니까?" onConfirm={onClickUndo} />,
      });
    }
  };

  const onClickUndo = () => {
    if (contents) {
      setDocs((prev) => ({
        ...prev,
        contents,
      }));
    }
  };

  const uploadImage = async (file: File) => {
    if (!file) return;
    const { url } = await upload(file);
    setDocs((prev) => {
      const first = prev.contents.substring(0, cursorPosition);
      const middle = `<사진 {200px}>${url}</사진>`;
      const last = prev.contents.substring(cursorPosition, prev.contents.length);
      return {
        ...prev,
        contents: `${first}${middle}${last}`,
      };
    });
  };

  const onDragDropUpload = useCallback(
    (file: File) => {
      uploadImage(file);
    },
    [uploadImage],
  );

  const handleCreateDocsClick = async () => {
    if (!docs.title.trim()) return toast(<Toastify content="제목을 입력해주세요!" />);
    if (!docs.enroll) return toast(<Toastify content="문서 연도를 선택해주세요!" />);
    if (!docs.docsType) return toast(<Toastify content="문서 분류를 선택해주세요!" />);
    if (!docs.contents.trim()) return toast(<Toastify content="내용을 입력해주세요!" />);
    try {
      await create({ ...docs, docsType: getDocsTypeByClassify(docs.docsType) });
      toast(<Toastify content="문서가 생성되었습니다!" />);
      router.push(`/docs/${docs.title}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditDocsClick = async () => {
    if (!docs.contents.trim()) return toast(<Toastify content="내용이 없습니다!" />);
    if (contents === docs.contents.trim())
      return toast(<Toastify content="변경된 사항이 없습니다!" />);
    try {
      await update({
        title: docs.title,
        contents: docs.contents,
      });
      toast(<Toastify content="문서가 수정되었습니다!" />);
      // await queryClient.refetchQueries();
      // router.push(`/docs/${docs.title}`);
      window.location.href = `/docs/${docs.title}`;
    } catch (err) {
      console.log(err);
    }
  };

  const buttonMode = {
    EDIT: {
      function: handleEditDocsClick,
      text: "저장하기",
    },

    CREATE: {
      function: handleCreateDocsClick,
      text: "생성하기",
    },
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
            <div>
              <button onClick={handleOpenComfirm} className={styles.undoBtn}>
                되돌리기
              </button>
            </div>
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
                  onClick={() => setDocs((prev) => ({ ...prev, docsType: type }))}
                  key={type}
                  className={styles.docsType[String(type === docs.docsType)]}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
          <textarea
            onKeyDown={(e) => setCursorPosition((e.target as HTMLTextAreaElement).selectionStart)}
            onChange={(e) => setDocs((prev) => ({ ...prev, contents: autoClosingTag(e) }))}
            value={docs.contents}
            placeholder="문서 내용을 입력해주세요. 사진 또는 동영상을 넣으려면 파일을 드래그&드롭하세요..."
            className={styles.textarea[String(isExampleOpen)]}
          />
        </div>
        <div className={styles.previewBox}>
          <h1 className={styles.previewTitle}>{docs.title}</h1>
          {docs.docsType && (
            <div className={styles.classifyBox}>
              분류 : <span className={styles.classify}>{translateClassify(docs.docsType)}</span>
            </div>
          )}
          <div
            className={styles.preview}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: decodeContent(docs.contents) }}
          />
        </div>
        <button onClick={buttonMode[mode].function} className={styles.writeButton}>
          {buttonMode[mode].text}
        </button>
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
                    <section className={styles.footer.tItem}>
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
    </>
  );
};

export default Editor;
