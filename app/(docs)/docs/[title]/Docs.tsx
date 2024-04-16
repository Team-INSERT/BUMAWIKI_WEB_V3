"use client";

import { FC, Suspense } from "react";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import {
  useQuery,
  useQueryClient,
  useSuspenseQueries,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { docsQuery } from "@/services/docs/docs.query";
import { likeQuery } from "@/services/like/like.query";
import Container from "@/components/Container";
import { LikeIcon } from "@/assets";
import { useUser } from "@/hooks";
import Toastify from "@/components/Toastify";
import { toast } from "react-toastify";
import { useCreateLikeMutation, useDeleteLikeMutation } from "@/services/like/like.mutation";
import FrameEncoder from "@/components/FrameEncoder";
import { documentCompiler } from "@/utils";
import { CLASSIFY } from "@/record";
import { EditorType } from "@/enum";
import * as styles from "./style.css";

const Docs: FC<{ title: string; frameNameList: Array<string> }> = ({ title, frameNameList }) => {
  const frameQueryList = frameNameList.map((frame) => docsQuery.title(frame));
  const frameList = useSuspenseQueries({ queries: frameQueryList }).map(({ data }) => data);
  const { data: docs } = useSuspenseQuery(docsQuery.title(title));
  const { isLoggedIn } = useUser();
  const queryClient = useQueryClient();

  const { data: like } = useQuery(likeQuery.likeCount(title));
  const { data: isILike } = useQuery(likeQuery.isILike(docs.id));
  const { mutate: createLike } = useCreateLikeMutation();
  const { mutate: cancelLike } = useDeleteLikeMutation();

  const handleLikeToggleClick = () => {
    const onSuccessToggleLike = () => {
      queryClient.invalidateQueries(likeQuery.isILike(docs.id));
      queryClient.invalidateQueries(likeQuery.likeCount(title));
    };
    if (!isLoggedIn) return toast(<Toastify content="로그인 후 이용해주세요!" />);
    if (isILike) return cancelLike(docs.id, { onSuccess: onSuccessToggleLike });
    createLike(docs.id, { onSuccess: onSuccessToggleLike });
  };

  const sanitizeData = () => ({
    __html: DOMPurify.sanitize(documentCompiler(docs.contents)),
  });

  return (
    <Suspense>
      <Container {...docs}>
        <header className={styles.header}>
          <p className={styles.warning}>
            문의를 통해 본인 문서의 기재되길 원치않는 특정 내용을 즉시 삭제할 수 있습니다.
            <br />
            문서 기재로 발생한 이슈에 대해 부마위키 팀은 아무런 책임을 지지 않으며, 수사 기관에 편집
            기록과 관련된 데이터를 제공할 수 있습니다.
          </p>
          <button onClick={handleLikeToggleClick} className={styles.likeButton}>
            <LikeIcon isLike={isILike} width={16} height={16} />
            {like.thumbsUpsCount}
          </button>
        </header>
        {/** 문서 분류가 틀이면 틀이 문서 자체이기에 보여주고, 아니라면 틀 리스트 + 문서 */}
        {docs.docsType === CLASSIFY.틀 ? (
          <FrameEncoder {...docs} mode={EditorType.READ} />
        ) : (
          (function DocsComponent() {
            return (
              <>
                {frameList
                  .filter((frame) => frame && frame.docsType === CLASSIFY.틀)
                  .map((frame) => (
                    <FrameEncoder key={frame.id} {...frame} mode={EditorType.READ} />
                  ))}
                <section className={styles.body} dangerouslySetInnerHTML={sanitizeData()} />
              </>
            );
          })()
        )}
        <footer className={styles.contributorsBox}>
          <h1 className={styles.contributorTitle}>문서 기여자</h1>
          <ul className={styles.contributorList}>
            {docs.contributors.map((contributor) => (
              <Link
                key={contributor.id}
                href={`/user/${contributor.id}`}
                className={styles.contributor}
              >
                {contributor.nickName}
              </Link>
            ))}
          </ul>
        </footer>
      </Container>
    </Suspense>
  );
};

export default Docs;
