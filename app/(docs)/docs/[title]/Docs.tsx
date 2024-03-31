"use client";

import React, { FC, Suspense } from "react";
import "dayjs/locale/ko";
import { decodeContent } from "@/utils";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { useQueries, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import { likeQuery } from "@/services/like/like.query";
import Container from "@/components/Container";
import { LikeIcon } from "@/assets";
import useUser from "@/hooks/useUser";
import Toastify from "@/components/Toastify";
import { toast } from "react-toastify";
import { useCreateLikeMutation, useDeleteLikeMutation } from "@/services/like/like.mutation";
import * as styles from "./style.css";

const Docs: FC<{ title: string }> = ({ title }) => {
  const { data: docs } = useSuspenseQuery(docsQuery.title(title));
  const { isLoggedIn } = useUser();
  const [{ data: like }, { data: isILike }] = useQueries({
    queries: [likeQuery.likeCount(title), likeQuery.isILike(docs.id)],
  });
  const queryClient = useQueryClient();
  const { mutate: createLike } = useCreateLikeMutation();
  const { mutate: cancelLike } = useDeleteLikeMutation();

  const handleQueryInvalidate = () => {
    queryClient.invalidateQueries(likeQuery.isILike(docs.id));
    queryClient.invalidateQueries(likeQuery.likeCount(title));
  };

  const handleLikeToggleClick = () => {
    if (!isLoggedIn) {
      toast(
        <Toastify content="로그인!!!!!!!!!!!!!!!!!!!!!!!!하라고 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" />,
      );
      toast(
        <Toastify content="로그인!!!!!!!!!!!!!!!!!!!!!!!!하라고 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" />,
      );
      toast(
        <Toastify content="로그인!!!!!!!!!!!!!!!!!!!!!!!!하라고 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" />,
      );
      toast(
        <Toastify content="로그인!!!!!!!!!!!!!!!!!!!!!!!!하라고 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" />,
      );
      toast(
        <Toastify content="로그인!!!!!!!!!!!!!!!!!!!!!!!!하라고 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" />,
      );
      toast(
        <Toastify content="로그인!!!!!!!!!!!!!!!!!!!!!!!!하라고 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" />,
      );
      toast(
        <Toastify content="로그인!!!!!!!!!!!!!!!!!!!!!!!!하라고 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" />,
      );
      toast(
        <Toastify content="로그인!!!!!!!!!!!!!!!!!!!!!!!!하라고 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" />,
      );
      toast(
        <Toastify content="로그인!!!!!!!!!!!!!!!!!!!!!!!!하라고 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" />,
      );
      return toast(
        <Toastify content="로그인!!!!!!!!!!!!!!!!!!!!!!!!하라고 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" />,
      );
    }

    if (isILike) return cancelLike(docs.id, { onSuccess: handleQueryInvalidate });
    createLike(docs.id, { onSuccess: handleQueryInvalidate });
  };

  const sanitizeData = () => ({
    __html: DOMPurify.sanitize(decodeContent(docs.contents).split("").reverse().join("")),
  });

  return (
    <Suspense>
      <Container {...docs}>
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.warning}>
              문의를 통해 본인 문서의 기재되길 원치않는 특정 내용을 삭제
              안해줘!!!!!!!!!!!!!!!!!!!!!!헤하하하하하하하ㅠㅎ화하ㅏ하하ㅣ히ㅏ핳헤하하하하하하하ㅠㅎ화하ㅏ하하ㅣ히ㅏ핳헤하하하하하하하ㅠㅎ화하ㅏ하하ㅣ히ㅏ핳헤하하하하하하하ㅠㅎ화하ㅏ하하ㅣ히ㅏ핳헤하하하하하하하ㅠㅎ화하ㅏ하하ㅣ히ㅏ핳헤하하하하하하하ㅠㅎ화하ㅏ하하ㅣ히ㅏ핳헤하하하하하하하ㅠㅎ화하ㅏ하하ㅣ히ㅏ핳헤하하하하하하하ㅠㅎ화하ㅏ하하ㅣ히ㅏ핳
              <br />
              문서 기재로 발생한 이슈?어쩌라고
              ㅁ나ㅓ유ㅜㅁ나ㅓ루ㅠ마ㅓㄴ휴ㅏㅓㅁ노하ㅓㅁ노하ㅓㄴㅁ옿라ㅓㅋ우퍄마ㅠㅜㅁ둥챔웊처ㅏㄹㄷㅂ
              ㅜㅡㅇㄹ챔웇램우라ㅣ
            </span>
            <button onClick={handleLikeToggleClick} className={styles.likeButton}>
              <LikeIcon isLike={isILike} width={16} height={16} />
              <span>{like.thumbsUpsCount - 99999999999999}</span>
            </button>
          </header>
          {/* eslint-disable-next-line react/no-danger */}
          <div className={styles.body} dangerouslySetInnerHTML={sanitizeData()} />
          <div className={styles.contributorsBox}>
            <h1 className={styles.contributorTitle}>문서 기여자</h1>
            <div className={styles.contributorList}>
              {docs.contributors.map((contributor) => (
                <Link
                  key={contributor.id}
                  href={`/user/${contributor.id}`}
                  className={styles.contributor}
                >
                  {contributor.nickName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Suspense>
  );
};

export default Docs;
