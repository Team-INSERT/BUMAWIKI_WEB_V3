"use client";

import { ChangeEvent, memo, useCallback, useState } from "react";
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
import { autoClosingTag, documentCompiler } from "@/utils";
import { CLASSIFY } from "@/record/docsType.record";
import { useDate } from "@/hooks/useDate";
import DragDropUpload from "../DragDropUpload";
import Confirm from "../(modal)/Confirm";
import Toastify from "../Toastify";
import PasteUpload from "../PasteUpload";
import FrameEditor from "../FrameEditor";
import FrameEncoder from "../FrameEncoder";
import * as styles from "./style.css";
import DocsExample from "./DocsExample";

interface EditorProps {
  contents?: string;
  title?: string;
  docsType?: string;
  mode: "EDIT" | "CREATE";
}

const Editor = memo(({ contents = "", title = "", docsType = "", mode }: EditorProps) => {
  const { mutateAsync: create } = useCreateDocsMutation();
  const { mutateAsync: upload } = useUploadImageMutation();
  const { mutateAsync: update } = useUpdateDocsMutation();
  const queryClient = useQueryClient();
  const { getValidYearList } = useDate();
  const { openModal } = useModal();
  const router = useRouter();
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isChanged, setIsChanged] = useState(false);
  const [docs, setDocs] = useState({
    enroll: 0,
    title,
    contents: contents.replaceAll("<br>", "\n"),
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
    const position =
      ["틀", "FRAME"].includes(docs.docsType) && cursorPosition === 0 ? 26 : cursorPosition;
    const first = docs.contents.substring(0, position);
    const middle = `<사진 {200px}>${url}</사진>`;
    const last = docs.contents.substring(position, docs.contents.length);

    setDocs({ ...docs, contents: `${first}${middle}${last}` });
  };

  const onDragDropUpload = useCallback((file: File) => uploadImage(file), [uploadImage]);

  const handleDocsContentsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDocs((prev) => ({ ...prev, contents: autoClosingTag(e).replaceAll("<br>", "\n") }));
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
      const classify = CLASSIFY[docs.docsType];
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
          {mode === "EDIT" ? (
            <button onClick={handleOpenConfirm} className={styles.undoBtn}>
              되돌리기
            </button>
          ) : (
            <>
              <div className={styles.enrollList}>
                |
                {getValidYearList().map((year) => (
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
              <div className={styles.separator} />
              <div className={styles.docsTypeList}>
                {[
                  "사건/사고",
                  "보통교과 선생님",
                  "전공교과 선생님",
                  "멘토 선생님",
                  "전공 동아리",
                  "사설 동아리",
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
            </>
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
              value={docs.contents}
              placeholder="문서 내용을 입력해주세요. 사진 또는 동영상을 넣으려면 파일을 드래그&드롭하세요."
              className={styles.textarea}
            />
          )}
        </div>
        <div className={styles.previewBox}>
          <h1 className={styles.previewTitle}>{docs.title}</h1>
          {docs.docsType && (
            <div className={styles.classifyBox}>
              분류 : <span className={styles.classify}>{docs.docsType}</span>
            </div>
          )}
          {["틀", "FRAME"].includes(docs.docsType) ? (
            <div className={styles.preview}>
              <FrameEncoder
                title={docs.title}
                contents={docs.contents}
                docsType={docs.docsType}
                mode="WRITE"
              />
            </div>
          ) : (
            <div
              className={styles.preview}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: documentCompiler(docs.contents),
              }}
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
        <DocsExample />
      </div>
      <DragDropUpload onUpload={onDragDropUpload} />
      <PasteUpload onUpload={onDragDropUpload} />
    </>
  );
});

export default Editor;
