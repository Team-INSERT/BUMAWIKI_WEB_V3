"use client";

import { FC, Suspense } from "react";
import "dayjs/locale/ko";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import {
  useQueries,
  useQueryClient,
  useSuspenseQueries,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import { likeQuery } from "@/services/like/like.query";
import Container from "@/components/Container";
import { LikeIcon } from "@/assets";
import useUser from "@/hooks/useUser";
import Toastify from "@/components/Toastify";
import { toast } from "react-toastify";
import { useCreateLikeMutation, useDeleteLikeMutation } from "@/services/like/like.mutation";
import FrameEncoder from "@/components/FrameEncoder";
import { documentCompiler } from "@/utils";
import * as styles from "./style.css";

const Docs: FC<{ title: string; list: string[] }> = ({ title, list }) => {
  const { data: docs } = useSuspenseQuery(docsQuery.title(title));
  const frameData = useSuspenseQueries({
    queries: list.map((frame) => docsQuery.title(frame)),
  }).map(({ data }) => data);
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
    if (!isLoggedIn) return toast(<Toastify content="로그인 후 이용해주세요!" />);

    if (isILike) return cancelLike(docs.id, { onSuccess: handleQueryInvalidate });
    createLike(docs.id, { onSuccess: handleQueryInvalidate });
  };

  const sanitizeData = () => ({
    __html: DOMPurify.sanitize(documentCompiler(docs.contents)),
  });

  return (
    <Suspense>
      <Container {...docs}>
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.warning}>
              문의를 통해 본인 문서의 기재되길 원치않는 특정 내용을 즉시 삭제할 수 있습니다.
              <br />
              문서 기재로 발생한 이슈에 대해 부마위키 팀은 아무런 책임을 지지 않으며, 수사 기관에
              편집 기록과 관련된 데이터를 제공할 수 있습니다.
            </span>
            <button onClick={handleLikeToggleClick} className={styles.likeButton}>
              <LikeIcon isLike={isILike} width={16} height={16} />
              <span>{like.thumbsUpsCount}</span>
            </button>
          </header>
          {docs.docsType === "FRAME" ? (
            <div>
              <div className={styles.body}>
                <FrameEncoder
                  title={docs.title}
                  contents={docs.contents}
                  docsType={docs.docsType}
                  mode="READ"
                />
              </div>
            </div>
          ) : (
            <>
              {frameData.map(
                (frame) =>
                  frame !== null &&
                  frame.docsType === "FRAME" && (
                    <FrameEncoder
                      key={frame.id}
                      title={frame.title}
                      contents={frame.contents}
                      docsType={frame.docsType}
                      mode="READ"
                    />
                  ),
              )}
              <div className={styles.body} dangerouslySetInnerHTML={sanitizeData()} />
            </>
          )}
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
