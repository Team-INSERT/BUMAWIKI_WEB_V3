"use client";

import Accordion from "@/components/Accordion";
import Container from "@/components/Container";
import { useLogoutMutation } from "@/services/auth/auth.mutation";
import { userQuery } from "@/services/user/user.query";
import { translateAuthority } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { particle, 조사 } from "auto-particle";
import Link from "next/link";
import ContritbuteDocsList from "../ContritbuteDocsList";
import * as styles from "../style.css";

const MyPage = () => {
  const { data: user, isSuccess } = useQuery(userQuery.my());
  const { mutate } = useLogoutMutation();

  return (
    <Container title="마이페이지" docsType="mypage">
      {isSuccess ? (
        <div className={styles.container}>
          <Accordion title="내정보">
            {particle(user.nickName).word(조사.은_는)} 부마위키의{" "}
            {translateAuthority(user.authority)}
            이다.
            <button onClick={() => mutate()} className={styles.button}>
              로그아웃
            </button>
          </Accordion>
          <ContritbuteDocsList contributes={user.contributeDocs} />
        </div>
      ) : (
        <Link className={styles.link} href={process.env.NEXT_PUBLIC_OAUTH_URL || ""}>
          로그인 후 이용해주세요.
        </Link>
      )}
    </Container>
  );
};

export default MyPage;
