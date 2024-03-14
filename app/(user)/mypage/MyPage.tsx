import Accordion from "@/components/Accordion";
import React from "react";
import { particle, 조사 } from "auto-particle";
import { UserType } from "@/types/user.interface";
import { translateAuthority } from "@/utils";
import { useLogoutMutation } from "@/services/auth/auth.mutation";
import * as styles from "../style.css";
import ContritbuteDocsList from "../ContritbuteDocsList";

const MyPage = ({ user }: { user: UserType }) => {
  const { mutate } = useLogoutMutation();

  return (
    <div className={styles.container}>
      <Accordion title="내정보">
        {particle(user.nickName).word(조사.은_는)} 부마위키의 {translateAuthority(user.authority)}
        이다.
        <button onClick={() => mutate()} className={styles.button}>
          로그아웃
        </button>
      </Accordion>
      <ContritbuteDocsList contributes={user.contributeDocs} />
    </div>
  );
};

export default MyPage;
