import Accordion from "@/components/Accordion";
import { UserType } from "@/types/user.interface";
import React from "react";
import { 조사, particle } from "auto-particle";
import { translateAuthority } from "@/utils";
import * as styles from "../../style.css";
import ContritbuteDocsList from "../../ContritbuteDocsList";

const User = ({ user }: { user: UserType }) => {
  return (
    <div className={styles.container}>
      <Accordion title="유저 정보">
        {particle(user.nickName).word(조사.은_는)} 부마위키의 {translateAuthority(user.authority)}
        이다.
      </Accordion>
      <ContritbuteDocsList contributes={user.contributeDocs} />
    </div>
  );
};

export default User;
