"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";
import { useDeleteDocsMutation } from "@/services/docs/docs.mutation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import { CLASSIFY } from "@/record/docsType.record";
import { useDate, useModal, useUser } from "@/hooks";
import * as styles from "./style.css";
import Toastify from "../Toastify";

interface Props extends PropsWithChildren {
  title: string;
  docsType: string;
  lastModifiedAt?: Date;
  docsDetail?: boolean;
  id?: number;
}

const Container = ({ docsType, title, lastModifiedAt, docsDetail, id, children }: Props) => {
  const { mutate } = useDeleteDocsMutation();
  const { formatDate } = useDate();
  const { isAdmin, user, isLoggedIn } = useUser();
  const { openConfirm } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteDocs = () => {
    if (id)
      mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(docsQuery.list(docsType.toLowerCase()));
          queryClient.invalidateQueries(docsQuery.lastModified(0));
          router.push("/");
          toast(<Toastify content="문서를 삭제했어요!" />);
        },
      });
  };

  const handleDeleteDocsClick = () => {
    openConfirm({
      content: "정말 문서를 삭제하시겠습니까?",
      onConfirm: deleteDocs,
    });
  };

  const handleDocsEditClick = () => {
    if (!isLoggedIn) return toast(<Toastify content="로그인 후 이용 가능합니다." />);
    if (title.includes(user.name))
      return toast(<Toastify content="자신과 관련된 문서는 수정할 수 없습니다." />);
    router.push(`/edit/${title}`);
  };

  return (
    <div className={styles.container}>
      <hgroup className={styles.hgroup}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>부마위키:{title}</h1>
          {docsDetail && lastModifiedAt && (
            <span className={styles.lastModifiedAt}>최근 편집 · {formatDate(lastModifiedAt)}</span>
          )}
        </div>
        {docsDetail && (
          <div className={styles.utilityBox}>
            <button onClick={handleDocsEditClick} className={styles.editButton}>
              문서 편집
            </button>
            <Link href={`/history/${title}`} className={styles.historyButton}>
              역사
            </Link>
            {isAdmin && id && (
              <button onClick={handleDeleteDocsClick} className={styles.deleteButton}>
                삭제
              </button>
            )}
          </div>
        )}
      </hgroup>
      <div className={styles.classifyBox}>
        분류 : <span className={styles.classify}>{CLASSIFY[docsType] || docsType}</span>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Container;
