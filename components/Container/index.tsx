"use client";

import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { useDocs } from "@/hooks/useDocs";
import useUser from "@/hooks/useUser";
import { dateText } from "@/utils";
import { useDeleteDocsMutation } from "@/services/docs/docs.mutation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useModal from "@/hooks/useModal";
import { useQueryClient } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import * as styles from "./style.css";
import Toastify from "../Toastify";
import Confirm from "../(modal)/Confirm";

interface ContainerProps extends PropsWithChildren {
  docsType: string;
  title: string;
  lastModifiedAt?: Date;
  docsDetail?: boolean;
  id?: number;
}

const Container = ({
  docsType,
  title,
  lastModifiedAt,
  docsDetail,
  id,
  children,
}: ContainerProps) => {
  const { translateClassify } = useDocs();
  const { mutate } = useDeleteDocsMutation();
  const { isAdmin, user, isLoggedIn } = useUser();
  const { openModal } = useModal();
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
    openModal({
      component: <Confirm content="정말 문서를 삭제하시겠습니까?" onConfirm={deleteDocs} />,
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
            <span className={styles.lastModifiedAt}>최근 편집 · {dateText(lastModifiedAt)}</span>
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
        분류 : <span className={styles.classify}>{translateClassify(docsType)}</span>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Container;
