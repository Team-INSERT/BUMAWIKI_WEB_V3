"use client";

import Accordion from "@/components/Accordion";
import Container from "@/components/Container";
import { useLogoutMutation } from "@/services/auth/auth.mutation";
import { userQuery } from "@/services/user/user.query";
import { useQueries } from "@tanstack/react-query";
import { particle, 조사 } from "auto-particle";
import { ROLE } from "@/record";
import Link from "next/link";
import ContritbuteDocsList from "../ContritbuteDocsList";
import * as styles from "../style.css";
import LikeDocsList from "../LikeDocsList";

const MyPage = () => {
  const [{ data: user }, { data: likeList }] = useQueries({
    queries: [userQuery.my(), userQuery.like()],
  });
  const { mutate } = useLogoutMutation();

  if (!user || !likeList)
    return (
      <Container title="마이페이지" docsType="mypage">
        <Link className={styles.link} href={process.env.NEXT_PUBLIC_OAUTH_URL || ""}>
          로그인 후 이용해주세요.
        </Link>
      </Container>
    );

  return (
    <Container title="마이페이지" docsType="mypage">
      <div className={styles.container}>
        <Accordion title="내정보">
          {particle(user.nickName).word(조사.은_는)} 부마위키의 {ROLE[user.authority]}
          이다.
          <button onClick={() => mutate()} className={styles.button}>
            로그아웃
          </button>
        </Accordion>
        <LikeDocsList likeList={likeList} />
        <ContritbuteDocsList contributes={user.contributeDocs} />
      </div>
    </Container>
  );
};

export default MyPage;
