"use client";

import Accordion from "@/components/Accordion";
import Container from "@/components/Container";
import { useLogoutMutation } from "@/services/auth/auth.mutation";
import { userQuery } from "@/services/user/user.query";
import { useQuery } from "@tanstack/react-query";
import { particle, 조사 } from "auto-particle";
import { CLASSIFY, ROLE } from "@/record";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ContritbuteDocsList from "../ContritbuteDocsList";
import * as styles from "../style.css";
import LikeDocsList from "../LikeDocsList";

const MyPage = () => {
  const { data: user } = useQuery(userQuery.my());
  const { data: likeList } = useQuery(userQuery.like());
  const isLoggedIn = user && likeList;
  const router = useRouter();
  const { mutate } = useLogoutMutation();

  if (!isLoggedIn)
    return (
      <Container title="마이페이지" docsType="mypage">
        <Link className={styles.link} href={process.env.NEXT_PUBLIC_OAUTH_URL || ""}>
          로그인 후 이용해주세요.
        </Link>
      </Container>
    );

  return (
    <Container title="마이페이지" docsType={CLASSIFY.마이페이지}>
      <Accordion title="내정보">
        {particle(user.nickName).word(조사.은_는)} 부마위키의 {ROLE[user.authority]}
        이다.
        <hgroup className={styles.buttonGroup}>
          {user.authority === "ADMIN" && (
            <button onClick={() => router.push("/admin")} className={styles.button}>
              관리자 페이지
            </button>
          )}
          <button onClick={() => mutate()} className={styles.button}>
            로그아웃
          </button>
        </hgroup>
      </Accordion>
      <LikeDocsList likeList={likeList} />
      <ContritbuteDocsList contributes={user.contributeDocs} />
    </Container>
  );
};

export default MyPage;
